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
  @Input()detail: Visitor[] = [];
  @Input() index!: number;
  @Output() popup = new EventEmitter<boolean>();
  i: number = 0;

  constructor(private perSer: PeronDetailService) {
  }
  ngOnChanges(){
    this.i = this.index;
  }

  onClose(){
    this.popup.emit(false);
  }

  selectedFile: File | null = null;

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files?.length) {
      this.selectedFile = fileInput.files[0];
    }
  }


  onGet() {
  if (this.i < 0 || this.i >= this.detail.length) {
    console.error('Invalid index for visitor detail');
    return;
  }

  const visitorToUpdate = this.detail[this.i];
  const formData = new FormData();

  if (this.selectedFile) {
    formData.append('image', this.selectedFile); 
  } else {
    formData.append('image', visitorToUpdate.img); 
  }

formData.append('name', this.editForm.value.name || visitorToUpdate.name);
formData.append('email', this.editForm.value.email || visitorToUpdate.email);
formData.append('domain', this.editForm.value.domain || visitorToUpdate.domain);
formData.append('visitedDate', this.editForm.value.date || visitorToUpdate.visitedDate);
formData.append('companyName', this.editForm.value.company || visitorToUpdate.companyName);
formData.append('phoneNumber', this.editForm.value.ph || visitorToUpdate.phoneNumber);
formData.append('Detail', this.editForm.value.detail || visitorToUpdate.Detail);
formData.append('linkedIn', this.editForm.value.linked || visitorToUpdate.linkedIn);

  if (!visitorToUpdate.id) {
    console.error('No valid id provided for update');
    return;
  }
  this.perSer.updateVisi(formData, visitorToUpdate.id).subscribe(
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
