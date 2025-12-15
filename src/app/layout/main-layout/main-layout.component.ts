import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../models/user';
import { LoadingService } from '../../shared/services/loading.service';
import { catchError, throwError, finalize  } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from '../../user/pages/change-password/change-password.component';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  standalone: true,
  styleUrls: ['./main-layout.component.css'],
  imports: [
    RouterModule
  ]
})
export class MainLayoutComponent implements OnInit, AfterViewInit {
  isAuthenticated: Boolean;
  user: User;
  sucursalName: string;
  isLoading: boolean;
  modalRef!: BsModalRef;

  constructor(
    public authService: AuthService,
    public readonly router: Router,
    private modalService: BsModalService,
    public title: Title,
    public loadingService: LoadingService,
    private changeDetector: ChangeDetectorRef) {
    this.isAuthenticated = false;
    this.user = new User();
    this.sucursalName = "";
    this.isLoading = false;
  }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe((data) => {
      this.isAuthenticated = data;
    });
    this.sucursalName = this.authService.getSucursalName()!;
    this.user = this.authService.getUserIdentity() ? this.authService.getUserIdentity()!: new User();
  }

  ngAfterViewInit(): void {
    this.loadingService.httpProgress().subscribe((status: boolean) => {
        this.isLoading = status;
        this.changeDetector.detectChanges();
      });
    this.changeDetector.detectChanges();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  changePassword() {
    this.modalRef = this.modalService.show(ChangePasswordComponent, {
      class: 'modal-lg'
    });

    this.modalRef.content.isUpdated.subscribe((data: boolean) => {
      if (data) {
        Swal.fire(
          'Guardado',
          'los datos se guardaron correctamente',
          'success'
        );
        this.authService.logout();
        this.router.navigate(['/login']);
      }
      // this.cd.detectChanges();
    });



    // modalRef.componentInstance.isUpdated.subscribe((data:boolean) => {
    //   if (data) {
    //     Swal.fire(
    //       'Guardado',
    //       'los datos se guardaron correctamente',
    //       'success'
    //     );
    //     this.authService.logout();
    //     this.router.navigate(['/login']);
    //   }
    // });
  }
}
