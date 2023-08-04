<template>
  <div class="job-item p-4 mb-4" v-for="post in listPost" v-bind:key="post.id">
    <div class="row g-4">
      <div class="col-sm-12 col-md-8 d-flex align-items-center">
        <router-link :to="{ name: 'PostDetail', params: { id: post.id } }">
          <img class="flex-shrink-0 img-fluid border rounded" :id="'img_' + post.id" :src="setImage(post.id, post.image)"
          alt="" style="width: 130px; height: 80px;"/>
        </router-link>
        <div class="text-start ps-4">
          <router-link :to="{ name: 'PostDetail', params: { id: post.id } }"><h5 class="mb-3">{{ post.title }}</h5></router-link>
          <span class="text-truncate me-3"><i class="fa fa-map-marker-alt text-primary me-2"></i>{{ post.address }}</span>
          <span class="text-truncate me-3"><i class="far fa-clock text-primary me-2"></i>{{ post.type }}</span>
          <span class="text-truncate me-0"><i class="far fa-money-bill-alt text-success me-2"></i>{{
            formatCurrency(post.salaryMin)
          }} {{ post.unit }} - {{ formatCurrency(post.salaryMax) }} {{ post.unit }}</span> <br>
          <span class="text-truncate mx-0">
            <icon icon="marker" class="fs-6 text-info me-2 text-wrap"></icon>
            {{ convert(post.content) }}
            <p class="text-wrap">"Chào mừng bạn đến với ChatGPT! Đây là một ví dụ về đoạn văn bản có chính xác 100 kí tự để kiểm tra độ dài của nó. Hy vọng nội dung này hữu ích cho bạn."</p>
          </span>
        </div>
      </div>
      <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
        <div class="d-flex mb-3">
          <!-- <a class="btn btn-light btn-square me-3" href=""><i class="far fa-heart text-primary"></i></a> -->
          <label class="ui-like mx-3">
            <input type="checkbox">
            <div class="like">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="">
                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z">
                  </path>
                </g>
              </svg>
            </div>
          </label>
          <RouterLink :to="{ name: 'PostDetail', params: { id: post.id } }">Xem chi
            tiết
          </RouterLink>
        </div>
        <span>
          <small class="text-truncate" ><i class="far fa-calendar-alt text-primary me-2"></i>Date
          Line: </small>
          <small :style="{ 'word-spacing': '20px' }">{{ post.expiredDate }}</small>

        </span>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "post",
  props: [
    'listPost'
  ],
  mounted() {
  },
  methods: {
    formatCurrency(price, symbol = "") {
      var DecimalSeparator = Number('1.2').toLocaleString().substr(1, 1);
      var priceWithCommas = price.toLocaleString();
      var arParts = String(priceWithCommas).split(DecimalSeparator);
      var intPart = arParts[0];
      var decPart = arParts.length > 1 ? arParts[1] : '';
      // decPart = (decPart + '00').substr(0, 2);
      return symbol + intPart;
    },
    setImage(id, image) {
      let reader = new FileReader();
      const byteCharacters = atob(image);

      const byteArray = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: "application/octet-stream" });

      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        let base64data = reader.result;
        let imgElement = document.getElementById('img_' + id);
        imgElement.src = base64data;
      }
    },
    convert(content) {
      if (content && typeof content === 'string') {
        if (content.length <= 100) {
          return content;
        } else {
          return content.substring(0, 100) + "...";
        }
      } else {
        return "";
      }
    },

  }
}
</script>

<style scoped src="./post.css"></style>
