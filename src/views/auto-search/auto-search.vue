<template>
  <div>
    <Loading
      :active="isLoading"
      :color="'#40B883'"
      :height="70"
      :width="70"
      backgroundColor="rgba(192,192,192,1)"
      :is-full-page="true"
    />
    <div class="container-fluid">
      <div class="row h-100 align-items-center justify-content-center">
        <div class="container2 mb-3 col-md-3">
          <div class="all-job mx-2">
            <v-autocomplete
              :items="listProvince"
              v-model="selectedProvince"
              item-title="fullName"
              item-text="fullName"
              item-value="code"
              :no-data-text="'--Không có dữ liệu'"
              label="--Tỉnh/Thành phố--"
              variant="solo-filled"
            >
            </v-autocomplete>
          </div>
          <div class="all-role mx-2 mb-4">
            <h5 class="mb-2">Lương mong muốn</h5>
            <input
              type="text"
              class="form-control"
              placeholder="Lương Mong Muốn (VNĐ)"
              v-model="salary"
              autocomplete="off"
            />
          </div>
          <!-- <div class="my-4 mx-2" style="width: 220px">
            <h5>Vị trí ứng tuyển</h5>
          </div>
          <div class="my-4 mx-2" style="width: 220px">
            <h5>Hình thức làm việc</h5>
          </div>
          <div class="my-4 mx-2" style="width: 220px">
            <h5>Cách thức làm việc</h5>
          </div> -->
          <label for="toggles" class="mb-2 title" style="width: 220px"
            >Bật Tính Năng Tìm Việc</label
          >
          <div class="fx-block">
            <div class="toggle">
              <div>
                <input id="toggles" type="checkbox" v-model="flag" />
                <div data-checked="Tắt" data-unchecked="Bật"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./auto-search.js"></script>
<style src="./auto-search.css"></style>
<style src="../../assets/icon.css"></style>
