<template>
    <div>
        <Loading :active="isLoading"
             :color="'#40B883'"
             :height="70"
             :width="70"
             backgroundColor="rgba(192,192,192,1)"
             :is-full-page="true"/>
        <div class="container-fluid position-relative bg-white d-flex p-0">
            <!-- Sign Up Start -->
            <div class="container-fluid">
                <div class="row h-100 align-items-center justify-content-center">
                    <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4" style="width: 37%;">
                        <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <a href="index.html" class="">
                                    <h3 class="text-primary"><i class="fa fa-hashtag me-2"></i>JOT</h3>
                                </a>
                                <h4>Thay Đổi mật khẩu</h4>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="oldPass" placeholder="name@example.com"
                                    v-model="oldPassword">
                                <label for="oldPass">Nhập mật khẩu cũ</label>
                            </div>
                            <div class="text-center text-danger" v-html="messageChangeOldPass"></div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="newPass" placeholder="name@example.com"
                                    v-model="newPassword">
                                <label for="newPass">Nhập mật khẩu mới</label>
                            </div>
                            <div class="text-center text-danger" v-html="messageChangeNewPass"></div>
                            <button type="submit" class="btn btn-primary py-3 w-100 mb-3" @click="saveChange()"
                                :disabled="isValid">Lưu thay đổi</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Sign Up End -->
        </div>
    </div>
</template>

<style src="../../assets/style.css"></style>
<style src="../../assets/bootstrap.min.css"></style>
<script src="./change-pass.js"></script>
