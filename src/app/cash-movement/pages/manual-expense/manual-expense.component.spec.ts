import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualExpenseComponent } from './manual-expense.component';

describe('ManualExpenseComponent', () => {
  let component: ManualExpenseComponent;
  let fixture: ComponentFixture<ManualExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
