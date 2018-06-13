import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassQuickcallComponent } from './mass-quickcall.component';

describe('MassQuickcallComponent', () => {
  let component: MassQuickcallComponent;
  let fixture: ComponentFixture<MassQuickcallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassQuickcallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassQuickcallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
