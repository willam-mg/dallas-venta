import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualIncomeComponent } from './manual-income.component';

describe('ManualIncomeComponent', () => {
  let component: ManualIncomeComponent;
  let fixture: ComponentFixture<ManualIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualIncomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
