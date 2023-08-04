<template>
  <div>
    <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
      data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
      <header class="topbar" data-navbarbg="skin5" style="position: fixed; width: 100%;">
        <nav class="navbar top-navbar navbar-expand-md bg-success">
          <div class="navbar-header" data-logobg="skin6">
            <a class="navbar-brand" href="dashboard.html">
              <span class="logo-icon">
                <img width="100%" style="border-radius: 100%;" src="../assets/admin/img/admin.png" alt="logo" />
              </span>
              <span class="logo-text">
                <img width="100%" style="border-radius: 100%;" src="../assets/admin/img/jot-low-resolution-color-logo.png"
                  alt="logo-text" />
              </span>
            </a>

            <a class="nav-toggler waves-effect waves-light text-dark d-block d-md-none" href="javascript:void(0)"><i
                class="ti-menu ti-close"></i></a>
          </div>
          <div class="navbar-collapse collapse bg-success" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto d-flex align-items-center">
              <li>
                <a class="profile-pic" href="#">
                  <span class="text-black font-medium nameAdmin">
                    <icon icon="user-gear" size="1px" class="mx-1"></icon> {{ getNameAdmin() }}
                  </span></a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <aside class="left-sidebar" data-sidebarbg="skin6" style="position: fixed">
        <div class="scroll-sidebar">

          <nav class="sidebar-nav">
            <ul id="sidebarnav">

              <li class="sidebar-item pt-2">
                <router-link class="sidebar-link waves-effect waves-dark sidebar-link button"
                  to="/management/create-post">
                  <icon icon="circle-plus" class="mx-2 icon-style"></icon>
                  <span class="hide-menu">Tạo Bài Đăng</span>
                </router-link>
              </li>
              <li class="sidebar-item">
                <router-link to="/management/post-management" class="sidebar-link waves-effect waves-dark sidebar-link">
                  <icon icon="rectangle-list" class="mx-2"></icon>
                  <span class="hide-menu">Quản Lý Bài Đăng</span>
                </router-link>
              </li>
              <li class="sidebar-item">
                <router-link to="/management/skill-management" class="sidebar-link waves-effect waves-dark sidebar-link">
                  <icon icon="bars-staggered" class="mx-2"></icon>
                  <span class="hide-menu">Kĩ Năng Của Bạn</span>
                </router-link>
              </li>
              <li class="sidebar-item">
                <router-link to="/management/apply-post" class="sidebar-link waves-effect waves-dark sidebar-link">
                  <icon icon="check-to-slot" class="mx-2"></icon>
                  <span class="hide-menu">Quản Lý Ứng Viên</span>
                </router-link>
              </li>
              <hr>
              <li class="sidebar-item">
                <router-link to="/management/change-password" class="sidebar-link waves-effect waves-dark sidebar-link">
                  <icon icon="lock-open" class="mx-2"></icon>
                  <span class="hide-menu">Thay Đổi Mật Khẩu</span>
                </router-link>
              </li>
              <li class="sidebar-item" style="cursor: pointer;">
                <nav class="sidebar-link waves-effect waves-dark sidebar-link">
                  <icon icon="arrow-right-from-bracket" class="mx-2"></icon>
                  <span class="hide-menu" @click="logout()">Đăng Xuất</span>
                </nav>
              </li>
            </ul>

          </nav>

        </div>

      </aside>
      <div class="page-wrapper body-create">
        <div style="margin-top: 60px">
          <router-view></router-view>
        </div>
      </div>
    </div>


  </div>
</template>

<style>
@media (max-width: 1170px) {

  .logo-icon,
  .logo-text {
    display: inline-block;
    text-align: center;
    width: 40px;
    height: 40px;
    z-index: 100;
  }

  .sidebar-item .sidebar-link {
    width: 100%;
    display: none;
  }

  .body-create {
    padding-top: 0;
  }

  .logo-text {
    margin-top: 5px;
  }
}

.button:hover .icon-style {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }

}
</style>


<script>

import "../assets/admin/js/app-style-switcher.js"
import "../assets/admin/js/waves.js"
import "../assets/admin/js/sidebarmenu.js"
import "../assets/admin/js/custom.js"
import { RouterView } from "vue-router/dist/vue-router";
import axios from "axios";

export default {
  name: "admin",
  components: {
    components: { RouterView },
  },
  mounted() {
  },
  methods: {
    logout() {
      localStorage.clear();
      axios.defaults.headers['Authorization'] = ''
      this.$router.push({ name: 'Home' })
    },
    getNameAdmin() {
      let account = JSON.parse(localStorage.getItem('current-account'))
      if (account) {
        return account.name
      } else {
        return ""
      }
    }
  }
}
</script>

<style src="../assets/admin/css/style.min.css" scoped></style>
<style src="../assets/admin/css/index.css" scoped></style>
