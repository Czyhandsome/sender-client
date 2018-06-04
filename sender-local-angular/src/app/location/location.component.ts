import {Component, OnInit} from '@angular/core';
import {LocationService} from './location.service';
import {SenderLocation, senderLocations} from './sender.location';
import {isSuccess} from '../entity/generic-msg';
import {log} from '../logger';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  // ********** 快递员经纬度 ********** //
  public senderLocation: SenderLocation;

  locations = senderLocations;

  longitude: number;
  latitude: number;

  constructor(private locationService: LocationService) {
  }

  // 上传快递员经纬度
  updateLocation(location: SenderLocation) {
    this.locationService.updateLocation(location)
      .subscribe(msg => {
        if (isSuccess(msg)) {
          log(JSON.stringify(msg.data));
        } else {
          log(JSON.stringify(msg.msg));
        }
      }, error => {
        log(JSON.stringify(error));
      });
  }

  // 根据select的选择上传经纬度
  updateLocationChoose() {
    this.updateLocation(this.senderLocation);
  }

  // 根据手动输入数据上传经纬度
  updateLocationHand() {
    this.updateLocation(new SenderLocation(this.longitude, this.latitude));
  }

  ngOnInit() {
  }

}
