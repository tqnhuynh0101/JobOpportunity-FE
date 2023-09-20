<template>
    <div>
      <modal :visible="isVisibleConfirmSave" width="600px" title="XÁC NHẬN LƯU CV" :cancelButton="{
        text: 'Trở lại',
        onclick: closeComfirmSave,
      }" :okButton="{
    text: 'Đồng ý',
    onclick: save,
  }" zIndex="2000" :closable="false">
        <div>
          Bạn có chắc chắn muốn lưu CV này không?
        </div>
      </modal>
      <Loading :active="isLoading" :color="'#40B883'" :height="70" :width="70" backgroundColor="rgba(192,192,192,1)"
        :is-full-page="true" />
      
      <div class="container-fluid">
        
        <div class="row h-100 align-items-center justify-content-center">
          <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-8">
            <div class="bg-light rounded my-4 mx-3 ">
              <router-link v-if="cv !== null" to="/user/view-cv"><button class="btn btn-success">Xem CV</button></router-link>
              <div style="box-shadow: 1px 2px 5px 2px #191C24;" class="cv d-flex my-2">
                <div class="cv-left col-md-4 bg-dark px-2 text-white-50">
                  <div class="">
                    <div class="my-3">
                      <div class="d-flex justify-content-center" style="width: 100%; aspect-ratio: 1/1;">
                        <img class="w-100 h-100 img-fluid" style="border-radius: 50%; object-fit: cover;" id="avatar" :src="previewSrc">
                      </div>
                      <div class="text-center mt-3">
                        <label for="imageCv">
                          <span class="btn btn-primary">Chọn ảnh</span>
                          <input autocomplete="off" type="file" class="visually-hidden" :title="chooseImage" name="imageCv"
                            id="imageCv" data-cy="imageCv" ref="upFileImage" @change="previewImage($event)">
                        </label>
                      </div>
                    </div>
                    <div class="mx-1 mb-3">
                      <h5 class="text-light">THÔNG TIN CÁ NHÂN</h5>
                      <div class="p-2">
                        <div class="d-flex mb-1">
                          <svg class="icon align-self-center" xmlns="http://www.w3.org/2000/svg" height="1em"
                            viewBox="0 0 512 512">
                            <path
                              d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                          </svg>
                          <input style="outline: none; border: none;" type="text" class="form-control bg-dark"
                            placeholder="Email" v-model="email">
                        </div>
                        <div class="d-flex mb-1">
                          <svg class="icon align-self-center" xmlns="http://www.w3.org/2000/svg" height="1em"
                            viewBox="0 0 512 512">
                            <path
                              d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                          </svg>
                          <input style="outline: none; border: none;" type="text" class="form-control bg-dark"
                            placeholder="Số điện thoại" v-model="tel">
                        </div>
                        <div class="d-flex mb-1">
                          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path
                              d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                          </svg>
                          <input style="outline: none; border: none;" type="text" class="form-control bg-dark"
                            placeholder="Quận A, thành phố Hồ Chí Minh" v-model="address">
                        </div>
                      </div>
                    </div>
                    <div class="mx-1 mb-3">
                      <h5 class="text-light">CÁC KỸ NĂNG</h5>
                      <div class="d-flex">
                        <v-autocomplete :items="listBaseSkill" v-model="skillSelect" item-title="skill"
                          v-model:search="newSkill" @keyup.enter="addNewDataSkill" item-text="skill" item-value="skill"
                          :no-data-text="'Nhấn enter để thêm kỹ năng mới'" label="--Chọn kỹ năng của bạn--"
                          variant="solo-filled">
                        </v-autocomplete>
                        <button class="btn btn-dark" @click="addSkill">
                          <icon icon="circle-plus" class="icon-add" style="height=20.625, width: 20.503"></icon>
                        </button>
                      </div>
                      <table class="table table-dark table-hover">
                        <thead>
                          <tr>
                            <th class="text-center">Kỹ Năng</th>
                            <th class="text-center">Xóa</th>
                          </tr>
                        </thead>
                        <tbody v-for="(skill, index) in listSkill">
                          <tr>
                            <td>{{ skill }}
                            </td>
                            <td>
                              <button class="btn-delete" @click="deleteSkill(index)">
                                <icon icon="trash" style="height=1em" class="svgIcon"></icon>
                                <span class="tooltip">Xoá</span>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="mx-1 mb-3">
                      <h5 class="text-light">SỞ THÍCH</h5>
                      <div class="p-2">
                        <div class="d-flex">
                          <div class="d-flex mx-1">
                            <input style="outline: none; border: none;" type="text" class="form-control bg-dark"
                              placeholder="Nhập sở thích" v-model="newInterest" v-on:keyup.enter="addInterest">
                          </div>
                          <button class="btn btn-dark" @click="addInterest">
                            <icon icon="circle-plus" class="icon-add" style="height=20.625, width: 20.503"></icon>
                          </button>
                        </div>
                        <table class="table table-dark table-hover">
                          <thead>
                            <tr>
                              <th class="text-center">Sở thích</th>
                              <th class="text-center">Xóa</th>
                            </tr>
                          </thead>
                          <tbody v-for="(interest, index) in listInterest">
                            <tr>
                              <td>{{ interest }}
                              </td>
                              <td>
                                <button class="btn-delete" @click="deleteInterest(index)">
                                  <icon icon="trash" style="height=1em" class="svgIcon"></icon>
                                  <span class="tooltip">Xoá</span>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cv-right m-3 w-100">
                  <div class="px-2">
                    <div class="mb-3">
                      <div>
                        <h3>{{ name }}</h3>
                      </div>
                      <div class="d-flex mb-1">
                        <input style="outline: none; border: none;" type="text" class="form-control bg-light"
                          placeholder="Vị trí ứng tuyển" v-model="pos">
                      </div>
                    </div>
                    <div>
                      <h5>GIỚI THIỆU BẢN THÂN</h5>
                      <div class="d-flex mb-1">
                        <textarea rows="2" cols="50" style="outline: none; border: none;" type="text"
                          placeholder="Giới thiệu về bản thân của bạn bao gồm mục tiêu và dự định:"
                          class="form-control bg-light" v-model="intro"></textarea>
                      </div>
                    </div>
                    <div>
                      <h5>KINH NGHIỆM LÀM VIỆC</h5>
                      <div>
                        <div class="d-flex mb-1">
                          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                              d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" />
                          </svg>
                          <input style="outline: none; border: none; width: 40%;" type="text"
                            class="form-control bg-light mx-1" placeholder="Vị trí công việc" v-model="workExperiencePos">
                          <div class="d-flex" style="width: 60%;">
                            <input style="outline: none; border: none;" type="number"
                              class="form-control bg-light w-50 mx-1" placeholder="Năm bắt đầu:"
                              v-model="workExperienceBegin">
                            <input style="outline: none; border: none;" type="number" class="form-control bg-light w-50"
                              placeholder="Năm kết thúc:" v-model="workExperienceEnd">
                          </div>
                        </div>
                        <div class="mb-1 d-flex">
                          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                              d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" />
                          </svg>
                          <input style="outline: none; border: none;" type="text" class="form-control bg-light mx-1"
                            placeholder="Tên công ty của bạn" v-model="workExperienceName">
                        </div>
                        <div>
                          <div class="mb-1 d-flex align-items-center">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                              <path
                                d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z" />
                            </svg>
                            <p class="m-0 mx-3">Các thành tựu bạn đạt được:</p>
                          </div>
                          <div class="mb-1 d-flex mx-2">
                            <input style="outline: none; border: none;" type="text" class="form-control bg-light mx-1"
                              placeholder="---Thành tựu đạt được---" v-model="workExperienceAchievement">
                          </div>
                        </div>
                        <button class="btn btn-success" @click="addWorkExperience">Thêm</button>
                      </div>
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th class="text-center">STT</th>
                            <th class="text-center">Vị trí</th>
                            <th class="text-center">Tên công ty</th>
                            <th class="text-center">Bắt đầu</th>
                            <th class="text-center">Kết thúc</th>
                            <th class="text-center">Thành tựu</th>
                            <th class="text-center">Xóa</th>
                          </tr>
                        </thead>
                        <tbody v-for="(wE, index) in workExperience">
                          <tr>
                            <td>{{ index + 1 }}
                            </td>
                            <td>{{ wE.position }}
                            </td>
                            <td>{{ wE.company }}
                            </td>
                            <td>{{ wE.from }}
                            </td>
                            <td>{{ wE.to }}
                            </td>
                            <td>{{ wE.achievements }}
                            </td>
                            <td>
                              <button class="btn-delete" @click="deleteWorkExperience(index)">
                                <icon icon="trash" style="height=1em" class="svgIcon"></icon>
                                <span class="tooltip">Xoá</span>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="mb-3">
                      <h5>HỌC VẤN</h5>
                      <div>
                        <div>
                          <div class="d-flex mb-1">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                              <path
                                d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z" />
                            </svg>
                            <input style="outline: none; border: none; width: 40%;" type="text"
                              class="form-control bg-light mx-1" placeholder="Chuyên ngành" v-model="educationSpecialized">
                            <div class="d-flex" style="width: 60%;">
                              <input style="outline: none; border: none;" type="number"
                                class="form-control bg-light w-50 mx-1" placeholder="Năm bắt đầu:" v-model="educationFrom">
                              <input style="outline: none; border: none;" type="number" class="form-control bg-light w-50"
                                placeholder="Năm kết thúc:" v-model="educationTo">
                            </div>
                          </div>
                          <div class="mb-1 d-flex">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                              <path
                                d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96H48C21.5 96 0 117.5 0 144V464c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48H473.7L337.8 5.4zM256 416c0-35.3 28.7-64 64-64s64 28.7 64 64v96H256V416zM96 192h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V208c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V208zM96 320h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V336zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H336V144c0-8.8-7.2-16-16-16z" />
                            </svg>
                            <input style="outline: none; border: none;" type="text" class="form-control bg-light mx-1"
                              placeholder="Tên trường học" v-model="educationSchool">
                          </div>
                          <div class="mb-1 d-flex">
                            <svg class="icon align-self-center" xmlns="http://www.w3.org/2000/svg" height="1em"
                              viewBox="0 0 576 512">
                              <path
                                d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z" />
                            </svg>
                            <select class="form-select w-25 mx-3" v-model="educationDegree">
                              <option value="Giỏi">Giỏi</option>
                              <option value="Khá">Khá</option>
                              <option value="Trung Bình">Trung bình</option>
                            </select>
                          </div>
                          <div></div>
                        </div>
                        <button class="btn btn-success" @click="addEducation">Thêm</button>
                      </div>
                      <table class="table">
                        <thead>
                          <tr>
                            <th class="text-center">STT</th>
                            <th class="text-center">Chuyên ngành</th>
                            <th class="text-center">Tên trường</th>
                            <th class="text-center">Bắt đầu</th>
                            <th class="text-center">Kết thúc</th>
                            <th class="text-center">Xếp loại</th>
                            <th class="text-center">Xóa</th>
  
                          </tr>
                        </thead>
                        <tbody v-for="(e, index) in education">
                          <tr>
                            <td>{{ index + 1 }}
                            </td>
                            <td>{{ e.specialized }}
                            </td>
                            <td>{{ e.school }}
                            </td>
                            <td>{{ e.from }}
                            </td>
                            <td>{{ e.to }}
                            </td>
                            <td>{{ e.degree }}
                            </td>
                            <td>
                              <button class="btn-delete" @click="deleteEducation(index)">
                                <icon icon="trash" style="height=1em" class="svgIcon"></icon>
                                <span class="tooltip">Xoá</span>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="mb-2">
                      <h5>CHỨNG CHỈ</h5>
                      <div class="">
                        <div class="d-flex">
                          <div class="mb-1 d-flex align-items-center w-75">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                              <path
                                d="M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.3-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z" />
                            </svg>
                            <input style="outline: none; border: none;" type="text" class="form-control bg-light mx-1"
                              placeholder="Tên chứng chỉ" v-model="certificationName">
                          </div>
                          <div class="mb-1 d-flex w-25 align-items-center">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                              <path
                                d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
                            </svg>
                            <input style="outline: none; border: none;" type="number" class="form-control bg-light mx-1"
                              placeholder="Năm" v-model="certificationYear">
                          </div>
                        </div>
                        <button class="btn btn-success" @click="addCertifications">Thêm</button>
                      </div>
                      <table class="table">
                        <thead>
                          <tr>
                            <th class="text-center">STT</th>
                            <th class="text-center">Chứng chỉ</th>
                            <th class="text-center">Năm</th>
                            <th class="text-center">Xóa</th>
  
                          </tr>
                        </thead>
                        <tbody v-for="(certification, index) in certifications">
                          <tr>
                            <td>{{ index + 1 }}
                            </td>
                            <td>{{ certification.name }}
                            </td>
                            <td>{{ certification.year }}
                            </td>
                            <td>
                              <button class="btn-delete" @click="deleteCertification(index)">
                                <icon icon="trash" style="height=1em" class="svgIcon"></icon>
                                <span class="tooltip">Xoá</span>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <h5>GIẢI THƯỞNG</h5>
                      <div>
                        <ul class="d-flex m-0 p-0">
                          <li class="d-flex w-75 pb-2">
                            <svg class="icon align-self-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                              <path
                                d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z" />
                            </svg>
                            <input style="outline: none; border: none;" type="text" class="form-control bg-light mx-1"
                              placeholder="Giải thưởng đạt được" v-model="awardName">
                          </li>
                          <li class="d-flex w-25 mx-2">
                            <svg class="icon align-self-center" xmlns="http://www.w3.org/2000/svg" height="1em"
                              viewBox="0 0 448 512">
                              <path
                                d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
                            </svg>
                            <input style="outline: none; border: none;" type="number" class="form-control bg-light mx-1"
                              placeholder="Năm" v-model="awardYear">
                          </li>
                        </ul>
                        <button class="btn btn-success" @click="addAwards">Thêm</button>
                      </div>
                      <table class="table">
                        <thead>
                          <tr>
                            <th class="text-center">STT</th>
                            <th class="text-center">Tên giải thưởng</th>
                            <th class="text-center">Năm</th>
                            <th class="text-center">Xóa</th>
  
                          </tr>
                        </thead>
                        <tbody v-for="(award, index) in awards">
                          <tr>
                            <td>{{ index + 1 }}
                            </td>
                            <td>{{ award.name }}
                            </td>
                            <td>{{ award.year }}
                            </td>
                            <td>
                              <button class="btn-delete" @click="deleteAward(index)">
                                <icon icon="trash" style="height=1em" class="svgIcon"></icon>
                                <span class="tooltip">Xoá</span>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <button class="btn btn-success dongy mt-3" @click="confirmSave">Đồng ý</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script src="./update-cv.js"></script>
  <style src="./cv.css"></style>
  <style src="../../assets/icon.css"></style>
  