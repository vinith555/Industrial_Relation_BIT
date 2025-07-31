import { Component, Input, OnInit } from '@angular/core';
import { Visitor } from '../detailInterface';
import { CommonModule } from '@angular/common';
import { PeronDetailService } from '../peron-detail.service';

@Component({
  selector: 'app-detailview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.css'] 
})
export class DetailviewComponent implements OnInit {
  detail: Visitor[] = [];
  @Input() index!: string;
  i: number = 0;

  constructor(private perSer: PeronDetailService) {}

  ngOnInit() {
    this.perSer.getDet().subscribe(
      (data) => {
        this.detail = data;
        this.i = this.findVisitorIndex();
      },
      (error) => {
        console.error('Error fetching visitors:', error);
      }
    );
  }
  findVisitorIndex(): number {
    return this.detail.findIndex(visitor => visitor.id === this.index);
  }
}
