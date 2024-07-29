import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EasterPage } from './easter.page';

describe('EasterPage', () => {
  let component: EasterPage;
  let fixture: ComponentFixture<EasterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
