import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCashCollectionDialog } from './confirm-cash-collection-dialog';

describe('ConfirmCashCollectionDialog', () => {
  let component: ConfirmCashCollectionDialog;
  let fixture: ComponentFixture<ConfirmCashCollectionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmCashCollectionDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCashCollectionDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
