<template>
    <div>
        <Loading :active="isLoading" :color="'#40B883'" :height="70" :width="70" backgroundColor="rgba(192,192,192,1)"
            :is-full-page="true" />
        <div class="container-fluid">

            <div class="row h-100 align-items-center justify-content-center">
                <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-8">
                    <div class="bg-light rounded my-4 mx-3 ">
                        <div style="box-shadow: 1px 2px 5px 2px #191C24;" class="cv d-flex my-2">
                            <div class="cv-left col-md-4 bg-dark px-2 text-white-50">
                                <div class="">
                                    <div class="mb-5" style="width: 100%; aspect-ratio: 1/1;">
                                        <img class="w-100 h-100 img-fluid" style="border-radius: 50%; object-fit: cover;"
                                            id="avatar">
                                    </div>
                                    <div class="mx-1 mb-3">
                                        <h5 class="text-light">THÔNG TIN CÁ NHÂN</h5>
                                        <div class="pl-2">
                                            <div class="d-flex">
                                                <p class="w-100"><i class="fa fa-envelope"></i>
                                                    {{ cv.email }}
                                                </p>
                                            </div>
                                            <div>
                                                <p>
                                                    <svg class="icon" xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 512 512">
                                                        <path
                                                            d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                                                    </svg>
                                                    {{ cv.tel }}
                                                </p>
                                            </div>
                                            <div>
                                                <p>
                                                    <svg class="icon" xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 384 512">
                                                        <path
                                                            d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                                                    </svg>
                                                    {{ cv.address }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mx-1 mb-3">
                                        <h5 class="text-light">CÁC KỸ NĂNG</h5>
                                        <div class="pl-2" v-for="skill in cv.skill">
                                            <div>
                                                <p>- {{ skill }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mx-1 mb-3">
                                        <h5 class="text-light">SỞ THÍCH</h5>
                                        <div class="pl-2" v-for="interest in cv.interest">
                                            <div>
                                                <p>- {{ interest }}</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cv-right m-3">
                                <div class="px-2">
                                    <div class="mb-3">
                                        <div>
                                            <h3>{{ cv.name }}</h3>
                                        </div>
                                        <div class="px-2">
                                            <i>{{ cv.pos }}</i>
                                        </div>
                                    </div>
                                    <div>
                                        <h5>GIỚI THIỆU BẢN THÂN</h5>
                                        <p class="px-2">{{ cv.intro }}</p>
                                    </div>
                                    <div>
                                        <h5>KINH NGHIỆM LÀM VIỆC</h5>
                                        <div v-for="workExperience in cv.workExperience">
                                            <div class="px-2 d-flex align-items-center mb-2">
                                                <icon icon="briefcase" class="mr-2"></icon>
                                                <p class="m-0">  
                                                    Vị trí: {{ workExperience.position }}
                                                    <i class="px-3">||</i>
                                                    Năm bắt đầu: {{ workExperience.from }} - Năm kết thúc: {{
                                                        workExperience.to }}
                                                </p>
                                            </div>
                                            <div class="px-2 d-flex align-items-center mb-2">
                                                <icon icon="building" class="mr-2"></icon>
                                                <p class="m-0">Công ty: {{ workExperience.company }}</p>
                                            </div>
                                            <div class="px-2 d-flex align-items-center">
                                                <icon icon="trophy" class="mr-2"></icon>
                                                <p class="m-0">Các thành tựu đạt được: {{ workExperience.achievements }}</p>
                                            </div>
                                            <hr class="w-75">
                                        </div>
                                    </div>
                                    <div>
                                        <h5>HỌC VẤN</h5>
                                        <div v-for="education in cv.education">
                                            <div>
                                                <div class="px-2 d-flex align-items-center mb-2">
                                                    <icon icon="graduation-cap" class="mr-2"></icon>
                                                    <p class="m-0">                                                      
                                                        Chuyên ngành: {{ education.specialized }}
                                                        <i class="px-3">||</i>
                                                        {{ education.from }} - {{ education.to }}
                                                    </p>
                                                </div>
                                                <div class="px-2 d-flex align-items-center mb-2">
                                                    <icon icon="building-columns" class="mr-2"></icon>
                                                    <p class="m-0">Tên trường: {{ education.school }}</p>
                                                </div>
                                                <div class="px-2 d-flex align-items-center mb-2">
                                                    <icon icon="file-circle-check" class="mr-2"></icon>
                                                    <p class="m-0">Bằng cấp loại: Giỏi</p>
                                                </div>
                                                <div></div>
                                            </div>
                                            <hr class="w-75">
                                        </div>
                                    </div>
                                    <div>
                                        <h5>CHỨNG CHỈ</h5>
                                        <div class="mt-3" v-for="certification in cv.certifications">
                                            <div class="d-flex">
                                                <div class="px-2 d-flex align-items-center mb-2">
                                                    <icon icon="certificate" class="mr-2"></icon> 
                                                    <p class="m-0">Tên chứng chỉ: {{ certification.name }}</p>
                                                </div>
                                                <i class="px-3">||</i>
                                                <div class="d-flex align-items-center mb-2">
                                                    <p class="m-0">Năm: {{ certification.year }}</p>
                                                </div>
                                            </div>
                                            <hr class="w-75 mt-0">
                                        </div>

                                    </div>
                                    <div>
                                        <h5>GIẢI THƯỞNG</h5>
                                        <div>
                                            <ul class="" v-for="award in cv.awards">
                                                <li><icon icon="award" class="mr-2"></icon> Tên giải thưởng: {{ award.name }} </li>
                                                <li><icon icon="calendar-days" class="mr-2"></icon> Năm: {{ award.year }}</li>
                                            </ul>
                                            <hr class="w-75">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./cv-detail.js"></script>
<style src="../../assets/icon.css"></style>
