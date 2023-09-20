<template>
    <div class="container bootdeys">
        <Loading :active="isLoading" :color="'#40B883'" :height="70" :width="70" backgroundColor="rgba(192,192,192,1)"
            :is-full-page="true" />
        <div class="row">
            <div class="d-flex justify-content-between">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Thay Đổi Thông Tin Cá Nhân</h4>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Họ và Tên <span style="color: red;">*</span></label>
                                <input type="text" class="form-control" v-model="account.name">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Tuổi <span style="color: red;">*</span></label>
                                <input type="tel" class="form-control" v-model="account.age">
                            </div>
                            <div class="col-md-12 d-flex mb-3">
                                <label for="">Giới Tính: </label>
                                <div class="form-check form-switch mx-3">
                                    <input class="form-check-input" type="radio" name="gioitinh" id="gioitinhNam" value="false"
                                         v-model="account.gender">
                                    <label class="form-check-label" for="gioitinhNam">Nam</label>
                                </div>
                                <div class="form-check form-switch mx-3">
                                    <input class="form-check-input" type="radio" name="gioitinh" id="gioitinhNu" value="true"
                                        v-model="account.gender" >
                                    <label class="form-checSk-label" for="gioitinhNu">Nữ</label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">E-mail <span style="color: red;">*</span></label>
                                <input type="email" class="form-control" v-model="account.email">
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Số Điện Thoại <span style="color: red;">*</span></label>
                                <input type="text" class="form-control" v-model="account.tel">
                            </div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <button type="submit" class="btn btn-primary" @click="confirmChange()">Cập Nhập</button>
                        <router-link to="/"><button type="reset" class="btn btn-secondary mx-2">Trở về Trang
                                Chủ</button></router-link>
                    </div>
                </div>
                <div class="col-md-3 ">
                    <div class="card img-info">
                        <div class="card-body text-center">
                            <img width="50%" style="border-radius: 88px 36px 90px 35px;"
                                src="https://bootdey.com/img/Content/avatar/avatar6.png" class="img-circle profile-avatar"
                                alt="User avatar">
                        </div>
                    </div>
                    <div class="card mt-3">
                        <div class="card-body ">
                            <!-- <ul class="list-style-none">
                                <li>asdasd</li>
                                <li>asdasd</li>
                                <li>asdasd</li>
                                <li>asdsad</li>
                            </ul> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped src="./change-information.css"></style>
<style src="../../assets/bootstrap.min.css"></style>
<script src="./change-information.js"></script>