import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassImportComponent } from './mass-import.component';

describe('MassImportComponent', () => {
  let component: MassImportComponent;
  let fixture: ComponentFixture<MassImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
