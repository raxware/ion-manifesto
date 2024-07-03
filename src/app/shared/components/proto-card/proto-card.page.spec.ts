import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProtoCardPage } from './proto-card.page';

describe('ProtoCardPage', () => {
  let component: ProtoCardPage;
  let fixture: ComponentFixture<ProtoCardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtoCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
