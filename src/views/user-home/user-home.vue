<template>
    <div class="tab-class text-center wow fadeInUp container-xxl" data-wow-delay="0.3s">
      <Loading :active="isLoading"
               :color="'#40B883'"
               :height="70"
               :width="70"
               backgroundColor="rgba(192,192,192,1)"
               :is-full-page="true"/>
        <div class="tab-content">
          <div id="tab-1" class="tab-pane fade show p-0 active">
            <!-- //11111111 -->
            <post :listPost="listPost"></post>

          </div>
        </div>
      </div>
    <!-- Jobs End -->


    <!-- Footer Start -->
  <!-- Footer End -->
</template>


<script src="./user-home.js"></script>
