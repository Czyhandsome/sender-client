import {Component, Injectable, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StatusService} from './status.service';
import {Subscription, timer} from 'rxjs';
import {SenderStatus} from './sender.status';
import {FlushMessageComponent} from '../flush-message/flush-message.component';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
@Injectable()
export class StatusComponent implements OnInit, OnDestroy {
  currentStatus: SenderStatus;
  private subscription: Subscription;

  @ViewChild(FlushMessageComponent)
  flush: FlushMessageComponent;

  public changeStatus() {
    if (this.currentStatus === SenderStatus.RESTING || this.currentStatus === SenderStatus.OFF_LINE) {
      this.statusService.beReady()
        .subscribe(() => {
          this.refreshStatus();
        });
    } else if (this.currentStatus === SenderStatus.READY) {
      this.statusService.beResting()
        .subscribe(() => this.refreshStatus());
    }
  }

  constructor(private statusService: StatusService) {
  }

  private refreshStatus() {
    this.statusService.getCurrentStatus()
      .subscribe(status => {
        this.currentStatus = status;
        this.flush.changeMsg(`状态成功修改为${status}!`);
      });
  }

  private refreshStatusWithoutMsg() {
    this.statusService.getCurrentStatus()
      .subscribe(status => {
        this.currentStatus = status;
      });
  }

  ngOnInit() {
    this.subscription = timer(0, 2000)
      .subscribe(() => this.refreshStatusWithoutMsg());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
