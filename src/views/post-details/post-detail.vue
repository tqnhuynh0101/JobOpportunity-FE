<template>
    <div>
        <Loading :active="isLoading" :color="'#40B883'" :height="70" :width="70" backgroundColor="rgba(192,192,192,1)"
            :is-full-page="true" />
        <div class="container-xxl py-5 wow fadeInUp bg-dark-subtle" data-wow-delay="0.1s">
            <div class="container ">
                <div class="row gy-5 gx-4 d-flex justify-content-between">
                    <div class="col-lg-7 bg-light rounded p-4">
                        <div class="d-flex align-items-center mb-5">
                            <img class="flex-shrink-0 img-fluid border rounded" id="avatar" style="width: 100px;">
                            <div class="text-start ps-4">
                                <h2 class="mb-2" style="color: #00B074;">{{ postDetail.title }}</h2>
                                <span class="text-truncate mb-1">
                                    <icon icon="location-dot" class="me-2 text-primary"></icon>{{ postDetail.address }}
                                </span>
                                <div>
                                    <span class="text-truncate me-3"><i class="far fa-clock text-primary me-2"></i>{{
                                        postDetail.type }}</span>
                                    <span class="text-truncate me-0"><i
                                            class="far fa-money-bill-alt text-primary me-2"></i>{{ postDetail.salaryMin }}
                                        {{
                                            postDetail.unit }} - {{ postDetail.salaryMax }} {{ postDetail.unit }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="mb-5">
                            <h5 class="mb-3 d-flex">Công ty: <h4 class="px-3" style="color: #00B074;">{{ postDetail.company
                            }}</h4>
                            </h5>
                            <h5 class="mb-3 d-flex">Vị trí công việc:<h4 class="px-3" style="color: #00B074;">{{
                                postDetail.position }}</h4>
                            </h5>
                            <div class="mb-3">
                                <h5>Yêu cầu công việc</h5>
                                <p>{{ postDetail.requirement }}</p>
                            </div>
                            <div class="mb-3">
                                <h5>Trách nhiệm</h5>
                                <p>{{ postDetail.duty }}</p>
                            </div>
                            <div class="mb-3">
                                <h5>Trình độ</h5>
                                <p>{{ postDetail.experience }}</p>
                            </div>
                            <div class="mb-3">
                                <h5>Quyền lợi</h5>
                                <p>{{ postDetail.benafit }}</p>
                            </div>
                            <div class="mb-3">
                                <h5>Độ tuổi</h5>
                                <p>{{ postDetail.ageMin }} - {{ postDetail.ageMax }}</p>
                            </div>
                            <div class="mb-3">
                                <h5>Nội dung</h5>
                                <p>{{ postDetail.content }}</p>
                            </div>
                        </div>


                    </div>

                    <div class="col-lg-5">
                        <div class="bg-light rounded p-4 mb-4 wow slideInUp text-left" data-wow-delay="0.1s">
                            <h4 class="mb-4">Thông tin chung</h4>
                            <p>
                                <icon icon="briefcase" class="mx-1"></icon>Tính chất công việc: {{ postDetail.type }}
                            </p>
                            <p>
                                <icon icon="money-check-dollar" class="mx-1"></icon>Lương: {{ postDetail.salaryMin }} {{
                                    postDetail.unit }} - {{ postDetail.salaryMax }} {{ postDetail.unit }}
                            </p>
                            <p>
                                <icon icon="location-dot" class="mx-1"></icon>Địa điểm làm việc : {{ postDetail.address }}
                            </p>
                            <p>
                                <icon icon="envelope" class="mx-1"></icon>Email : {{ postDetail.email }}
                            </p>
                            <p>
                                <icon icon="phone" class="mx-1"></icon>Điện thoại : {{ postDetail.tel }}
                            </p>
                            <p>
                                <icon icon="calendar-days" class="mx-1"></icon>Ngày hết hạn: {{ postDetail.expiredDate }}
                            </p>
                            <div class="mt-3">
                                <div class="col-12 d-flex justify-content-between">
                                    <button v-if="postDetail.checkButton === null" class="btn btn-primary" type="button"
                                        @click="applyPost()">Nộp CV ứng tuyển</button>
                                    <router-link to="/user/list-post"><button class="btn btn-success">Quay
                                            lại</button></router-link>
                                </div>
                                <div class="col-12 text-danger" v-if="postDetail.checkButton != null">
                                    {{ postDetail.checkButton }}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style src="../../views/list-post/index.css"></style>
<style src="../../assets/bootstrap.min.css"></style>

<script src="./post-detail.js"></script>
