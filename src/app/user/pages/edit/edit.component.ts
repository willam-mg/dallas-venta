import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';
import { HttpService } from '../../http.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    standalone: false,
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    model: User;
    formUser: FormGroup;
    submitted: boolean;
    subscription: Subscription;
    @Output()
    isUpdated: EventEmitter<Boolean> = new EventEmitter<Boolean>();

    constructor(
        private httpService: HttpService) {
        // public activeModal: NgbActiveModal) {
        this.model = new User();
        this.formUser = new FormGroup({
            nombre_completo: new FormControl(this.model.nombre_completo, [
                Validators.required,
                Validators.maxLength(50)
            ]),
            email: new FormControl(this.model.email, [
                Validators.required,
                Validators.email
            ]),
            turno: new FormControl(this.model.turno, [
                Validators.required,
            ]),
        });
        this.submitted = false;
        this.subscription = new Subscription;
    }

    ngOnInit(): void {
    }
    
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    setId(id:number) {
        this.httpService.show(id).subscribe(async (data) => {
            this.model = data;
            this.formUser.setValue({
                nombre_completo: this.model.nombre_completo,
                email: this.model.email,
                turno: this.model.turno
            });
        });
    }

    onSubmit() {
        try {
            if (this.formUser.invalid) {
                throw new Error('Entrada de datos invalido');
            }
            this.submitted = true;
            this.subscription.add(
                this.httpService.update(this.model.id!, this.formUser.value)
                    .subscribe(async () => {
                        this.submitted = false;
                        this.model = new User();
                        // this.activeModal.close();
                        this.isUpdated.emit(true);
                    })
            );
        } catch (error) {
            throw error;
        }
    }
}
