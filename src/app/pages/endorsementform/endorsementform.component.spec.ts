import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndorsementformComponent } from './endorsementform.component';

describe('EndorsementformComponent', () => {
  let component: EndorsementformComponent;
  let fixture: ComponentFixture<EndorsementformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndorsementformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndorsementformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
