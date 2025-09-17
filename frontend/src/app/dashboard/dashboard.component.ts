import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Visitor } from '../detailInterface';
import { DetailviewComponent } from '../detailview/detailview.component';
import { SearchComponent } from '../search/search.component';
import { PeronDetailService } from '../peron-detail.service';
import { TruncatePipe } from '../truncate.pipe';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,DetailviewComponent,SearchComponent,TruncatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] 
})
export class DashboardComponent {
  pna:number = 0;
  detailStatus:boolean=false;
  arrStatus:boolean=true;
  pName:string = '';
  pDomain:string = '';
  pCompany:string = '';
  pDate:string = '';

  allProfiles: Visitor[] = [];      
  filteredProfiles: Visitor[] = []

  constructor(private perSer: PeronDetailService){}

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

    trackById(index: number, item: Visitor) {
      return item.id;
    }

    onValue(value:{name:string,company:string,date:string,domain:string}){
        this.pName = value.name;
        this.pDomain = value.domain ;
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
  }
