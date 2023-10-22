<template>
  <modal
    :visible="isVisibleAutoSearch"
    width="600px"
    title="TÍNH NĂNG TỰ ĐỘNG TÌM VIỆC"
    :cancelButton="{
      text: 'Trở lại',
      onclick: closeAutoSearch,
    }"
    :okButton="{
      text: 'Đồng ý',
      onclick: saveAutoSearch,
    }"
    zIndex="2000"
    :closable="false"
  >
    <div>
      <auto-search ref="autoSearch" @close="closeAutoSearch"></auto-search>
    </div>
  </modal>

  <modal
    :visible="isVisibleMySkill"
    width="600px"
    title="DANH MỤC KỸ NĂNG"
    :cancelButton="{
      text: 'Trở lại',
      onclick: closeMySkill,
    }"
    :okButton="{
      text: 'Đồng ý',
      onclick: saveMySkill,
    }"
    zIndex="2000"
    :closable="false"
  >
    <div>
      <my-skill ref="mySkill" @close="closeMySkill"></my-skill>
    </div>
  </modal>

  <div class="header-padding">
    <nav
      class="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0 position-fixed top-0 w-100 left-0"
    >
      <div>
        <router-link
          to="/user/user-home"
          class="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5"
        >
          <!-- <img width="100%" src="../assets/admin/img/jot-low-resolution-logo-color-on-transparent-background.png" alt="JOT"/> -->
          <h1 class="text-success">JOT</h1>
        </router-link>
      </div>
      <button
        type="button"
        class="navbar-toggler me-4"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="menu collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav ms-auto p-4 p-lg-0">
          <router-link
            class="nav-item nav-link px-3 text-inactive"
            @click="activeHome()"
            :class="{
              active: isActiveUserHome,
              'text-active': isActiveUserHome,
            }"
            to="/user/user-home"
            ><strong>Trang Chủ</strong></router-link
          >
          <router-link
            class="nav-item nav-link px-3 text-inactive"
            @click="activeListPost()"
            :class="{
              active: isActiveListPost,
              'text-active': isActiveListPost,
            }"
            to="/user/list-post"
            ><strong>Danh Sach Bai Viet</strong>
          </router-link>
          <router-link
            class="nav-item nav-link px-3 text-inactive"
            @click="activeViewCV()"
            :class="{ active: isActiveViewCV, 'text-active': isActiveViewCV }"
            to="/user/view-cv"
            ><strong>Xem CV</strong></router-link
          >
          <nav
            class="nav-item nav-link px-3"
            style="cursor: pointer"
            @click="openAutoSearch"
          >
            Tự động tìm việc
          </nav>
        </div>
      </div>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav ms-auto p-4 p-lg-0">
          <div class="nav-item dropdown">
            <a href="#" class="nav-link active" data-bs-toggle="dropdown">
              <span class="d-lg-inline-flex mx-1 text-success"
                ><strong>{{ getName() }}</strong></span
              >
              <img
                src="../assets/image-default/user3.png"
                alt=""
                style="width: 40px; height: 40px"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-end rounded-0 m-0 style-responsive"
              style="
                right: 0;
                padding: 10px;
                box-shadow: 2px 1px 3px rgba(0, 0, 0, 0.2);
              "
            >
              <a href="#" class="dropdown-item">
                <icon icon="user" class="mx-1"></icon>
                {{ getName() }}
              </a>
              <router-link class="dropdown-item" to="/user/change-password">
                <icon icon="lock-open" class="mx-1"></icon>
                Thay Đổi Mật Khẩu
              </router-link>
              <router-link class="dropdown-item" to="/user/my-apply">
                <icon icon="clipboard-list" class="mx-1"></icon>
                Công Việc Đã Ứng Tuyển
              </router-link>
              <nav
                class="dropdown-item"
                @click="openMySkill"
                style="cursor: pointer"
              >
                <icon icon="list-ol" class="mx-1"></icon>
                Danh Mục Kỹ Năng
              </nav>
              <router-link
                to="/user/change-information"
                style="cursor: pointer"
                class="dropdown-item"
              >
                <icon icon="gear" class="mx-1" spin="true"></icon>
                Thay Đổi Thông Tin Cá Nhân
              </router-link>
              <nav
                style="cursor: pointer"
                @click="logout()"
                class="dropdown-item"
              >
                <icon icon="right-from-bracket" class="mx-1"></icon>
                Đăng Xuất
              </nav>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="container-xxl py-5 bg-dark page-header my-4">
      <div class="container my-5 pt-5 pb-4">
        <h1 class="display-3 text-white mb-3 animated slideInDown">Job List</h1>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from 'usemodal-vue3';
import autoSearch from '@/views/auto-search/auto-search.vue';
import axios from '@/config/axios';
import MySkill from '@/views/my-skill/my-skill.vue';
export default {
  name: 'user-header',
  components: {
    MySkill,
    autoSearch,
    Modal,
  },
  data() {
    return {
      isVisibleAutoSearch: false,
      isVisibleMySkill: false,
      isActiveUserHome: true,
      isActiveListPost: false,
      isActiveViewCV: false,
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      axios.defaults.headers['Authorization'] = '';
      this.$router.push({ name: 'Home' });
    },
    getName() {
      let account = JSON.parse(localStorage.getItem('current-account'));
      if (account) {
        return account.name;
      } else {
        return '';
      }
    },
    openAutoSearch() {
      this.isVisibleAutoSearch = true;
    },
    closeAutoSearch() {
      this.isVisibleAutoSearch = false;
    },
    saveAutoSearch() {
      this.$refs.autoSearch.save();
    },
    openMySkill() {
      this.isVisibleMySkill = true;
    },
    closeMySkill() {
      this.isVisibleMySkill = false;
    },
    saveMySkill() {
      this.$refs.mySkill.save();
      this.closeMySkill();
    },
    activeHome() {
      this.isActiveUserHome = true;
      this.isActiveListPost = false;
      this.isActiveViewCV = false;
    },
    activeListPost() {
      this.isActiveUserHome = false;
      this.isActiveListPost = true;
      this.isActiveViewCV = false;
    },
    activeViewCV() {
      this.isActiveUserHome = false;
      this.isActiveListPost = false;
      this.isActiveViewCV = true;
    },
  },
};
</script>
