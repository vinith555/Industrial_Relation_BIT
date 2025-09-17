import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeronDetailService } from '../peron-detail.service';
import { UpcomingService } from '../upcoming.service';

@Component({
  selector: 'app-topvicitors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topvicitors.component.html',
  styleUrls: ['./topvicitors.component.css'] 
})
export class TopvicitorsComponent implements OnInit {
  total: number = 0;
  completed: number = 0;
  upcoming: number = 0;
  upCome: Array<{ id?: string; guestName: string; eventName: string; eventDate: string;}> = [];

  constructor(
    private perser: PeronDetailService, 
    private upco: UpcomingService
  ) {}

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

  get paginatedRows() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
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
}
