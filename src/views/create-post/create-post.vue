<template>
  <div>

    <modal :visible="isVisibleConfirmSave" width="600px" title="XÁC NHẬN LƯU BÀI VIẾT"
           :cancelButton="{
              text: 'Trở lại',
              onclick: closeConfirm,
           }"
           :okButton="{
              text: 'Đồng ý',
              onclick: save,
           }"
           zIndex="2000" :closable="false">
      <div>
        Bạn có chắc chắn muốn gửi bài viết này không?
      </div>
    </modal>
    <Loading :active="isLoading"
             :color="'#40B883'"
             :height="70"
             :width="70"
             backgroundColor="rgba(192,192,192,1)"
             :is-full-page="true"/>

    <header-content-admin :title="titlePage"></header-content-admin>
    <!-- Checkout Start -->

    <div class="checkout wow fadeInUp" data-wow-delay="0.1s" style="overflow-y: auto; padding-top: 90px">
      <div class="container">
        <div class="row">
          <!-- ========= -->
          <div class="d-flex align-items-center justify-content-center responsive-app">
            <div class="research mx-2">
              <input type="email" class="input-find form-control w-100" id="floatingInput1" v-model="address"
                placeholder="Địa chỉ cụ thể * ">
            </div>
            <div class="all-job mx-2 ">
              <!-- <input type="text" v-model="address" placeholder="Địa chỉ cụ thể"> -->
              <v-autocomplete :items="listProvince" v-model="selectedProvince" item-title="fullName" item-text="fullName"
                item-value="code" :no-data-text="'Không có dữ liệu'" label="--Tỉnh/Thành phố--" variant="solo-filled">
              </v-autocomplete>
            </div>
            <div class="all-role mx-2 ">

              <v-autocomplete :items="listDistrict" v-model="selectedDistrict" item-title="fullName" item-text="fullName"
                item-value="code" no-data-text="Không có dữ liệu" label="--Quận/Huyện--" variant="solo-filled">
              </v-autocomplete>

            </div>
            <div class="all-location mx-2">
              <v-autocomplete :items="listWard" v-model="selectedWard" item-title="fullName" item-text="fullName"
                item-value="code" no-data-text="Không có dữ liệu" label="--Phường/Xã--" variant="solo-filled">
              </v-autocomplete>
            </div>
          </div>


          <!-- ========= -->
          <div class="col-md-7">

            <div class="billing-address">
              <div class="row ">
                <div class="col-md-12 pb-4">
                  <label for="title">Tiêu Đề <span style="color: red;">*</span></label>
                  <input class="form-control" id="title" type="text" placeholder="Quản Trị Kinh Doanh, Maketting..." v-model="title"
                    autocomplete="off">
                  <div class="text-start text-danger" v-html="messageTitle"></div>
                </div>

                <div class="col-md-12 pb-4">
                  <label for="content">Mô Tả Công Việc <span style="color: red;">*</span></label>
                  <textarea class="form-control" id="content" cols="10" rows="10"
                    placeholder="Hãy viết mô tả công việc của bạn vào đây..." v-model="content"
                    autocomplete="off"></textarea>
                  <div class="text-start text-danger" v-html="messageContent"></div>
                </div>
                <div class="col-md-12 pb-4">
                  <label for="quantity">Số Lượng Tuyển <span style="color: red;">*</span></label>
                  <input class="form-control" type="text" id="quantity" placeholder="Nhập số lượng cần tuyển..." v-model="quantity"
                    autocomplete="off">
                  <div class="text-start text-danger" v-html="messageQuantity"></div>
                </div>
                <div class="col-md-6 pb-4">
                  <label for="ageMax">Độ tuổi lớn nhất <span style="color: red;">*</span></label>
                  <input class="form-control" type="text" id="ageMax" placeholder="Độ tuổi lớn nhất 60" v-model="ageMax"
                    autocomplete="off">
                  <div class="text-start text-danger" v-html="messageMaxAge"></div>
                </div>
                <div class="col-md-6 pb-4">
                  <label for="ageMin">Độ tuổi nhỏ nhất <span style="color: red;">*</span></label>
                  <input class="form-control" type="text" id="ageMin" placeholder="Độ tuổi bé nhất 18" v-model="ageMin"
                    autocomplete="off">
                  <div class="text-start text-danger" v-html="messageMinAge"></div>
                </div>
                <div class="col-md-12 d-flex pb-4">
                  <label for="">Giới Tính:</label>
                  <div class="form-check form-switch mx-3">
                    <input class="form-check-input" type="radio" name="gioitinh" id="gioitinhNam" value="0"
                      v-model="gender" checked>
                    <label class="form-check-label" for="gioitinhNam">Nam</label>
                  </div>
                  <div class="form-check form-switch mx-3">
                    <input class="form-check-input" type="radio" name="gioitinh" id="gioitinhNu" v-model="gender"
                      value="1">
                    <label class="form-check-label" for="gioitinhNu">Nữ</label>
                  </div>
                  <div class="form-check form-switch mx-3">
                    <input class="form-check-input" type="radio" name="gioitinh" id="tatCa" v-model="gender" value="2">
                    <label class="form-check-label" for="tatCa">Tất Cả</label>
                  </div>
                </div>

                <div class="col-md-12 pb-4">
                  <label for="experience">Số năm kinh nghiệm <span style="color: red;">*</span></label>
                  <input class="form-control" type="text" placeholder="Kinh nghiệm của bạn" id="experience" v-model="experience"
                    autocomplete="off">
                  <div class="text-start text-danger" v-html="messageExperience"></div>
                </div>
                <div class="col-md-6 pb-4 d-flex">
                  <label for="type">Hình Thức:</label>
                  <div class="form-check mx-3">
                    <input type="radio" class="form-check-input" name="optradio5" value="PART_TIME" v-model="type"
                      checked>
                    <label class="form-check-label" for="type">Part Time</label>
                  </div>
                  <div class="form-check">
                    <input type="radio" class="form-check-input" name="optradio5" value="FULL_TIME" v-model="type"
                      checked>
                    <label class="form-check-label" for="type">Full Time</label>
                  </div>
                </div>
                <div class="col-md-6 pb-4 d-flex">
                  <label for="format">Cách thức làm việc:</label>
                  <div class="form-check mx-3">
                    <input type="radio" class="form-check-input" name="optradio6" value="ONLINE" v-model="format" checked>
                    <label class="form-check-label" for="type">Online</label>
                  </div>
                  <div class="form-check">
                    <input type="radio" class="form-check-input" name="optradio6" value="OFFLINE" v-model="format"
                      checked>
                    <label class="form-check-label" for="type">Offline</label>
                  </div>
                </div>
                <div class="col-md-12 pb-4">
                  <label for="position">Vị trí công viêc <span style="color: red;">*</span></label>
                  <input class="form-control" type="text" id="position" placeholder="Vị trí bạn cần tuyển..." v-model="position"
                    autocomplete="off">
                  <div class="text-start text-danger" v-html="messagePosition"></div>
                </div>
                <div class="col-md-12 pb-4">
                  <label for="requirements">Yêu cầu ứng viên <span style="color: red;">*</span></label>
                  <textarea class="form-control" id="requirements" rows="5" placeholder="Yêu cầu cho ứng viên..."
                    v-model="requirements" autocomplete="off"></textarea>
                  <div class="text-start text-danger" v-html="messageRequirements"></div>
                </div>
                <div class="col-md-12 pb-4">
                  <label for="benefit">Quyền lợi ứng viên <span style="color: red;">*</span></label>
                  <textarea class="form-control" id="benefit" rows="5" placeholder="Quyền lợi ứng viên ứng viên có thể nhận..." v-model="benafit"
                    autocomplete="off"></textarea>
                  <div class="text-start text-danger" v-html="messageBenafit"></div>
                </div>
                <div class="col-md-12 pb-4">
                  <label for="duty">Nghĩa vụ ứng viên <span style="color: red;">*</span></label>
                  <textarea class="form-control" id="duty" rows="5" placeholder="Trách nhiệm của ứng viên...." v-model="duty"
                    autocomplete="off"></textarea>
                  <div class="text-start text-danger" v-html="messageDuty"></div>
                </div>

                <div class="col-md-12 d-flex pb-4">
                  <label for="">Lương:</label>
                  <div class="form-check mx-3">
                    <input type="radio" class="form-check-input" name="optradio2" value="false" v-model="salary" checked
                      autocomplete="off">
                    <label class="form-check-label" for="radio3">Lương Thoả Thuận</label>
                  </div>
                  <div class="form-check">
                    <input type="radio" class="form-check-input" name="optradio2" value="true" v-model="salary" checked
                      autocomplete="off">
                    <label class="form-check-label" for="radio3">Có Giới Hạn Lương</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="salaryMax">Lương Tối Đa <span style="color: red;">*</span></label>
                  <input class="form-control" type="text" id = "salaMax" placeholder="Max Salary..."
                    :disabled="salaryCheck" v-model="salaryMax" autocomplete="off">
                  <div class="text-start text-danger" v-show="!salaryCheck" v-html="messageSalaryMax"></div>
                </div>
                <div class="col-md-6 pb-4">
                  <label for="salaryMin">Lương Tối Thiểu <span style="color: red;">*</span></label>
                  <input class="form-control" type="text" id = "salaMin" placeholder="Min Salary..."
                    :disabled="salaryCheck" v-model="salaryMin" autocomplete="off">
                  <div class="text-start text-danger" v-show="!salaryCheck" v-html="messageSalaryMin"></div>
                </div>
                <div class="col-md-6 d-flex pb-4">
                  <label for="unit">Đơn vị tiền tệ <span style="color: red;">*</span></label>
                  <div class="form-check mx-3">
                    <input type="radio" class="form-check-input" name="optradio7" value="VND" v-model="unit" checked>
                    <label class="form-check-label" for="radio3">VND</label>
                  </div>
                  <!-- <div class="form-check">
                    <input type="radio" class="form-check-input" name="optradio7" value="USD" v-model="unit" checked>
                    <label class="form-check-label" for="radio3">USD</label>
                  </div> -->
                </div>
                <!-- =========begin========== -->

                <div class="boder-skill">
                  <div class="d-flex flex-row align-items-center">
                    <v-autocomplete :items="listBaseSkill" v-model="skillSelect" item-title="skill"
                      v-model:search="newSkill" @keyup.enter="addNewDataSkill" item-text="skill" item-value="skill"
                      :no-data-text="'Nhấn enter để thêm kỹ năng mới'" label="--Chọn kỹ năng cần cho công việc--"
                      variant="solo-filled">
                    </v-autocomplete>

                    <!-- <button class="btn d-flex flex-row btn-add" @click="addSkill">
                      <icon icon="circle-plus" class="icon-add" style="height=20.625, width: 20.503"></icon>
                    </button> -->
                  </div>

                  <div class="container-fluid" style="max-height: 200px; overflow-y: auto; overflow-x: hidden;">
                    <table class="table">
                      <thead>
                        <tr>
                          <th class="text-center">Kỹ Năng</th>
                          <th class="text-center">Xóa</th>
                        </tr>
                      </thead>
                      <tbody v-for="(skill, index) in listSkill">
                        <tr>
                          <td class="text-center text-uppercase text-wrap" style="vertical-align: middle;">{{ skill }}
                          </td>
                          <td class="d-flex justify-content-center">
                            <button class="btn-delete" @click="deleteSkill(index)">
                              <icon icon="trash" style="height=1em" class="svgIcon"></icon>
                              <span class="tooltip">Xoá</span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>


                </div>
                <!-- =======end========= -->

                <div class="col-md-12 pb-4">
                  <label for="company">Tên công ty <span style="color: red;">*</span></label>
                  <input class="form-control" type="text" id="company" placeholder="IRTech, FPTSoft" v-model="company"
                    autocomplete="off">
                  <div class="text-start text-danger" v-html="messageCompany"></div>
                </div>
                <div class="col-md-6">
                  <label for="tel">Số điện thoại liên hệ <span style="color: red;">*</span></label>
                  <input class="form-control" id="tel" type="text" placeholder="03x.xxx.xxx" v-model="tel"
                    autocomplete="off">
                  <div class="text-start text-danger" v-html="messageTel"></div>
                </div>
                <div class="col-md-6 pb-4">
                  <label for="email">Email <span style="color: red;">*</span></label>
                  <input class="form-control" type="email" id="email" placeholder="user1@example.com" v-model="email"
                    autocomplete="off">
                  <div class="text-start text-danger" v-html="messageEmail"></div>
                </div>
                <div class="col-md-6 pb-4">
                  <label for="email">Ngày hết hạn: <span style="color: red;">*</span></label>
                  <input class="form-control" type="date" id="expiredDate" v-model="expiredDate"
                    autocomplete="off">
                  <div class="text-start text-danger" v-html="messageExpiredDate"></div>
                </div>
              </div>
              <div class="text-center text-danger" v-html="message"></div>


              <button type="button" class="btn btn-primary w-100" @click="confirmSave()" :disabled="isValid">Gửi</button>
              <!-- <div class="checkout-btn ">

              </div> -->
            </div>

          </div>
          <div class="col-md-5 infor-post">
            <div class="checkout-summary">
              <h2 class="text-center">Cập Nhập Hình Ảnh</h2>
              <div class="text-center mt-3">
                <div class="image-container">
                  <img class="w-100 img-fluid" :src="previewSrc" v-if="previewSrc">
                </div>
                <label for="imageCv">
                  <span class="btn btn-primary mt-4">Chọn ảnh</span>
                  <input autocomplete="off" type="file" accept="image/*" class="visually-hidden" name="imageCv"
                    id="imageCv" data-cy="imageCv" ref="upFileImage" @change="previewImage($event)">
                </label>
              </div>
            </div>


            <div class="checkout-payment col">
              <h2>Quy Định Chung</h2>
              <div class="payment-methods">
                <div class="payment-method">
                  <div class="" id="payment-1-show">
                    <p class="fs-5" style="font-family: 'Times New Roman', Times, serif;">
                      <svg style="width: 15px; fill: rgb(157, 253, 32);" xmlns="http://www.w3.org/2000/svg" height="1em"
                        viewBox="0 0 256 512">
                        <path
                          d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                      </svg>
                      Chỉ đăng tin tìm việc liên quan đến vị trí công việc thực tế.
                    </p>
                  </div>
                </div>
                <div class="payment-method">
                  <div class="" id="payment-2-show">
                    <p class="fs-5" style="font-family: 'Times New Roman', Times, serif;">
                      <svg style="width: 15px; fill: rgb(161, 254, 39);" xmlns="http://www.w3.org/2000/svg" height="1em"
                        viewBox="0 0 256 512">
                        <path
                          d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                      </svg>
                      Không đăng tin vi phạm pháp luật và quy định của trang web.
                    </p>
                  </div>
                </div>
                <div class="payment-method">
                  <div class="" id="payment-3-show">
                    <p class="fs-5" style="font-family: 'Times New Roman', Times, serif;">
                      <svg style="width: 15px; fill: rgb(161, 254, 39);" xmlns="http://www.w3.org/2000/svg" height="1em"
                        viewBox="0 0 256 512">
                        <path
                          d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                      </svg>
                      Cung cấp thông tin chính xác và đầy đủ trong tin tuyển dụng.
                    </p>
                  </div>
                </div>
                <div class="payment-method">
                  <div class="" id="payment-4-show">
                    <p class="fs-5" style="font-family: 'Times New Roman', Times, serif;">
                      <svg style="width: 15px; fill: rgb(161, 254, 39);" xmlns="http://www.w3.org/2000/svg" height="1em"
                        viewBox="0 0 256 512">
                        <path
                          d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                      </svg>
                      Không sử dụng thông tin cá nhân của người khác một cách trái phép.
                    </p>
                  </div>
                </div>
                <div class="payment-method">
                  <div class="" id="payment-5-show">
                    <p class="fs-5" style="font-family: 'Times New Roman', Times, serif;">
                      <svg style="width: 15px; fill: rgb(161, 254, 39);" xmlns="http://www.w3.org/2000/svg" height="1em"
                        viewBox="0 0 256 512">
                        <path
                          d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                      </svg>
                      Tuân thủ các quy định và chính sách của trang web tuyển dụng.
                    </p>
                  </div>
                </div>
                <div class="payment-method">
                  <div class="" id="payment-5-show">
                    <p class="fs-5 text-center" style="font-family: 'Times New Roman', Times, serif;">
                      Chân Thành Cảm Ơn!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Checkout End -->
  </div>
</template>

<style scoped src="./create-post.css"></style>
<style src="../list-post/index.css"></style>
<style src="../../assets/bootstrap.min.css"></style>
<script src="./create-post.js"></script>