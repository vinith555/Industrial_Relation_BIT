import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintopvisitorsComponent } from './admintopvisitors.component';

describe('AdmintopvisitorsComponent', () => {
  let component: AdmintopvisitorsComponent;
  let fixture: ComponentFixture<AdmintopvisitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmintopvisitorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmintopvisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
