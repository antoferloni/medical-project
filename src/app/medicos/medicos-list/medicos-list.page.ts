import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-medicos-list',
  templateUrl: './medicos-list.page.html',
  styleUrls: ['./medicos-list.page.scss'],
})
export class MedicosListPage implements OnInit {

  constructor
  (
    private readonly firestore: Firestore,
    private router: Router,
    private alertController: AlertController
  ) { }

  listaMedicos = new Array();

  ngOnInit() {
    this.listarMedicos();
  }

  listarMedicos = () =>{
    console.log("Listar Medicos");
    const medicosRef = collection(this.firestore, 'medicos');
    collectionData(medicosRef, {idField:'id'}).subscribe(respuesta=>{
      console.log("estos son los datos ", respuesta);
      this.listaMedicos=respuesta;
    })
  }


}
