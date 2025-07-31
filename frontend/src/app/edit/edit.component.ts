import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Visitor } from '../detailInterface';
import { PeronDetailService } from '../peron-detail.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  @ViewChild('f') editForm!: NgForm;
  detail: Visitor[] = [];
  @Input() pName!: string;
  @Output() popup = new EventEmitter<boolean>();
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

  onClose(){
    this.popup.emit(false);
  }

  findVisitorIndex(): number {
    return this.detail.findIndex(visitor => visitor.id === this.pName);
  }

  onGet() {
    if (this.i < 0 || this.i >= this.detail.length) {
      console.error('Invalid index for visitor detail');
      return; 
    }
    const visitorToUpdate = this.detail[this.i]; 
    const updatedVisitor: Visitor = {
      id: visitorToUpdate.id,  
      img: this.editForm.value.img || visitorToUpdate.img, 
      name: this.editForm.value.name || visitorToUpdate.name, 
      domain: this.editForm.value.domain || visitorToUpdate.domain,
      email: this.editForm.value.email || visitorToUpdate.email,
      visitedDate: this.editForm.value.date || visitorToUpdate.visitedDate,
      companyName: this.editForm.value.company || visitorToUpdate.companyName,
      phoneNumber: this.editForm.value.ph || visitorToUpdate.phoneNumber,
      linkedIn: this.editForm.value.linked || visitorToUpdate.linkedIn,
      Detail: this.editForm.value.detail || visitorToUpdate.Detail,
    };
    if (!updatedVisitor.id) {
      console.error('No valid _id provided for update');
      return; 
    }
    this.perSer.updateVisi(updatedVisitor, updatedVisitor.id).subscribe(
      (response) => {
        console.log('Visitor updated successfully:', response);
      },
      (error) => {
        console.error('Error updating visitor:', error);
      }
    );
    this.popup.emit(false);
  }
  
}
