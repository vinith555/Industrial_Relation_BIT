import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @ViewChild('f')form!:NgForm;
  @Output()fvalues = new EventEmitter<{name:string,company:string,date:string,domain:string}>();
   todayDate!: string;

   constructor() {
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
  }
  onSubmit(){ 
    this.fvalues.emit({name:this.form.value.namep,company:this.form.value.company,date:this.form.value.date,domain:this.form.value.domain});
  }
}
