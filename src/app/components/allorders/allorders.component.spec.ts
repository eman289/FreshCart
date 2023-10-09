import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllordersComponent } from './allorders.component';

describe('AllordersComponent', () => {
  let component: AllordersComponent;
  let fixture: ComponentFixture<AllordersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllordersComponent]
    });
    fixture = TestBed.createComponent(AllordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
