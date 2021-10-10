import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitiesUpdateComponent } from './opportunities-update.component';

describe('OpportunitiesUpdateComponent', () => {
  let component: OpportunitiesUpdateComponent;
  let fixture: ComponentFixture<OpportunitiesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunitiesUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitiesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
