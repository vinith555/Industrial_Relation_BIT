import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
export class DetailviewComponent{
  @Input()detail!: Visitor[];
  @Input() index!: number;
  i: number = 0;
  ngOnChanges(changes: SimpleChanges) {
      this.i = this.index 
    console.log('i:', this.index, 'detail:', this.detail);
  }
}
