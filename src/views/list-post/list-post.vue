
<template>
    <div>
        <Loading :active="isLoading"
             :color="'#40B883'"
             :height="70"
             :width="70"
             backgroundColor="rgba(192,192,192,1)"
             :is-full-page="true"/>

        <div class="container-fluid bg-white p-0">

            <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 class="section-title text-center text-success text-uppercase">FIND
                    A JOB</h6>
                <h1 class="mb-3">Suitable <span class="text-success text-uppercase">For You</span></h1>
            </div>
            <!-- Header End -->

            <!-- Jobs Start -->
            <div class="container-xxl py-5">
                <div class="container">
                    <div class="container1 mb-3 ">
                        <div class="research">
                            <input type="email" class="input-find form-control w-100" id="floatingInput1" v-model="search"
                                placeholder="Công việc muốn ứng tuyển...">
                        </div>
                        <div class="all-job mx-2 ">
                            <v-autocomplete :items="listProvince" v-model="selectedProvince" item-title="fullName"
                                item-text="fullName" item-value="code" :no-data-text="'Không có dữ liệu'"
                                label="--Tỉnh/Thành phố--" variant="solo-filled">
                            </v-autocomplete>
                        </div>
                        <div class="all-role mx-2 ">

                            <v-autocomplete :items="listDistrict" v-model="selectedDistrict" item-title="fullName"
                                item-text="fullName" item-value="code" no-data-text="Không có dữ liệu"
                                label="--Quận/Huyện--" variant="solo-filled">
                            </v-autocomplete>

                        </div>
                        <div class="all-location mx-2">
                            <v-autocomplete :items="listWard" v-model="selectedWard" item-title="fullName"
                                item-text="fullName" item-value="code" no-data-text="Không có dữ liệu" label="--Phường/Xã--"
                                variant="solo-filled">
                            </v-autocomplete>
                        </div>
                        <button type="button" class="btn btn-primary input-find-btn col-md-1"
                            @click="getAllPostByAddress()"> Search
                            <svg style="width: 15px; fill: white;" xmlns="http://www.w3.org/2000/svg" height="1em"
                                viewBox="0 0 512 512">
                                <path
                                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                            </svg>
                        </button>
                    </div>
                    <!-- Phân trang -->
                    <nav aria-label="..." class="d-flex flex-row justify-content-center container-fluid" v-if ="pageCheck === 1">
                        <ul class="pagination page">
                            <li class="page-item link" :class="{ disabled: isFirstPage }">
                                <a class="page-link" href="#" @click="changePage(page - 1)">Trang Trước</a>
                            </li>
                            <li>
                                <input class="form-control" type="text" v-model="currentPageInput"
                                    @change="updateCurrentPage">
                            </li>
                            <li class="fs-3">/</li>
                            <li class="fs-3 page-item">
                                <a href="#" class="page-link disabled" style="background: #00B074;">{{ totalPages }}</a>
                            </li>
                            <li class="page-item link" :class="{ disabled: isLastPage }">
                                <a class="page-link" href="#" @click="changePage(page + 1)">Trang Sau</a>
                            </li>
                        </ul>
                    </nav>
                    <button class="btn btn-success" @click="changeCheck" style="margin-left: 1120px; margin-top: -10px;" v-if="pageCheck === 0">Quay lại</button>                    
                    
                    <!-- End phân trang -->
                    <div class="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                        <div class="tab-content">
                            <div id="tab-1" class="tab-pane fade show p-0 active">
                                <!-- //11111111 -->
                                <h1 v-if="messageNotFound != ''">{{ messageNotFound }} 😢</h1>
                              <post :listPost="listPost" v-if ="pageCheck === 1"></post>
                              <post :listPost="listPostSearch" v-if ="pageCheck === 0"></post>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Jobs End -->
            <button class="btn btn-success" @click="changeCheck" style="margin-left: 1250px; margin-top: -60px;" v-if="pageCheck === 0">Quay lại</button>
            <!-- Phân trang -->
            <nav aria-label="..." class="d-flex flex-row justify-content-center" v-if ="pageCheck === 1">
                <ul class="pagination page">
                    <li class="page-item link" :class="{ disabled: isFirstPage }">
                        <a class="page-link" href="#" @click="changePage(page - 1)">Trang Trước</a>
                    </li>
                    <li>
                        <input class="form-control" type="text" v-model="currentPageInput"
                            @change="updateCurrentPage">
                    </li>
                    <li class="fs-3">/</li>
                    <li class="fs-3 page-item">
                        <a href="#" class="page-link disabled" style="background: #00B074;">{{ totalPages }}</a>
                    </li>
                    <li class="page-item link" :class="{ disabled: isLastPage }">
                        <a class="page-link" href="#" @click="changePage(page + 1)">Trang Sau</a>
                    </li>
                </ul>
                
            </nav>
            
            <!-- End phân trang -->

            <!-- Back to Top -->
            <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top">
                <svg style="width: 15px; fill: white;" xmlns="http://www.w3.org/2000/svg" height="1em"
                    viewBox="0 0 384 512">
                    <path
                        d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
            </a>
        </div>
    </div>
</template>
<style src="./index.css"></style>
<style src="../../assets/bootstrap.min.css"></style>

<script src="./list-post.js"></script>
