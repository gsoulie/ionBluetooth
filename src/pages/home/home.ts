import { DevicePage } from './../device/device';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BLE } from '@ionic-native/BLE';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  devices: any[] = [];
  error: string = "";
  scanButtonTitle: string = "START SCANNING";
  isScanning: boolean = false;

  constructor(public navCtrl: NavController,
              private ble: BLE) {
                
  }

  onScan(){
    this.isScanning = !this.isScanning;
    this.scanButtonTitle = this.isScanning == true ? "STOP" : "START SCANNING";
    this.error = "";
    this.devices = [];

    if(this.isScanning){
      this.methodeScan1();
    } else {
      this.ble.stopScan();
      this.error = "";
    }
    
  }

  methodeScan1(){
    this.error = "scanning...";
    this.ble.startScan([]).subscribe(device => {
      this.devices.push(device);
    });

    setTimeout(() => {
      this.ble.stopScan().then(() => {
        this.error = "";
        this.scanButtonTitle = "START SCANNING";
        this.isScanning = false;
      });
    }, 10000);
  }

  methodeScan2(){
     this.ble.scan([],15).subscribe(device => {
          console.log("found : " + JSON.stringify(device));
          this.error = "";
          this.devices.push(device);
        },
        error => {
          this.error +="Error : " + JSON.stringify(error); 
          console.log("Error : " + JSON.stringify(error));
        },
      () => {
        this.error +="nothing detected !"; 
      })
  }

  methodeScan3(){
    this.error = "scanning...";
      this.ble.startScan([]).subscribe(device => {
        if(device.name == 'CC2650 SensorTag'){
          this.ble.stopScan();
          this.error = '';
          this.scanButtonTitle = "START SCANNING";
          this.isScanning = false;
        }
      })
  }

  connectToDevice(device){
    this.navCtrl.push(DevicePage,{device: device});
  }

}
