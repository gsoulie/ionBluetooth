import { Injectable } from '@angular/core';
@Injectable()

export class Service{
    
    services: any[] = [
    {uuid:'1800',name:'Generic Access'},
    {uuid:'1811',name:'Alert Notification Service'}, 
    {uuid:'1815',name:'Automation IO'},
    {uuid:'180F',name:'Battery Service'},
    {uuid:'1810',name:'Blood Pressure'},
    {uuid:'181B',name:'Body Composition'},
    {uuid:'181E',name:'Bond Management Service'},
    {uuid:'181F',name:'Continuous Glucose Monitoring'},
    {uuid:'1805',name:'Current Time Service'},
    {uuid:'1818',name:'Cycling Power'},
    {uuid:'1816',name:'Cycling Speed and Cadence'},
    {uuid:'180A',name:'Device Information'},
    {uuid:'171A',name:'Environmental Sensing'},
    {uuid:'1826',name:'Fitness Machine'},
    {uuid:'1801',name:'Generic Attribute'},
    {uuid:'1808',name:'Glucose'},
    {uuid:'1809',name:'Health Thermometer'},
    {uuid:'180D',name:'Heart Rate'},
    {uuid:'1823',name:'HTTP Proxy'},
    {uuid:'1812',name:'Human Interface Device'},
    {uuid:'1802',name:'Immediate Alert'},
    {uuid:'1821',name:'Indoor Positioning'},
    {uuid:'1820',name:'Internet Protocol Support'},
    {uuid:'1803',name:'Link Loss'},
    {uuid:'1819',name:'Location and Navigation'},
    {uuid:'1827',name:'Mesh Provisioning Service'},
    {uuid:'1828',name:'Mesh Proxy Service'},
    {uuid:'1807',name:'Next DST Change Service'},
    {uuid:'1825',name:'Object Transfert Service'},
    {uuid:'180E',name:'Phone Alert Status Service'},
    {uuid:'1822',name:'Pulse Oximeter Service'},
    {uuid:'1806',name:'Reference Time Update Service'},
    {uuid:'1814',name:'Running Speed and Cadence'},
    {uuid:'1813',name:'Scan Parameters'},
    {uuid:'1824',name:'Transport Discovery'},
    {uuid:'1804',name:'Tx Power'},
    {uuid:'181C',name:'User Data'},
    {uuid:'181D',name:'Weight Scale'},
    {uuid:'F000AA00-0451-4000-B000-000000000000',name:'IR Temperature Service'},
    {uuid:'F000AA20-0451-4000-B000-000000000000',name:'Humidity Service'},
    {uuid:'F000AA10-0451-4000-B000-000000000000',name:'Accelerometer Service'},
    {uuid:'F000AA00-0430-4000-B000-000000000000',name:'Magnetometer Service'},
    {uuid:'F000AA40-0451-4000-B000-000000000000',name:'Barometer Service'},
    {uuid:'F000AA50-0451-4000-B000-000000000000',name:'Gyroscope Service'},
    {uuid:'FFE0',name:'Simple Keys Service'},
    {uuid:'F000AA60-0451-4000-B000-000000000000',name:'Test Service'},
    {uuid:'F000CCC0-0451-4000-B000-000000000000',name:'Connection Control Service'},
    {uuid:'F000AC00-0451-4000-B000-000000000000',name:'Register Service'},
    {uuid:'F000AA64-0451-4000-B000-000000000000',name:'IO Service'},
    {uuid:'F000AA70-0451-4000-B000-000000000000',name:'Luxometer Service'},
    {uuid:'F000AA80-0451-4000-B000-000000000000',name:'Movement Service'},
    {uuid:'F000FFC0-0451-4000-B000-000000000000',name:'OAD Service'}];

    characteristics: any[] = [
        {uuid:'2A00',name:'Device Name', type: 'string', unit:''},
        {uuid:'2A01',name:'Appearance', type: 'number', unit:''},    
        {uuid:'2A04',name:'Peripheral Preferred Connection Parameters', type: 'number', unit:''}, 
        {uuid:'2A23',name:'System ID', type: 'number', unit:''},
        {uuid:'2A24',name:'Model Number', type: 'string', unit:''},  
        {uuid:'2A25',name:'Serial Number', type: 'string', unit:''},
        {uuid:'2A26',name:'Firmware Revision', type: 'string', unit:''}, 
        {uuid:'2A27',name:'Hardware Revision', type: 'string', unit:''}, 
        {uuid:'2A28',name:'Software Revision', type: 'string', unit:''}, 
        {uuid:'2A29',name:'Manufacturer Name', type: 'string', unit:''}, 
        {uuid:'2A2A',name:'IEEE 11073-20601 Regulatory Certification Data List', type: 'complex', unit:''},
        {uuid:'2A50',name:'PnP ID', type: 'complex', unit:''},
        {uuid:'2A19',name:'Battery Level', type: 'number', unit:'%'},
        {uuid:'2904',name:'', type: 'string', unit:''}
        ];

    constructor() {
    }
    getServices(){
        return this.services;
    }
    getServiceName(uuid: string = ""){

        for(let i=0; i<this.services.length; i++){
            if(this.services[i].uuid == uuid.toUpperCase()){
                return this.services[i].name;
            }
        }
        return "0x"+uuid;
    }
    getCharacteristicName(uuid: string = ""){
        for(let i=0; i<this.characteristics.length; i++){
            if(this.characteristics[i].uuid == uuid.toUpperCase()){
                return this.characteristics[i].name;
            }
        }
        return "0x"+uuid;
    }
    getCharacteristicType(uuid: string = ""){
        for(let i=0; i<this.characteristics.length; i++){
            if(this.characteristics[i].uuid == uuid.toUpperCase()){
                return this.characteristics[i].type;
            }
        }
        return "string";
    }
    getCharacteristicUnit(uuid: string = ""){
        for(let i=0; i<this.characteristics.length; i++){
            if(this.characteristics[i].uuid == uuid.toUpperCase()){
                return this.characteristics[i].unit;
            }
        }
        return '';
    }
}