import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBackPage } from './form-back.page';

describe('FormBackPage', () => {
  let component: FormBackPage;
  let fixture: ComponentFixture<FormBackPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
