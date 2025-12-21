import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeCashMovementType } from './badge-cash-movement-type';

describe('BadgeCashMovementType', () => {
  let component: BadgeCashMovementType;
  let fixture: ComponentFixture<BadgeCashMovementType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BadgeCashMovementType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgeCashMovementType);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
