import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinishOrderPage } from './finish-order.page';

describe('FinishOrderPage', () => {
  let component: FinishOrderPage;
  let fixture: ComponentFixture<FinishOrderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
