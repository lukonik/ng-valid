import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { NgxValid } from './ngx-valid';

describe('NgxValid', () => {
  let component: NgxValid;
  let fixture: ComponentFixture<NgxValid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxValid],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxValid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
