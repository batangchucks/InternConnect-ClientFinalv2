import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangedeanComponent } from './changedean.component';

describe('ChangedeanComponent', () => {
  let component: ChangedeanComponent;
  let fixture: ComponentFixture<ChangedeanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangedeanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangedeanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
