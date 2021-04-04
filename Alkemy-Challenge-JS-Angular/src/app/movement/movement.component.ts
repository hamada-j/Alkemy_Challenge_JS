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

  arrMovements: Movements[];
  responseError: string;

  movementForm: FormGroup;

  labelPosition: 'positivo' | 'negativo';
  displayedColumns = ['Concepto', 'Tipo', 'Cantidad', 'Fecha'];

  chartOptions: {};
  Highcharts = Highcharts;

  data = []

  constructor(private restFullApi: ApiService, private routing: Router) {



    this.arrMovements = [];
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

  async onSubmitMovement() {

    console.log(this.movementForm.value)
    console.log(this.movementForm.value.fecha['_i'])
  }

  async ngOnInit() {

    await this.restFullApi.getAllMovement("1").then(async res => {
        this.arrMovements = res
        console.log(res)
    }).catch(err => {
          this.responseError = `Error in your login: ${err.statusText}`;
      });


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
        text: "title",
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
      //series: this.data,
      series: [
        {
        name: 'Asia',
        data: [502, 635, 809, 947, 1402, 3634, 5268]
        }, {
            name: 'Africa',
            data: [106, 107, 111, 133, 221, 767, 1766]
        }, {
            name: 'Europe',
            data: [163, 203, 276, 408, 547, 729, 628]
        }, {
            name: 'America',
            data: [18, 31, 54, 156, 339, 818, 1201]
        }, {
            name: 'Oceania',
            data: [2, 2, 2, 6, 13, 30, 46]
        }]
    };

    HC_exporting(Highcharts);
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }



  /** Gets the total cost of all transactions. */
  getTotalCost() {
    const positiveAmount = this.arrMovements.filter(positive => positive.tipo === "positivo").map(t =>  t.cantidad).reduce((acc, value) => acc + value, 0);
    const negativeAmount  = this.arrMovements.filter(positive => positive.tipo === "negativo").map(t =>  t.cantidad).reduce((acc, value) => acc + value, 0);
    return positiveAmount - negativeAmount;
  }

}


