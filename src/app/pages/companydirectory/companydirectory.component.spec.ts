import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanydirectoryComponent } from './companydirectory.component';

describe('CompanydirectoryComponent', () => {
  let component: CompanydirectoryComponent;
  let fixture: ComponentFixture<CompanydirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanydirectoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanydirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
