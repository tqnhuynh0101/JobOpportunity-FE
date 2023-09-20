<template>
    <div>
      <!-- {{ data }} -->
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
import Chart from 'chart.js/auto';
// import eventBus from '@/config/event-bus';
  
  export default {
    name: 'BarChart',
    // props: ["data", "labels"],
    props: {
    data: Array, // An array of data points for the chart
    labels: Array, // An array of labels for the data points
  },
    mounted() {
      // eventBus.on('data', (content) => {
      //   this.data = content;
      // });
      // eventBus.on('label', (content) => {
      //   this.labels = content;
      // });
      this.renderChart();
    },
    // data() {
    //   return {
    //     data: [],
    //     labels: []
    //   }
    // },
    methods: {

      renderChart() {
        const ctx = this.$refs.chartCanvas.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.labels,
            datasets: [
              {
                label: 'Thu Nhập:',
                data: this.data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Adjust as needed
                borderColor: 'rgba(75, 192, 192, 1)', // Adjust as needed
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
    },
  };
  </script>