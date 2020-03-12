import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '_alert';
import { DeviceDetectorService } from 'ngx-device-detector';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-search-requete',
  templateUrl: './search-requete.component.html',
  styleUrls: ['./search-requete.component.css']
})

@Pipe({
  name: 'split'
})
export class SearchRequeteComponent implements OnInit,PipeTransform {


  transform(input: string, sep: string, inx: number): string {
    return input.split(sep)[inx];
  }
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };
  constructor(private  http:HttpClient, protected alertService: AlertService, private deviceService: DeviceDetectorService) { }
  result=false;
  fromDevise="EUR";
  deviceInfo = this.deviceService.getDeviceInfo();
      isMobile = this.deviceService.isMobile();
      isTablet = this.deviceService.isTablet();
      isDesktopDevice = this.deviceService.isDesktop();
      
  toDevise="XOF";
  isLoading=false;
  allPays=[];
  allPays2=[];
  paysOr="France";
  paysDest="Côte d'Ivoire";
  allCompared=[];
  montant=0;
  emetteur='Particulier';
  acceptCondition=false;
  apiUrl="http://demo.kompara-transfers.com/kompara";

  ngOnInit() {
    console.log(this.deviceInfo);
      console.log(this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
      console.log(this.isTablet);  // returns if the device us a tablet (iPad etc)
      console.log(this.isDesktopDevice); // returns if the app is running on a Desktop browser.
    this.getPays();
    this.callFromDevise('EUR');
    this.callToDevise('XOF');
    this.emetteur=this.getEmetteur('Particulier');
  }

  goToResult(){
    this.result=true;
  }
  backToRequest(){
    this.result=false;
  }
  array_move(arr, old_index, new_index) {
    let arr_copy=arr;
    if (new_index >= arr_copy.length) {
        var k = new_index - arr_copy.length + 1;
        while (k--) {
          arr_copy.push(undefined);
        }
    }
    arr_copy.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr_copy; // for testing
}
  getPays() {
    const req=this.http.get(this.apiUrl+"/getPays.php");
    req.subscribe((resp)=>{
      const json = JSON.stringify(resp);
      this.allPays = JSON.parse(json);
      console.log(this.allPays);
      this.allPays2=this.allPays;
      this.array_move(this.allPays2, 0, 1);
    });
  
  }
  makeComparison() {
    this.isLoading=true;

    const req=this.http.get(this.apiUrl+"/compare.php?amount="+this.montant+"&origin="+this.fromDevise+"&destination="+this.toDevise);
    console.log(this.apiUrl+"/compare.php?amount="+this.montant+"&origin="+this.fromDevise+"&destination="+this.toDevise);
    req.subscribe((resp)=>{
      const fr=0;
      const json = JSON.stringify(resp);
      this.allCompared = JSON.parse(json);
      this.allCompared.forEach(elt => {
        elt.data.payment_opts.forEach(frais => {
          frais=frais.split("_")[1];
          if(Number(frais)>fr){
            elt.data.frais=Number(frais).toFixed(3);
          };
        });
        elt.data.val=((this.montant-elt.data.frais)*elt.data.taux_change).toFixed(3);
        elt.data.taux_change=Number(elt.data.taux_change).toFixed(3);
        elt.data.val=this.formatAmount(elt.data.val);
        elt.data.taux_change=this.formatAmount(elt.data.taux_change);
        elt.data.frais=this.formatAmount(elt.data.frais);

        
      });
     
      /*this.checkData();
      setInterval(this.checkData,5000)*/
      this.isLoading=false;

      console.log(this.allCompared);
    });
  }
  formatAmount(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(/\./g, ',');
  }
  /*checkData(){    
    this.allCompared=this.allCompared;
  }*/
  callFromDevise(element){
    console.log(element);
    this.fromDevise=element;
    this.allPays.forEach(val => {
      if (val.devise==element) {
        this.paysOr=val.pays;
        console.log(this.paysOr);
      }
    });
  }
  callToDevise(element){
    console.log(element);

    this.toDevise=element;
    this.allPays.forEach(val => {
      if (val.devise==element) {
        this.paysDest=val.pays;
        console.log(this.paysDest);
      }
    });
  }
  getEmetteur(element){
    console.log(element);
    this.emetteur=element;

    
    return this.emetteur;
  }
  getMontant(element){
    console.log(element);

    this.montant=element;
  }
  
  checkCheckBoxvalue(event){
    console.log(event.target.checked);
    this.acceptCondition=event.target.checked;
  }
  doQuery(){
    if (this.montant==0) {
      this.alertService.warn('Veuillez entrer un montant valide!!', this.options)
    }
    else if (this.fromDevise=="") {
      this.alertService.warn('Veuillez choisir le pays d\'origine!!', this.options)
    }
    else if (this.toDevise=="") {
      this.alertService.warn('Veuillez choisir le pays de destination!!', this.options)
    }
    else{
      if (this.emetteur='') {
        this.alertService.info('L\'émetteur par défaut choisi est le particulier, merci!!', this.options)
      }
      this.alertService.success('Veuillez patienter pendant le chargement des informations svp!!', this.options);

      this.makeComparison();

      this.result=true;

      this.makeComparison();
      this.makeComparison();


    }
    
  }
}
