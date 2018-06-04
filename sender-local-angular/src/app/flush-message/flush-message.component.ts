import {Component, Input, OnInit} from '@angular/core';
import {timer} from 'rxjs/internal/observable/timer';
import {log} from '../logger';

@Component({
  selector: 'app-flush-message',
  templateUrl: './flush-message.component.html',
  styleUrls: ['./flush-message.component.css']
})
export class FlushMessageComponent implements OnInit {
  // 初始消息
  @Input()
  initMessage = null;

  // 消息
  msg = this.initMessage;

  constructor() {
  }

  ngOnInit() {
  }

  // 修改消息
  public changeMsg(str: string) {
    log(str);
    this.msg = str;
    timer(1500)
      .subscribe(() => this.msg = this.initMessage);
  }
}
