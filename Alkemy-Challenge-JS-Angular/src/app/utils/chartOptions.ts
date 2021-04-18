
export const chartOptions = {
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
