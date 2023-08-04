<template>
    <div>
        <div class="container-fluid position-relative bg-white d-flex p-0">
          <Loading :active="isLoading"
                   :color="'#40B883'"
                   :height="70"
                   :width="70"
                   backgroundColor="rgba(192,192,192,1)"
                   :is-full-page="true"/>
            <div class="container-fluid">
                <div class="row h-100 align-items-center justify-content-center" style="min-height: 100vh;">
                    <div class="col-12 col-sm-8 col-lg-5">
                        <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <router-link to="/" class="">
                                    <h3 style="color: #00B074;"><i class="fa fa-hashtag me-2"></i>JOT</h3>
                                </router-link>
                                <h3>Đăng ký</h3>
                            </div>

                            <div class="mb-3 justify-content-around radio-selection">
                                <h5>Bạn là: </h5>
                                <br>
                                <div>
                                    <input type="radio" name="authority" value="EMPLOYEE" v-model="authority"> Người tìm việc
                                </div>
                                <div>
                                    <input type="radio" name="authority" value="SEEKER" v-model="authority"> Người đăng tin tìm việc
                                </div>
                            </div>

                            <div class="inpution justify-content-between">
                                <div class="form-floating m-1 ">
                                    <input type="text" class="form-control w-100" id="floatingText" placeholder="jhondoe" v-model="name" autocomplete="off">
                                    <label for="floatingText">Họ và tên</label>
                                </div>
                                <div class="form-floating m-1">
                                    <input type="email" class="form-control w-100" id="floatingInput email"
                                        placeholder="name@example.com" v-model="email" autocomplete="off">
                                    <label for="floatingInput">Email</label>
                                </div>
                            </div>

                            <div class="d-flex">
                                <div class="text-center text-danger fs-6 col-md-6 col-sm-12" v-html="messageName"></div>
                                <div class="text-center text-danger fs-6 col-md-6 col-sm-12" v-html="messageMail"></div>
                            </div>

                            <div class="inpution justify-content-between">
                                <div class="form-floating m-1 ">
                                    <input type="text" class="form-control w-100" id="floatingText" placeholder="jhondoe" v-model="age" autocomplete="off">
                                    <label for="floatingText">Tuổi</label>
                                </div>
                                <div class="form-floating m-1 ">
                                    <input type="text" class="form-control w-100" id="floatingPassword"
                                        placeholder="Password" v-model="tel" autocomplete="off">
                                    <label for="floatingPassword">Số điện thoại</label>
                                </div>
                            </div>

                            <div class="d-flex">
                                <div class="text-center text-danger fs-6 col-md-6 col-sm-12" v-html="messageAge"></div>
                                <div class="text-center text-danger fs-6 col-md-6 col-sm-12" v-html="messageTel"></div>
                            </div>

                            <div class="mb-3 m-1">
                                <label class="mb-2" for="floatingText">Giới tính: </label>
                                <div class="d-flex form-check-inline">
                                    <div class="px-2"><input type="radio" name="gender" id="floatingText" value="false" v-model="gender"> Nam
                                    </div>
                                    <div class="px-2"><input type="radio" name="gender" id="floatingText" value="true" v-model="gender"> Nữ
                                    </div>
                                </div>
                            </div>
                               <div class="text-center text-danger" v-html="message"></div>
                            <button type="button" class="btn btn-primary py-3 w-100 mb-2" @click="register()" :disabled="isValid">Đăng ký</button>
                            <RouterLink class="text-dark" to="/"><button type="button" class="py-3 w-100 mb-4 button1 ">Trở Về Trang Chủ</button></RouterLink>
                            <p class="text-center mb-0">Đã có tài khoản? <RouterLink to="/login">Đăng nhập</RouterLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Sign Up End -->
        </div>
    </div>
</template>

<script src="./register.js"></script>
<style src="./register.css" scoped></style>
<style src="../../assets/style.css"></style>
<style src="../../assets/bootstrap.min.css"></style>
