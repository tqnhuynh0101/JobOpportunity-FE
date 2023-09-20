<template>
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
    <modal :visible="isVisibleViewCv" width="1000px" title="XEM CV" :cancelButton="{
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
    <div>
      <div class="checkout wow fadeInUp" data-wow-delay="0.1s" style="overflow-y: auto; padding-top: 90px">

      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên công ty</th>
            <th scope="col">Vị trí ứng tuyển</th>
            <th scope="col">Xem CV</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Thời gian phỏng vấn</th>
            <th scope="col">Tin nhắn</th>
            <th scope="col">Chi tiết bài tuyển</th>
            <th scope="col">Thao Tác</th>

          </tr>
        </thead>
        <tbody style="vertical-align: middle;">
          <tr v-for="(applyPost, index) in listApplyPost" v-bind:key="applyPost.id" :class="{
            'blue-color': applyPost.type === 2,
            'black-color': applyPost.type === 0,
            'red-color': applyPost.type === 1,
          }">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ applyPost.company }}</td>
            <td>{{ applyPost.position }}</td>
            <td>
            <nav class="text-post" style="color: rgb(63, 63, 235); cursor: pointer" @click="openCv(applyPost.linkCv)">Xem chi tiết</nav>
            </td>
            <td v-if="applyPost.type === 0">
            Chưa duyệt
            </td>
            <td v-if="applyPost.type === 1">
            Từ chối
            </td>
            <td v-if="applyPost.type === 2">
            Đồng ý
            </td>
            <td>{{ applyPost.appTime }}</td>
            <td>{{ applyPost.message }}</td>
            <td>
            <nav class="text-post" style="cursor: pointer" @click="openPostDetail(applyPost.postId)">Xem Chi Tiết</nav>
          </td>
            <td class="d-flex" v-if ="applyPost.type === 0">
              <button class="btn-delete" @click="deleteApply(applyPost.id)">
                <icon icon="trash" style="height=1em" class="svgIcon"></icon>
                <span class="tooltip">Xoá</span>
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
  -webkit-text-fill-color: red;
}

.blue-color {
  -webkit-text-fill-color: blue;
}

.black-color {
  -webkit-text-fill-color: black;
}</style>

<script src="./my-apply.js"></script>
