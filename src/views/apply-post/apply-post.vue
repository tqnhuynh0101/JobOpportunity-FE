<template>
      <Loading :active="isLoading"
             :color="'#40B883'"
             :height="70"
             :width="70"
             backgroundColor="rgba(192,192,192,1)"
             :is-full-page="true"/>
      <modal :visible="isVisibleViewCv" width="1000px" title="XEM LẠI CV ỨNG VIÊN" :cancelButton="{
        text: 'Trở lại',
        onclick: closeViewCv,
      }" :okButton="{
        text: 'Đồng ý',
        onclick: closeViewCv,
      }" zIndex="2000" :closable="false">
      <div style="max-height: 620px ;overflow-y: scroll">
        <cv-detail ref="cvDetail" :uuid="uuid"></cv-detail>
      </div>
    </modal>
    <modal :visible="isVisibleViewPost" width="1300px" title="XEM LẠI BÀI VIẾT" :cancelButton="{
      text: 'Trở lại',
      onclick: closeViewPost,
    }" :okButton="{
      text: 'Đồng ý',
      onclick: closeViewPost,
    }" zIndex="2000" :closable="false">
      <div style="max-height: 620px ;overflow-y: scroll">
        <post-detail ref="postDetail" :idView="idView"></post-detail>
      </div>
    </modal>

  <modal :visible="isVisibleConfirmRefuse" width="600px" title="XÁC NHẬN TỪ CHỐI CV" :cancelButton="{
    text: 'Trở lại',
    onclick: closeComfirmRefuse,
  }" :okButton="{
  text: 'Đồng ý',
  onclick: Refuse,
}" zIndex="2000" :closable="false">
    <div>
      <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="floatingUser" placeholder="name@example.com" v-model="message" required autocomplete="off">
                            <label for="floatingUser">Nhập lời nhắn</label>
      </div>
    </div>
  </modal>

  <modal :visible="isVisibleConfirm" width="600px" title="XÁC NHẬN DUYỆT CV" :cancelButton="{
    text: 'Trở lại',
    onclick: closeComfirm,
  }" :okButton="{
  text: 'Đồng ý',
  onclick: Confirm,
}" zIndex="2000" :closable="false">
    <div>
      <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="floatingUser" placeholder="name@example.com" v-model="message" required autocomplete="off">
                            <label for="floatingUser">Nhập lời nhắn</label>
      </div>
      <div class="form-floating mb-3">
                            <input type="Date" class="form-control" id="floatingUser" placeholder="name@example.com" v-model="date" required autocomplete="off">
                            <label for="floatingUser">Nhập thời gian phỏng vấn</label>
      </div>
    </div>
  </modal>
  <div>
    <Loading :active="isLoading" :color="'#40B883'" :height="70" :width="70" backgroundColor="rgba(192,192,192,1)"
      :is-full-page="true" />

    <header-content-admin :title="titlePage"></header-content-admin>
    <div class="checkout wow fadeInUp" data-wow-delay="0.1s" style="overflow-y: auto; padding-top: 90px">

      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Người đăng</th>
            <th scope="col">Thời gian nộp</th>
            <th scope="col">Link cv</th>
            <th scope="col">Bài viết</th>
            <th scope="col">Thời gian phỏng vấn</th>
            <th scope="col">Lời nhắn</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in listApplyPost" v-bind:key="post.id"
            :class="{ 'black-color': post.type === 0, 'red-color': post.type === 1, 'blue-color': post.type === 2 }">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ post.createBy }}</td>            
            <td>{{ post.createTime }}</td>
            <td>
            <nav class="text-post" style="color: rgb(63, 63, 235); cursor: pointer" @click="openCv(post.linkCv)">Xem chi tiết</nav>
          </td>
          <td>
            <nav class="text-post" style="cursor: pointer" @click="openPostDetail(post.postId)">Xem Chi Tiết</nav>
          </td>
          <td>{{ post.appTime }}</td>
          <td>{{ post.message }}</td>
            <td><button type="button" v-if="post.type === 0" @click="ConfirmRefuse(post.id)">
                <icon icon="fa-solid fa-trash" style="color: #e51520;"></icon>
              </button>
              <button v-if="post.type === 0" style="margin-left: 15px;" @click="ConfirmAgree(post.id)">
                <icon icon="fa-solid fa-check" style="color: #1a8e28;"></icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style>
.red-color {
  color: red;
}

.blue-color {
  color: blue;
}

.black-color {
  color: black;
}
</style>
    
<script src="./apply-post.js"></script>
    