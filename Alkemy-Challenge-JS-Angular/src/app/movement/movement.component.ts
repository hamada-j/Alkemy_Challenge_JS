import { Component, OnInit } from '@angular/core';

import * as Highcharts from "highcharts";
import HC_exporting from "highcharts/modules/exporting";

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})


export class MovementComponent implements OnInit {

  labelPosition: 'before' | 'after' = 'after';

  chartOptions: {};
  Highcharts = Highcharts;

  data = []

  constructor() { }

  ngOnInit(): void {

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
      series: [{
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

  displayedColumns = ['item', 'cost'];
  transactions: Transaction[] = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 5},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ];

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

}

export interface Transaction {
  item: string;
  cost: number;
}
