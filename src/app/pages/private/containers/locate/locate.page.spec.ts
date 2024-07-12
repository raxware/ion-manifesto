import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocatePage } from './locate.page';

describe('LocatePage', () => {
  let component: LocatePage;
  let fixture: ComponentFixture<LocatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
