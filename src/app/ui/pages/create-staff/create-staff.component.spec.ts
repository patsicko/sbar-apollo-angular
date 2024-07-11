import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStaffComponent } from './create-staff.component';

describe('CreateStaffComponent', () => {
  let component: CreateStaffComponent;
  let fixture: ComponentFixture<CreateStaffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateStaffComponent]
    });
    fixture = TestBed.createComponent(CreateStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
