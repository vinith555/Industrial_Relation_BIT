import { Component, ViewChild,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Visitor } from '../detailInterface';
import { DetailviewComponent } from '../detailview/detailview.component';
import { SearchComponent } from '../search/search.component';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EditComponent } from '../edit/edit.component';
import { PeronDetailService } from '../peron-detail.service';
import { TruncatePipe } from '../truncate.pipe';
@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [CommonModule,DetailviewComponent,SearchComponent,FormsModule,EditComponent,TruncatePipe],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {
  @ViewChild('f')add!:NgForm;
  pna:number = 0;
  detailStatus:boolean=false;
  editStatus:boolean=false;
  arrStatus:boolean=true;
  pName:string = '';
  pDomain:string = '';
  pCompany:string = '';
  pDate:string = '';

  todayDate!: string;


  selectedFile: File | null = null;
  allProfiles: Visitor[] = []; 
  filteredProfiles: Visitor[] = []

  constructor(private perSer:PeronDetailService){
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0]; 
  }

  ngOnInit(){
    this.perSer.getDet().subscribe(
      (data) =>{
        this.allProfiles = data;         
          this.filteredProfiles = [...data];
      },
      (error) => {
        console.error('Error fetching visitors:', error);
      }
    );
  }


    openDetailView(pna:number) {
      this.detailStatus = true;
      document.body.style.overflow = 'hidden'; 
      if(pna){
        this.pna = pna;
      }else{
        pna = 0;
      }
    }
  
    closeDetailView() {
      this.detailStatus = false;
      document.body.style.overflow = ''; 
    }
    onValue(value:{name:string,company:string,date:string,domain:string}){
        this.pName = value.name ;
        this.pDomain = value.domain;
        this.pCompany = value.company ;
        this.pDate = value.date;
        this.filteredProfiles = this.applyFilters(); 
    }
    applyFilters() {
        if (!this.pName && !this.pDomain && !this.pCompany && !this.pDate) {
          return [...this.allProfiles]; 
        }
        return this.allProfiles.filter(visitor =>
          (!this.pDomain || (visitor.domain || '').toLowerCase().includes(this.pDomain.toLowerCase())) &&
          (!this.pName || (visitor.name || '').toLowerCase().includes(this.pName.toLowerCase())) &&
          (!this.pCompany || (visitor.companyName || '').toLowerCase().includes(this.pCompany.toLowerCase())) &&
          (!this.pDate || (visitor.visitedDate || '').toLowerCase().includes(this.pDate.toLowerCase()))
        );
    }

    onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files?.length) {
      this.selectedFile = fileInput.files[0];
    }
    }

    onAdd() {
        if (!this.selectedFile) {
        console.error('Form is invalid or no image selected.');
        return;
        }

        const formData = new FormData();

        formData.append('image', this.selectedFile); 
        formData.append('name', this.add.value.name);
        formData.append('email', this.add.value.email);
        formData.append('domain', this.add.value.domain);
        formData.append('visitedDate', this.add.value.date);
        formData.append('companyName', this.add.value.company);
        formData.append('phoneNumber', this.add.value.ph);
        formData.append('Detail', this.add.value.detail);
        formData.append('linkedIn', this.add.value.linked);
      this.perSer.addVisi(formData).subscribe(
        (response) => {
          console.log('Visitor added successfully:', response);
        },
        (error) => {
          console.error('Error adding visitor:', error);
        }
      );
      this.closePopup();
    }  
    onChange(id: number) {
      this.editStatus = true;
  
      if (id) {
          this.pna = id;  
      } else {
          this.pna =  0;
      }
  }
    closeEdit(data:boolean){
      this.editStatus=data;
    }
    isPopupOpen = false;

    onDelete(id:string|undefined){
      if(id){
        this.perSer.deleteVisitor(id).subscribe(
          (error)=>{console.error(error);},
        );
      }
    }
  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  showModal: boolean = false;
  itemToRemove: string | undefined;
  
  confirmRemove(index: string|undefined) {
      this.itemToRemove = index;
      this.showModal = true;
  }
  
  confirmRemoval() {
          this.onDelete(this.itemToRemove);
          this.closeModal();
      
  }
  closeModal() {
      this.showModal = false;
      this.itemToRemove = '';
  }
}