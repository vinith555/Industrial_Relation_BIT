import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopvicitorsComponent } from './topvicitors.component';

describe('TopvicitorsComponent', () => {
  let component: TopvicitorsComponent;
  let fixture: ComponentFixture<TopvicitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopvicitorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopvicitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
