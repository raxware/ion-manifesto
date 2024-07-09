import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardBackPage } from './card-back.page';

describe('CardBackPage', () => {
  let component: CardBackPage;
  let fixture: ComponentFixture<CardBackPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
