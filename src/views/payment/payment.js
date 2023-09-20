import axios from "../../config/axios";
import headerContentAdmin from "@/components/header-content-admin";
import {useToast} from 'vue-toastification';
const toast = useToast();
import Loading from 'vue-loading-overlay';

export default {
    name: "payment",
    components: {
        headerContentAdmin,
        Loading
    },
    data() {
        return {
            titlePage: "Thanh toán",
            type: "0",
            quantity: 0,
            quantityMonth: 0,
            isLoading: false,
            priceByMonth: 1000,
            priceByQuantity: 100,
            priceTotal : 0,
            content: "",
        }
    },
    methods: {
        payment() {
          this.isLoading = true;
          axios.post("payment/pay?amount="+this.priceTotal+"&content="+ this.content+"&type="+this.type+"&quantity="+this.quantity+"&quantityMonth="+ this.quantityMonth)
            .then((response) => {
              if (response.data.status == "error") {
                toast.error(response.data.message);
              } else if (response.data.status == "success") {
                toast.success(response.data.message);
              }
              this.isLoading = false;
            });
        },
    },    
    watch: {
        type(newValue, oldValue) {
                this.priceTotal = 0;
                if(newValue == "0")
                    this.quantity = 0;
                if(newValue == "1")
                    this.quantityMonth = 0;
        },
        quantity(newValue, oldValue) {
            this.priceTotal = this.priceByQuantity * newValue;
        },
        quantityMonth(newValue, oldValue) {
            this.priceTotal = this.priceByMonth * newValue;
        },
      }
}