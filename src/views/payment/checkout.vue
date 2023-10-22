<template>
    <header-content-admin :title="titlePage"></header-content-admin>
        <div class="checkout wow fadeInUp" data-wow-delay="0.1s" style="overflow-y: auto; padding-top: 90px">
        <!-- ===== -->
        <div class="container-fluid">
                    <div class="row h-100 align-items-center justify-content-center" style="min-height: 50vh;">
                        <div class="col-12 col-sm-8 col-lg-5">
                            <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                                <div class="d-flex align-items-center justify-content-between mb-3">
                                    <h3 style="color: #34ac21">Thanh toán thành công</h3>
                                </div>
                                
                                <RouterLink class="btn btn-primary py-3 w-100 mb-2" to="/"><button type="button" @click="paySuccess()" >Completed</button></RouterLink>
                                <!-- <p class="text-center mb-0">Đã có tài khoản? <RouterLink to="/login">Đăng nhập</RouterLink> -->
                                <!-- </p> -->
                            </div>
                        </div>
                    </div>
                </div>
    <!-- ===== -->
        </div>
</template>

<script>
import axios from "../../config/axios";
import headerContentAdmin from "@/components/header-content-admin";

export default {
    name: "checkout",
    components: {
        headerContentAdmin,
    },
    mounted() {
        this.getUrl();
    },
    data() {
        return {
            titlePage: "Check out",
            paymentId: "",
            token: "",
            PayerID: "",
            id: ""
        }
    },
    methods: {
        getUrl() {
            let queryString = window.location.search;
            let urlParams = new URLSearchParams(queryString);

            if (urlParams.has('paymentId')) {
                this.paymentId = urlParams.get('paymentId');
            }

            if (urlParams.has('token')) {
                this.token = urlParams.get('token');
            }

            if (urlParams.has('PayerID')) {
                this.PayerID = urlParams.get('PayerID');
            }if (urlParams.has('id')) {
                this.id = urlParams.get('id');
            }

        },
        paySuccess() {
            axios.get("paypal/pay/success", {
                params: {
                    paymentId: this.paymentId,
                    PayerID: this.PayerID,
                    id:this.id
                }
            });
         
        }
    }
}
</script>