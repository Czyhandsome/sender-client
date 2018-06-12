import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickcallComponent } from './quickcall.component';

describe('QuickcallComponent', () => {
  let component: QuickcallComponent;
  let fixture: ComponentFixture<QuickcallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickcallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickcallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
