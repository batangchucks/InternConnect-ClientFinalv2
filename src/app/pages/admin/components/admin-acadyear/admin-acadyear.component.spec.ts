import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAcadyearComponent } from './admin-acadyear.component';

describe('AdminAcadyearComponent', () => {
  let component: AdminAcadyearComponent;
  let fixture: ComponentFixture<AdminAcadyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAcadyearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAcadyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
