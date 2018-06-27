import {TaskPreview} from "./task.preview";
import {QuickcallPreview} from "./quickcall-preview";

/**
 * 当前推送的任务或一键呼叫数据
 */
export interface CurrentPushingPreview {
  taskPreview: TaskPreview;
  quickcallPreview: QuickcallPreview;
}
