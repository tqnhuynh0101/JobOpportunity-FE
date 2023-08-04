<template>
    <div>
        <div class="container-fluid position-relative bg-white d-flex p-0">

          <Loading :active="isLoading"
                   :color="'#40B883'"
                   :height="70"
                   :width="70"
                   backgroundColor="rgba(192,192,192,1)"
                   :is-full-page="true"/>

            <!-- Sign Up Start -->
            <div class="container-fluid">
                <div class="row h-100 align-items-center justify-content-center" style="min-height: 100vh;">
                    <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                        <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <a href="index.html" class="">
                                    <h3 class="text-success"><i class="fa fa-hashtag me-2"></i>JOT</h3>
                                </a>
                                <h3>Nhập otp</h3>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingUser" placeholder="name@example.com" v-model="otp">
                                <label for="floatingUser">Mã otp</label>
                            </div>
                            <div style="min-height: 40px"><p class="text-center text-danger" v-html="message"></p></div>
                            <button type="submit" class="btn btn-primary py-3 w-100 mb-3" @click="importOtp()" :disabled="isValid">Gửi</button>
                            <!-- <div class=" mb-4">
                                <router-link class="btn btn-secondary py-2 px-5 w-100" to="/login">Đăng nhập</router-link>
                            </div>
                            <p class="text-center mb-0">Chưa có tài khoản
                                <router-link to="/register">Đăng ký</router-link>
                            </p> -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- Sign Up End -->
        </div>
    </div>
</template>


<script src="./otp.js"></script>
