import { Component, Input } from '@angular/core';
import { CashMovementType } from '../../../shared/constants/cash-movement.constants';

@Component({
  selector: 'app-badge-cash-movement-type',
  standalone: false,
  templateUrl: './badge-cash-movement-type.html',
  styleUrl: './badge-cash-movement-type.css',
})
export class BadgeCashMovementType {
  @Input() type?: CashMovementType;
  
  cashMovementTypeIN: CashMovementType = CashMovementType.IN;
  cashMovementTypeOUT: CashMovementType = CashMovementType.OUT;
  cashMovementTypeAJUSTMENT: CashMovementType = CashMovementType.AJUSTMENT;
  cashMovementTypeOPENING: CashMovementType = CashMovementType.OPENING;
  cashMovementTypeCLOSING: CashMovementType = CashMovementType.CLOSING;

}
