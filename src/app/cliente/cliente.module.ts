import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { ShowComponent } from './pages/show/show.component';
// import {
//   NgbActiveModal,
//   NgbDatepickerModule,
//   NgbModule,
//   NgbPaginationModule,
//   NgbTypeaheadModule
// } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // NgbTypeaheadModule,
    // NgbPaginationModule,
    // NgbDatepickerModule,
    // NgbModule,
  ],
  exports: [
    CreateComponent,
  ],
  providers: [
    // NgbActiveModal,
  ]
})
export class ClienteModule { }
