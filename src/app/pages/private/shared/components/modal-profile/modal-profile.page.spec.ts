import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalProfilePage } from './modal-profile.page';

describe('ModalProfilePage', () => {
  let component: ModalProfilePage;
  let fixture: ComponentFixture<ModalProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
