import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardFrontPage } from './card-front.page';

describe('CardFrontPage', () => {
  let component: CardFrontPage;
  let fixture: ComponentFixture<CardFrontPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFrontPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
