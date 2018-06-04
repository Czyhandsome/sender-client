import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BcLinkTaskService {
  private orderIdEmitter = new EventEmitter<string>();

  constructor() {
  }

  public sendOrderId(orderId: string) {
    this.orderIdEmitter.next(orderId);
  }

  public orderIdSubject(): EventEmitter<string> {
    return this.orderIdEmitter;
  }
}
