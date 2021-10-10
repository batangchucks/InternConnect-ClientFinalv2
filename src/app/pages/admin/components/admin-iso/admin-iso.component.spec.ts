import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIsoComponent } from './admin-iso.component';

describe('AdminIsoComponent', () => {
  let component: AdminIsoComponent;
  let fixture: ComponentFixture<AdminIsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
