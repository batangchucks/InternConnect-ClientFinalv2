import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReturnisoComponent } from './admin-returniso.component';

describe('AdminReturnisoComponent', () => {
  let component: AdminReturnisoComponent;
  let fixture: ComponentFixture<AdminReturnisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReturnisoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReturnisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
