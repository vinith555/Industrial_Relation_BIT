import { Component, ViewChild,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Visitor } from '../detailInterface';
import { DetailviewComponent } from '../detailview/detailview.component';
import { SearchComponent } from '../search/search.component';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EditComponent } from '../edit/edit.component';
import { PeronDetailService } from '../peron-detail.service';
@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [CommonModule,DetailviewComponent,SearchComponent,FormsModule,EditComponent],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {
  @ViewChild('f')add!:NgForm;
  pna!:string;
  detailStatus:boolean=false;
  editStatus:boolean=false;
  arrStatus:boolean=true;
  pName:string = '';
  pDomain:string = '';
  pCompany:string = '';
  pDate:string = '';

  todayDate!: string;

  Person: Visitor[] = [];

  constructor(private perSer:PeronDetailService){
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0]; 
  }

  ngOnInit(){
    this.perSer.getDet().subscribe(
      (data) =>{
        this.Person = data;
      },
      (error) => {
        console.error('Error fetching visitors:', error);
      }
    );
  }


    openDetailView(pna:string | undefined) {
      this.detailStatus = true;
      document.body.style.overflow = 'hidden'; 
      if(pna){
        this.pna = pna;
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
        console.log(this.pDate);
    }
    get filteredProfiles() {
      const filtered = this.Person.filter((visitor) =>
      visitor.domain.toLowerCase().includes(this.pDomain.toLowerCase()) &&
      visitor.name.toLowerCase().includes(this.pName.toLowerCase()) &&
      visitor.companyName.toLowerCase().includes(this.pCompany.toLowerCase()) &&
      visitor.visitedDate.toLowerCase().includes(this.pDate.toLowerCase()) 
      );
      return filtered;
    }

    onAdd() {
      const newVisitor = {
        img: this.add.value.img,
        name: this.add.value.name,
        email: this.add.value.email,
        domain: this.add.value.domain,
        visitedDate: this.add.value.date,
        companyName: this.add.value.company,
        phoneNumber: this.add.value.ph,
        Detail: this.add.value.detail,
        linkedIn: this.add.value.linked
      };   
      this.perSer.addVisi(newVisitor).subscribe(
        (response) => {
          console.log('Visitor added successfully:', response);
          this.Person.push(response);
          this.closePopup();
        },
        (error) => {
          console.error('Error adding visitor:', error);
        }
      );
    }  
    onChange(id: string | undefined) {
      this.editStatus = true;
  
      if (id) {
          this.pna = id;  
      } else {
          console.error('Received an undefined value for id');
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