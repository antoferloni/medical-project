import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-medicos-edit',
  templateUrl: './medicos-edit.page.html',
  styleUrls: ['./medicos-edit.page.scss'],
})
export class MedicosEditPage implements OnInit {

  medicos : any = [];
  id: any;
  isNew : boolean = false;

  constructor(
    private route: ActivatedRoute,
    private readonly firestore: Firestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params:any)=>{
      console.log('params',params);
      this.id = params.id;

      if(params.id=='new'){
        this.isNew=true;
      }else{
        this.obtenerMedicos(this.id);
      }
    });
  }

  editarMedicos = () =>{
    const document = doc(this.firestore, "medicos", this.id);
    updateDoc(document,{
      codigo : this.medicos.codigo,
      nombre : this.medicos.nombre,
      apellido : this.medicos.apellido,
      especialidad : this.medicos.especialidad,
      salario : this.medicos.salario,
    }).then(() => {
      console.log("Fue Modificado con Éxito!!");
      this.router.navigate(['/medicos-list']);
    }).catch(error => {
      console.error("Error al editar:", error);
    });
  }

  guardarMedicos(){
    if (this.isNew) {
      this.incluirMedicos();
    } else {
      this.editarMedicos();
    }
  }

  incluirMedicos = () =>{
    let MedicosRef = collection(this.firestore, "medicos");

    addDoc(MedicosRef,{
      codigo : this.medicos.codigo,
      nombre : this.medicos.nombre,
      apellido : this.medicos.apellido,
      especialidad : this.medicos.especialidad,
      salario : this.medicos.salario,
    }).then(() => {
      console.log("Fue Modificado con Éxito!!");
      this.router.navigate(['/medicos-list']);
    }).catch(error => {
      console.error("Error al agregar:", error);
    });
  }

  obtenerMedicos = async (id: string) => {
    const document = doc(this.firestore, "medicos", id);
    getDoc(document).then(doc =>{
      console.log("Registro a editar", doc.data());
      this.medicos = doc.data();
    })
  }

  eliminarMedicos = () =>{
    const alert = document.querySelector('ion-alert');
    if (alert !== null) {
      alert.present();
    }
  }

  dismissed(ev: any) {
    if (ev.detail.role === 'confirm') {
      const document = doc(this.firestore, "medicos", this.id);
      deleteDoc(document).then(doc => {
        console.log("Registro Eliminado");
        this.router.navigate(['/medicos-list']);
      }).catch(error => {
        console.error("Error al eliminar el registro:", error);
      });
    }
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  setResult(ev:any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }


}
