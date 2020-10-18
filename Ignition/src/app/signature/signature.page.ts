import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements OnInit {

  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  
@ViewChild(SignaturePad) signaturePad: SignaturePad
  constructor(public navCtrl: NavController, private route: Router, public alertcontroller: AlertController) { }

  public signatureImage: string;
//  public signaturePad: SignaturePad
    saveButton: boolean = false

  ngOnInit() {
  }

  async onSave(data)
  {

    console.log(this.signaturePad)
    console.log(this.signaturePad.toDataURL())
   let alert = await this.alertcontroller.create({
     header: 'Success',
     message: "Signature Successfully Captured",
     
   })
    // this.service.tempAppoint.signature = data;
  }

  Begin()
  {
    this.saveButton = true
  }

  clear()
  {
    this.signaturePad.clear()
  }

}
