import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEsignatureComponent } from './admin-esignature.component';

describe('AdminEsignatureComponent', () => {
  let component: AdminEsignatureComponent;
  let fixture: ComponentFixture<AdminEsignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEsignatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEsignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
