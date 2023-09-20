<template>
  <div>
    <header-content-admin :title="titlePage"></header-content-admin>
  </div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <div>
    <bar-chart :data="chartData" :labels="chartLabels" />
  </div>
</template>
<script>
import BarChart from '@/views/income/BarChart.vue';
import headerContentAdmin from "@/components/header-content-admin";
import axios from "../../config/axios";
// import eventBus from '@/config/event-bus';
export default {
  components: {
    headerContentAdmin,
    BarChart,
  },
  mounted(){
    this.getData();
    // this.tranData();
  },
  data() {
    return {
      titlePage:"Thống kê thu nhập",
      listIncome: [],
      chartData: [0,0,0,0,0,0,1000000,2100000],
      chartLabels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
    };
  },
  methods: {
    // tranData() {
    //   let data = this.fakeData();
    //   for(let e of data) {
    //     this.chartLabels.push(e.key);
    //     this.chartData.push(e.value);
    //   }
    //   eventBus.emit("data", this.chartData);
    //   eventBus.emit("label", this.chartLabels);
    // },
    getData(){
      axios.get("/payment/income")
      .then((respone) => {
                if(respone.data.status === "error"){
                    toast.error(respone.data.message)
                }else if (respone.data.status === "success"){
                  this.listIncome = respone.data.result;
                }else if (respone.data.status === "not-found"){
                    toast.error(respone.data.message)
                }
            })
    },
    // fakeData() {
    //   return [
    //     {
    //       key: "T1",
    //       value: 100
    //     },
    //     {
    //       key: "T2",
    //       value: 300
    //     },
    //     {
    //       key: "T3",
    //       value: 700
    //     }
    //   ]
    // },
    convert(listIncome){
                 for (let i = 0; i < listIncome.length ; i++) {
                      if(listIncome[i].month === "01")
                        this.month1 = listIncome[i].totalAmount;
                      if(listIncome[i].month === "02")
                        this.month2 = listIncome[i].totalAmount;
                      if(listIncome[i].month ==="03")
                        this.month3 = listIncome[i].totalAmount;
                      if(listIncome[i].month === "04")
                        this.month4 = listIncome[i].totalAmount;
                      if(listIncome[i].month === "05")
                        this.month5 = listIncome[i].totalAmount;
                      if(listIncome[i].month === "06")
                        this.month6 = listIncome[i].totalAmount;
                      if(listIncome[i].month === "07")
                        this.month7 = listIncome[i].totalAmount;
                      if(listIncome[i].month === "08")
                        this.month8 = listIncome[i].totalAmount;
                      if(listIncome[i].month === "09")
                        this.month9 = listIncome[i].totalAmount;
                      if(listIncome[i].month === "10")
                        this.month10 = listIncome[i].totalAmount;
                      if(listIncome[i].month === "11")
                        this.month11 = listIncome[i].totalAmount;
                      if(listIncome[i].month === "12")
                        this.month12 = listIncome[i].totalAmount;
                }
    }
  }
};
</script>