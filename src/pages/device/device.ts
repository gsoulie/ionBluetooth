import { Service } from './../../models/service';
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
  characteristicList: any[] = [];
  temp = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public ble: BLE, public cl_service: Service) {
    this.device = this.navParams.get('device');
    this.onConnect();
  }

  onConnect() {
    this.spinner = true;
    this.characteristics = [];
    let deviceID = this.device.id;

    this.ble.connect(deviceID).subscribe(peripheralData => {
      console.log(peripheralData.characteristics);
      this.characteristics = peripheralData.characteristics;
      this.characteristicList = this.characteristics;
      this.spinner = false;
      this.parseCharacteristics()
      alert("lecture terminée : ");
      this.refresh();
    },
    
    () => {
      this.spinner = false;
      alert("etat indéfini");
    });
  }

  parseCharacteristics(){
    
    var service = "";
    var charac = [];
    for(let i = 0; i < this.characteristics.length; i++){
      if(i == 0){
        service = this.characteristics[i].service;
      } else {
        if(service !== this.characteristics[i].service){
          this.temp.push({service: service, name: this.cl_service.getServiceName(service), expand: false, characteristics: charac});
          service = this.characteristics[i].service;
          charac = [];
        }
      }
      charac.push({characteristic: this.characteristics[i].characteristic, 
                  name:this.cl_service.getCharacteristicName(this.characteristics[i].characteristic), 
                  properties: this.characteristics[i].properties,
                  type: this.cl_service.getCharacteristicType(this.characteristics[i].characteristic),
                  unit: this.cl_service.getCharacteristicUnit(this.characteristics[i].characteristic)});
    }

    this.temp.push({service: service, name: service, expand: false, characteristics: charac});
  }

  onExpandCollapseService(item){
    item.expand = !item.expand;
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
    this.ble.read(deviceID,service,characteristic.characteristic).then(
      function(buffer){
        var databuffer = new Uint8Array(buffer);
        switch(characteristic.type){
          case 'string':
            alert("value = " + String.fromCharCode.apply(null,databuffer)+characteristic.unit);
            break;
          case 'number':
            alert("value = " + databuffer[0]+characteristic.unit);
            break;
          default:
            alert("value = " + JSON.stringify(databuffer)+characteristic.unit);
            break;
        }
        
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicePage');
  }

}
