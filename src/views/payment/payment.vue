<template>
    <header-content-admin :title="titlePage"></header-content-admin>
        <div class="checkout wow fadeInUp" data-wow-delay="0.1s" style="overflow-y: auto; padding-top: 90px">
        <!-- ===== -->
        <div class="container-fluid">
                    <div class="row h-100 align-items-center justify-content-center" style="min-height: 50vh;">
                        <div class="col-12 col-sm-8 col-lg-5">
                            <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                                <div class="d-flex align-items-center justify-content-between mb-3">
                                    <router-link to="/" class="">
                                        <h3 style="color: #00B074;"><i class="fa fa-hashtag me-2"></i>JOT</h3>
                                    </router-link>
                                    <h3 style="color: #34ac21">Thanh Toán</h3>
                                </div>
    
                                <div class="mb-3 justify-content-around radio-selection" style="display: block;">
                                    <h5>Chọn hình thức thanh toán:  </h5>
                                    <div class="row" style="display: block">
                                        <div>
                                            <input type="radio" value= 0 v-model="type"> Theo bài
                                        </div>
                                        <div>
                                            <input type="radio" value= 1 v-model="type"> Theo tháng
                                        </div>
                                    </div>
                                </div>
                                <div class="soluongbai" v-if = "type === '0'">
                                    <h5>
                                        Chọn số lượng bài: 
                                    </h5>
                                   <div>
                                    <ul style="display: flex; justify-content: space-between">
                                        <div>
                                            <li>
                                                    <input type="radio" value= 10 v-model="quantity"> 10
                                            </li>
                                        <li>
                                                <input type="radio" value= 50 v-model="quantity"> 50
                                        </li>
                                        </div>
                                    <div class="row" style="display: flex; ">
                                        <li>
                                                <input type="radio" value= 100 v-model="quantity"> 100
                                        </li>
                                        <li>
                                                <input type="radio" value=1000 v-model="quantity"> 1000
                                        </li>
                                    </div>
                                        
                                    </ul>
                                   </div>
                                </div>
                                <div class="soluongbai" v-if = "type === '1'">
                                    <h5>
                                        Chọn theo tháng 
                                    </h5>
                                   <div>
                                    <ul style="display: flex; justify-content: space-between">
                                        <div>
                                            <li>
                                                <div>
                                                    <input type="radio" value= 1 v-model="quantityMonth"> 1 tháng
                                                </div>
                                            </li>
                                        <li>
                                            <div>
                                                <input type="radio"  value= 3 v-model="quantityMonth"> 1 quý
                                            </div>
                                        </li>
                                        </div>
                                    <div class="row" style="display: flex; ">
                                        <li>
                                            <div>
                                                <input type="radio" value= 6 v-model="quantityMonth"> 6 tháng
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <input type="radio" value= 12 v-model="quantityMonth"> 1 năm
                                            </div>
                                        </li>
                                    </div>
                                        
                                    </ul>
                                   </div>
                                </div>
    
                                <h5>
                                       Số tiền phải thanh toán: {{ priceTotal }} VNĐ
                                </h5>
                                
                                   <!-- <div class="text-center text-danger" v-html="message"></div> -->
                                <button type="button" class="btn btn-primary py-3 w-100 mb-2" @click="payment()" :disabled="isValid">Đồng ý</button>
                                <RouterLink class="text-dark" to="/"><button type="button" class="py-3 w-100 mb-4 button1 ">Trở Về Trang Chủ</button></RouterLink>
                                <!-- <p class="text-center mb-0">Đã có tài khoản? <RouterLink to="/login">Đăng nhập</RouterLink> -->
                                <!-- </p> -->
                            </div>
                        </div>
                    </div>
                </div>
    <!-- ===== -->
        </div>
          
    </template>
    
    <script src="./payment.js"></script>