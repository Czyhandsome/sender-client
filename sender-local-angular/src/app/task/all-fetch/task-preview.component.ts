import {Component, Input, OnInit} from '@angular/core';
import {TaskDto} from '../task.dto';
import {isSuccess} from '../../entity/generic-msg';
import {TaskService} from '../task.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.css']
})
export class TaskPreviewComponent implements OnInit {

  @Input() taskDto: TaskDto;

  constructor(private taskService: TaskService,
              private router: Router) {
  }

  ngOnInit() {
  }

  public startFetchOrder(taskId: string, orderId: string) {
    this.taskService.startFetchOrder(taskId, orderId)
      .subscribe(msg => {
        if (isSuccess(msg)) {
          this.router.navigateByUrl('/login');
        } else {
        }
      });
  }

}
