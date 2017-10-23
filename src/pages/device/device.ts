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
  characteristics: any[] = [];
  //characteristicList: any[] = [];
  temperatureButtonLabel: string = "START";
  temperatureSensor;
  temp = [];
  startTemperature: boolean = false;
  temperatureValue: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public ble: BLE, public cl_service: Service) {
    this.device = this.navParams.get('device');
    this.onConnect();
  }

  /**
   * Connect to the device and read its characteristics
   */
  onConnect() {
    this.spinner = true;
    this.characteristics = [];
    let deviceID = this.device.id;

    this.ble.connect(deviceID).subscribe(peripheralData => {
      console.log(peripheralData.characteristics);
      this.characteristics = peripheralData.characteristics;
      //this.characteristicList = this.characteristics;
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

  /**
   * Order characteristics by services and parse the values to display more informations
   */
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
    //this.characteristics = this.characteristicList;
  }
  
  /**
   * Read characteristic info
   * @param deviceID 
   * @param service 
   * @param characteristic 
   */
  onReadCharacteristic(deviceID,service,characteristic) {
    
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
            alert(characteristic.characteristic+"\r\nvalue = " + JSON.stringify(databuffer)+characteristic.unit+"\r\n"+ databuffer[0]+characteristic.unit);
            break;
        }
        
      }
    );
  }

  onTemperatureSwitchChange(event){
    let value = this.temperatureSensor ? 0x01 : 0x00;
    let buffer = new Uint8Array([value]);
    alert("value " + value+"\r\n"+buffer);
    this.onWriteCharacteristic("F000AA00-0451-4000-B000-000000000000","F000AA02-0451-4000-B000-000000000000",value);
  }
  
  onReadTemperature(){
    this.startTemperature = !this.startTemperature;
    this.temperatureButtonLabel = this.startTemperature == true ? "STOP" : "START"
    //var value = new Uint16Array(1);
    var value = new Uint8Array(1);
    
    if(this.startTemperature == true){
      value[0] = 0x01;
      this.onWriteCharacteristic("F000AA00-0451-4000-B000-000000000000","F000AA02-0451-4000-B000-000000000000",value);
    } else {
      value[0] = 0x00;
      this.onWriteCharacteristic("F000AA00-0451-4000-B000-000000000000","F000AA02-0451-4000-B000-000000000000",value);
    }
  }


  /**
   * Write on characteristic
   * @param service 
   * @param characteristic 
   * @param value 
   */
  onWriteCharacteristic(service, characteristic, value){
    this.ble.write(this.device.id,service,characteristic,value).then(
      function(res){
         alert("Ecriture : " + JSON.stringify(res));
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicePage');
  }

}
