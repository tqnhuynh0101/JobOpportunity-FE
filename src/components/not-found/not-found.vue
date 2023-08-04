<template>
  <div class="container-fluid py-5 wow fadeInUp img" data-wow-delay="0.1s">
    <div class="container text-center">
      <div class="row justify-content-center mt-5">
        <div class="col-lg-6">
          <i class="bi bi-exclamation-triangle display-1 text-primary"></i>
          <h1 class="display-1">404</h1>
          <h1 class="mb-4">Không tìm thấy trang</h1>
          <p class="mb-4 fs-6">Xin lỗi, trang mà bạn đang tìm kiếm không tồn tại trên website của chúng tôi! Có thể bạn quay về
            trang chủ hoặc thử sử dụng chức năng tìm kiếm?</p>
            <router-link class="text-dark py-3 px-5 link" to="/"><button class="learn-more text-secondary fs-6">Trở Về Trang
              Chủ</button></router-link>
          
        </div>
      </div>
    </div>
  </div>
</template>
<style src="./not-found.css" scoped></style>
<script>
export default {
  name: "not-found"
}
</script>

<style scoped></style>
