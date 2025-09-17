import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingService } from '../upcoming.service';
import { PeronDetailService } from '../peron-detail.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admintopvisitors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admintopvisitors.component.html',
  styleUrls: ['./admintopvisitors.component.css']
})
export class AdmintopvisitorsComponent implements OnInit {
  todayDate: string;
  @ViewChild('f') form!: NgForm;
  total: number = 0;
  completed: number = 0;
  upcoming: number = 0;

  upCome: Array<{ id: string; guestName: string; eventName: string; eventDate: string; }> = [];

  constructor(private upco: UpcomingService, private perser: PeronDetailService) {
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.perser.getDet().subscribe(
      (data)=>{this.completed = data.length}
    );

    this.upco.getUpcomingEv().subscribe(
      (events) => {
        this.upCome = events;
        this.upcoming = this.upCome.length;
        this.total = this.completed + this.upcoming;
      },
      (error) => {
        console.error('Error fetching upcoming events:', error);
      }
    );
  }

  currentPage: number = 1;
  rowsPerPage: number = 5;

  get totalPages(): number {
    return Math.ceil(this.upCome.length / this.rowsPerPage);
  }
  currStart:number = 0;
  get paginatedRows() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    this.currStart = start;
    const end = start + this.rowsPerPage;
    return this.upCome.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  removeData(index: number) {
    const eventToRemove = this.upCome[index];

    if (eventToRemove.id) {
      this.upco.deleteEv(eventToRemove.id).subscribe(
        () => {
          this.upCome.splice(index, 1);
          this.upcoming = this.upCome.length;
          this.total = this.completed + this.upcoming;
        },
        (error) => {
          console.error('Error removing event:', error);
        }
      );
    }
  }
  showForm = false;

  addEvent(){
    this.showForm = true;
  }

  onSubmit() {
    const newEvent = {
      guestName: this.form.value.guest,
      eventName: this.form.value.event,
      eventDate: this.form.value.dat
    };

    this.upco.addEv(newEvent).subscribe(
      (addedEvent) => {
        this.upCome.push(addedEvent);
        this.form.reset();
        this.upcoming = this.upCome.length;
        this.total = this.completed + this.upcoming;
        
      },
      (error) => {
        console.error('Error adding event:', error);
      }
    );
    this.showForm = false;
  }

  showModal: boolean = false;
  itemToRemove: number | null = null;
  
  confirmRemove(index: number) {
      this.itemToRemove = index;
      this.showModal = true;
  }
  
  confirmRemoval() {
      if (this.itemToRemove !== null) {
          this.removeData(this.itemToRemove);
          this.closeModal();
      }
  }
  
  closeModal() {
      this.showModal = false;
      this.itemToRemove = null;
  }
  updateForm:boolean = false;
  guestName:string = '';
  eventName:string = '';
  eventDate:string = '';
  evid:string= '';
  updateEvent(id:number){
    this.updateForm = true;
    this.guestName = this.upCome[id].guestName;
    this.eventName = this.upCome[id].eventName;
    this.eventDate = this.upCome[id].eventDate;
    this.evid = this.upCome[id].id;
  }

  updateModel(){

    function toMySQLDate(dateString: string): string {
      const d = new Date(dateString);
      const year = d.getFullYear();
      const month = ('0' + (d.getMonth() + 1)).slice(-2);
      const day = ('0' + d.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
    const formattedDate = toMySQLDate(this.eventDate);
    console.log(formattedDate);
    
    this.upco.updateEv(this.evid,{guestName:this.guestName,eventName:this.eventName,eventDate:formattedDate}).subscribe(
      (data)=>{console.log(data);
      },(err)=>{
        console.log(err);
      }
    );
    this.updateForm = false;
  }
}
