import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Visitor } from '../detailInterface';
import { DetailviewComponent } from '../detailview/detailview.component';
import { SearchComponent } from '../search/search.component';
import { PeronDetailService } from '../peron-detail.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,DetailviewComponent,SearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] 
})
export class DashboardComponent {
  pna!:string;
  detailStatus:boolean=false;
  arrStatus:boolean=true;
  pName:string = '';
  pDomain:string = '';
  pCompany:string = '';
  pDate:string = '';

  Person: Visitor[] = [];

  constructor(private perSer: PeronDetailService){}

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
        console.log(pna); 
      }
      
    }
  
    closeDetailView() {
      this.detailStatus = false;
      document.body.style.overflow = ''; 
    }
    onValue(value:{name:string,company:string,date:string,domain:string}){
        this.pName = value.name;
        this.pDomain = value.domain ;
        this.pCompany = value.company ;
        this.pDate = value.date;  
    }
    get filteredProfiles() {
      const filtered = this.Person.filter((visitor) =>
      (visitor.domain || '').toLowerCase().includes(this.pDomain.toLowerCase()) &&
      (visitor.name || '').toLowerCase().includes(this.pName.toLowerCase()) &&
      (visitor.companyName || '').toLowerCase().includes(this.pCompany.toLowerCase()) &&
      (visitor.visitedDate || '').toLowerCase().includes(this.pDate.toLowerCase()) 
      );
      return filtered;
    }
  }
