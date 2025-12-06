import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpService } from '../../http.service';
import { Venta } from '../../../models/venta';

@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  model: Venta;
  formUser: FormGroup;
  submitted: boolean;
  subscription: Subscription;

  @Output()
  isUpdated: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  display: boolean = false; // controla visibilidad del Dialog

  constructor(private httpService: HttpService) {
    this.model = new Venta();
    this.formUser = new FormGroup({
      fecha: new FormControl("", [Validators.required]),
      hora: new FormControl("", [Validators.required]),
      observacion: new FormControl(""),
    });
    this.submitted = false;
    this.subscription = new Subscription();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openDialog(id: number) {
    this.setId(id);
    this.display = true;
  }

  closeDialog() {
    this.display = false;
  }

  setId(id: number) {
    this.httpService.show(id).subscribe((data) => {
      this.model = data;
      this.formUser.setValue({
        fecha: this.model.fecha,
        hora: this.model.hora,
        observacion: this.model.observacion
      });
    });
  }

  onSubmit() {
    if (this.formUser.invalid) return;

    this.submitted = true;
    this.subscription.add(
      this.httpService.update(this.model.id!, this.formUser.value)
        .subscribe(() => {
          this.submitted = false;
          this.model = new Venta();
          this.display = false; // cerramos dialog
          this.isUpdated.emit(true);
        })
    );
  }
}
