import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as Highcharts from "highcharts";
import HC_exporting from "highcharts/modules/exporting";
import { ApiService } from '../api.service';
import { Movements } from '../models/Movemnts';

//import { chartOptions } from '../utils/chartOptions'

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})


export class MovementComponent implements OnInit {

  editMode: boolean;
  docMovement: Movements;
  arrMovements: Movements[];
  positiveAmount: Movements[];
  negativeAmount: Movements[];
  total: number
  responseError: string;

  movementForm: FormGroup;

  labelPosition: 'positivo' | 'negativo';
  displayedColumns = ['Concepto', 'Tipo', 'Cantidad', 'Fecha'];

  chartOptions: {};
  Highcharts = Highcharts;

  data = []

  constructor(private restFullApi: ApiService, private routing: Router) {

    this.editMode = false;
    this.arrMovements, this.positiveAmount, this.negativeAmount = [];
    this.total = 0;
    this.responseError = "";

    this.movementForm = new FormGroup({
      concepto: new FormControl('', [
        Validators.required
      ]),
      fecha: new FormControl('', [
        Validators.required
      ]),
      cantidad: new FormControl('', [
        Validators.required
      ]),
      tipo: new FormControl('', [
        Validators.required
      ])
    });
  }



  formValues(inputs){

    let formValues = {};
    const userId = localStorage.getItem("userId");

    let date = inputs.fecha['_i'];
    let editDate = inputs.fecha

    if (this.editMode){
        formValues = {
        concepto: inputs.concepto.trim(),
        tipo: inputs.tipo,
        cantidad: inputs.cantidad,
        fecha: editDate,
        usuario: userId
      }
    } else {
      formValues = {
      concepto: inputs.concepto.trim(),
      tipo: inputs.tipo,
      cantidad: inputs.cantidad,
      fecha: `${date.year}-${date.month}-${date.date}`,
      usuario: userId
    }
    }return formValues;
  }

  async onSubmitMovement() {
    if ( !this.editMode){
    let doc = this.formValues(this.movementForm.value)
    console.log(doc)
    await this.restFullApi.createMovement(doc).then(async res => {
      console.log(res)
      this.ngOnInit();
      this.movementForm.reset();
    }).catch(err => {
        console.log(err)
      });
    } else {
      let doc = this.formValues(this.movementForm.value);
      let id = this.docMovement.id.toString();
      await this.restFullApi.updateMovement(doc, id).then(async res => {
        console.log(res)
        this.editMode = false;
        this.ngOnInit();
        this.movementForm.reset();
      }).catch(err => {
          console.log(err)
      });
    }


  }
  async delete(e){
    let id = this.docMovement.id.toString()
    await this.restFullApi.deleteUrl(id).then(async res => {
        console.log(res)
        this.editMode = false;
        this.ngOnInit();
        this.movementForm.reset();
      }).catch(err => {
          console.log(err)
      });
  }

  async onEdit(movementId){
    this.movementForm.reset();
    await this.restFullApi.getMovement(movementId).then(async res => {
      let doc = {
        concepto: res[0].concepto,
        tipo: res[0].tipo,
        cantidad: res[0].cantidad,
        fecha: res[0].fecha.substr(0, 10),
      }
      this.movementForm.setValue(doc);
      this.docMovement = {id: res[0].id, ...doc}
      this.editMode = true;

    }).catch(err => {
        console.log(err)
    });


  }

  async ngOnInit() {

    await this.restFullApi.getAllMovement(localStorage.getItem("userId")).then(async resArr => {

      this.arrMovements = resArr

      let data = []

      let objectPositive = {
          name: 'Positivos',
          data: []
          };

      let objectNegative = {
          name: 'Negativos',
          data: []
          };


      console.log(this.arrMovements.length  )
      if (this.arrMovements.length > 0) {

      this.positiveAmount = this.arrMovements.filter(positive => positive.tipo === "positivo");
      const positiveAmount = this.positiveAmount.map(t =>  t.cantidad).reduce((acc, value) => acc + value, 0);

      for( let i = 0; i < this.positiveAmount.length; i++){
        objectPositive.data.push(this.positiveAmount[i].cantidad)
      };

      this.negativeAmount = this.arrMovements.filter(positive => positive.tipo === "negativo")
      const negativeAmount  = this.negativeAmount.map(t =>  t.cantidad).reduce((acc, value) => acc + value, 0);

      for( let i = 0; i < this.negativeAmount.length; i++){
        objectNegative.data.push(this.negativeAmount[i].cantidad)
      };

      this.total = positiveAmount - negativeAmount;


      data.push(objectPositive, objectNegative)

      }

      this.chartOptions = {
        chart: {
          type: "area",
          backgroundColor: "",
        },
        legend: {
          color: "#FF0000",
          backgroundColor: "#FCFFC5",
        },
        colors: ["#2f7ed8", "#0d233a", "#a6c96a", "#f28f43", "#77a1e5"],
        title: {
          text: "Activity",
          style: {
            color: "white",
            fontSize: "18px",
            fill: "black",
          },
        },
        subtitle: {
          text: "Grafica Económica",
          color: "black",
        },
        tooltip: {
          shared: true,
          crosshairs: true,
        },
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: true,
        },
        series: data
      };

    }).catch(err => {
          this.responseError = `Error in your login: ${err.statusText}`;
      });


    HC_exporting(Highcharts);
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }

}


