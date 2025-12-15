import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { EditComponent } from './pages/edit/edit.component';
import { ShowComponent } from './pages/show/show.component';
import { CreateComponent } from './pages/create/create.component';
// import { 
//   NgbActiveModal,
//         NgbDatepickerModule,
//         NgbModule,
//         NgbPaginationModule,
//         NgbTypeaheadModule 
//       } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    IndexComponent,
    EditComponent,
    ShowComponent,
    CreateComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DialogModule
    // NgbTypeaheadModule,
    // NgbPaginationModule,
    // NgbDatepickerModule,
    // NgbModule,
  ],
  providers: [
    // NgbActiveModal,
  ]

})
export class UserModule { }
