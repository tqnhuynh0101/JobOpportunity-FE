<template>
  <div>
    <Loading :active="isLoading"
             :color="'#40B883'"
             :height="70"
             :width="70"
             backgroundColor="rgba(192,192,192,1)"
             :is-full-page="true"/>
    <div class="header-padding">
      <nav class=" navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0 position-fixed top-0 w-100 left-0">
        <div>
          <router-link to="/user/user-home" class="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
            <h1 class="m-0 text-success">JOT</h1>
          </router-link>
        </div>
        <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="menu collapse navbar-collapse" id="navbarCollapse">
          <div class="navbar-nav ms-auto p-4 p-lg-0">

          </div>
        </div>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <div class="navbar-nav ms-auto p-4 p-lg-0">
            <routerLink to="/login" class="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">LOGIN<icon
                icon="right-from-bracket" class="mx-1"></icon>
            </routerLink>
          </div>
        </div>
      </nav>
      <div class="container-xxl py-5 bg-dark page-header my-4">
        <div class="container my-5 pt-5 pb-4">
          <h1 class="display-3 text-white mb-3 animated slideInDown">Job
            List</h1>
        </div>
      </div>
    </div>

    <div class="tab-class text-center wow fadeInUp container-xxl" data-wow-delay="0.3s">
      <div class="tab-content">
        <div id="tab-1" class="tab-pane fade show p-0 active">
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
                    <post v-if="listPost.length > 0" :listPost="listPost"></post>
                    <h2 v-else>Không tìm thấy bài đăng</h2>
        </div>
      </div>
    </div>
    <!-- Jobs End -->


    <!-- Footer Start -->
    <div class="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn " data-wow-delay="0.1s">

      <div class="container py-5">
        <div class="row g-5 d-flex justify-content-center">
          <div class="col-lg-3 col-md-6">
            <h5 class="text-white mb-4">#JOT</h5>
            <router-link class="btn btn-link text-white-50" to="/user/user-home">Trang Chủ</router-link>
            <router-link class="btn btn-link text-white-50" to="/user/list-post">Danh Sách Bài Viết</router-link>
            <router-link class="btn btn-link text-white-50" to="">Tự Động Tìm Việc</router-link>
          </div>
          <div class="col-lg-3 col-md-6">
            <h5 class="text-white mb-4">Cá Nhân</h5>
            <router-link class="btn btn-link text-white-50" to="/user/view-cv">Mẫu CV</router-link>
            <router-link class="btn btn-link text-white-50" to="">Công Việc Đã Ứng Tuyển</router-link>
          </div>
          <div class="col-lg-3 col-md-6">
            <h5 class="text-white mb-4">Thông Tin Liên Hệ</h5>
            <p class="mb-2">
              <icon icon="location-dot" class="mx-1"></icon> 97 Man Thiện, Hiệp Phú 
            </p>
            <p class="mb-2">
              <icon icon="phone" class="mx-1"></icon>(+84)9
              345 67890
            </p>
            <p class="mb-2">
              <icon icon="envelope" class="mx-1"></icon>huynhnqt01@gmail.com.vn
            </p>
            <div class="d-flex pt-2">
              <a class="btn btn-outline-light btn-social" href="">
                <svg style="width: 100px; fill: #757575; size: 100px;" xmlns="http://www.w3.org/2000/svg" height="1em"
                  viewBox="0 0 576 512">
                  <path
                    d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                </svg>
              </a>
              <a class="btn btn-outline-light btn-social" href="">
                <svg style="width: 100px; fill: #757575; size: 100px;" xmlns="http://www.w3.org/2000/svg" height="1em"
                  viewBox="0 0 512 512">
                  <path
                    d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                </svg>
              </a>
              <a class="btn btn-outline-light btn-social" href="">
                <svg style="width: 100px; fill: #757575; size: 100px;" xmlns="http://www.w3.org/2000/svg" height="1em"
                  viewBox="0 0 512 512">
                  <path
                    d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                </svg>
              </a>
              <a class="btn btn-outline-light btn-social" href="">
                <svg style="width: 100px; fill: #757575; size: 100px;" xmlns="http://www.w3.org/2000/svg" height="1em"
                  viewBox="0 0 448 512">
                  <path
                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- Footer End -->
  </div>
</template>


<script src="./home.js"></script>
