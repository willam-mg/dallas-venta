import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CashCollectionService } from '../../../shared/services/cash-collection.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/auth.service';
import { Pagination } from '../../../shared/models/pagination';
import { CashCollection } from '../../../models/cash-collection';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmCashCollectionDialog } from '../../../cash-collection/components/confirm-cash-collection-dialog/confirm-cash-collection-dialog';
import { SocketService } from '../../../shared/services/socket.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  standalone: false,
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  subscription: Subscription = new Subscription();
  puntoVentaId: number | null = null;
  pagination: Pagination = new Pagination();
  cashCollections: CashCollection[] = [];
  socketSub: Subscription = new Subscription();

  constructor(
    public title:Title,
    private cashCollectionService: CashCollectionService,
    private authService: AuthService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private socketService: SocketService
  ) {}
  
  ngOnInit(): void {
    this.socketService.connect();

    this.socketSub = this.socketService
      .listen<any>('cash-confirmed')
      .subscribe((data) => {
        console.log('Confirmación recibida:', data);

        // 🔔 actualizar UI
        this.getListRequestPenddingCollection();
      });

    this.title.setTitle('Dashboard');
    this.puntoVentaId = this.authService.getPuntoVenta();
    this.getListRequestPenddingCollection();
  }

  getListRequestPenddingCollection() {
    this.subscription.add(
      this.cashCollectionService.listRequestCollection(
          this.puntoVentaId!, 
          this.pagination
        ).subscribe({
          next: data => {
            this.cashCollections = data.data.map(
              item => new CashCollection(item)
            );;
          },
          error: error => {
            Swal.fire('Error', error.error.message, 'error');
          }
        }
      )
    );
  }

  confirmCollection(cashCollection: CashCollection){
    this.bsModalRef = this.modalService.show(
      ConfirmCashCollectionDialog,
      {
        class: 'modal-md',
        initialState: {
          cashCollectionId: cashCollection.id,
          cashCollectionCatched: cashCollection
        }
      }
    );

    this.bsModalRef.content.isconfirmed.subscribe(() => {
      // recargar tabla o refrescar datos
      this.getListRequestPenddingCollection();
    });
  }

}
