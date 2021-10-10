import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanydirectoryUpdateComponent } from './companydirectory-update.component';

describe('CompanydirectoryUpdateComponent', () => {
  let component: CompanydirectoryUpdateComponent;
  let fixture: ComponentFixture<CompanydirectoryUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanydirectoryUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanydirectoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
