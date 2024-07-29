import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalPushPage } from './modal-push.page';

describe('ModalPushPage', () => {
  let component: ModalPushPage;
  let fixture: ComponentFixture<ModalPushPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPushPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
