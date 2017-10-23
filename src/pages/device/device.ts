import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/BLE';
@Component({
  selector: 'page-device',
  templateUrl: 'device.html',
})
export class DevicePage {
  device: any = {};
  spinner: boolean = false;
  inService: string = "";
  inCharacteristic: string = "";
  characteristics: any[] = [];
  status: string = "";
  characteristicList: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public ble: BLE) {
    this.device = this.navParams.get('device');
    this.onConnect();
  }

  onConnect() {
    this.status = "Connecting...";
    this.spinner = true;
    this.characteristics = [];
    let deviceID = this.device.id;

    this.ble.connect(deviceID).subscribe(peripheralData => {
      console.log(peripheralData.characteristics);
      this.characteristics = peripheralData.characteristics;
      this.characteristicList = this.characteristics;
      this.spinner = false;
      this.status = "Characteristics ok";
      alert("lecture terminée");
      this.refresh();
    },
    
    () => {
      this.spinner = false;
      this.status = "Undefined"
      alert("etat indéfini");
    });
  }

  refresh(){
    this.characteristics = this.characteristicList;
  }

  onReadCharacteristic(deviceID){
    this.ble.read(deviceID,this.inService,this.inCharacteristic).then(
      function(buffer){
        var databuffer = new Uint8Array(buffer);
        alert("buffer " + String.fromCharCode.apply(null,databuffer));
      }
    )
    .catch((err) => {alert("error : " + JSON.stringify(err));});
  }
  
  connectToCharacteristic(deviceID,service,characteristic) {
    
    var TEMPERATURE_SERVICE = '180f';//'f000aa00-0451-4000-b000-000000000000';//'180A';
    var TEMPERATURE_CONFIG = '2a19';//'f000aa02-0451-4000-b000-000000000000';//'2a24'
    var TEMPERATURE_DATA = '';//'f000aa01-0451-4000-b000-000000000000';

    //var service = this.ble.read(deviceID, TEMPERATURE_SERVICE,TEMPERATURE_DATA);
    /*var configCharacteristic = this.ble.read(deviceID, TEMPERATURE_SERVICE,TEMPERATURE_CONFIG);
    var dataCharacteristic = this.ble.read(deviceID, TEMPERATURE_SERVICE,TEMPERATURE_DATA);
    */
    // Enable Temperature
    //this.ble.write(deviceID,TEMPERATURE_SERVICE,TEMPERATURE_CONFIG,new Uint8Array[1]);

    /*this.ble.read(deviceID,TEMPERATURE_SERVICE,TEMPERATURE_CONFIG).then(data => {
      alert("res : " + JSON.stringify(data));
    });*/
    this.ble.read(deviceID,service,characteristic).then(
      function(buffer){
        var databuffer = new Uint8Array(buffer);
        alert("deviceID : " + deviceID + '\r\n[' + service + ' - ' + characteristic + ']\r\n' + "buffer " + String.fromCharCode.apply(null,databuffer));
        alert("deviceID : " + deviceID + '\r\n[' + service + ' - ' + characteristic + ']\r\n' + "buffer " + databuffer[0]);
      }
    );
  }

  onReadTemperature(deviceID){
    let service_Write = 'AA02';
    let handle_Write =  '24';
    let value = '1';
    let service_Read = 'AA01'
    let handle_Read = '21';
  }

  getService(ev:any){
    this.characteristics = this.characteristicList;

    // set searchText to the value of the searchbar
    var searchText = ev.target.value;
    
    // Avoid research if searchtext is empty
    if (!searchText || searchText.trim() === '') {
      this.characteristics = this.characteristicList;
      return;
    }

    // Filtering on the attribute 'nom'
    this.characteristics = this.characteristics.filter((v) => {
      if (v.service.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicePage');
  }

}
