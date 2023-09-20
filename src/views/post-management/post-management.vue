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
  <div>
    
    <modal :visible="isVisibleConfirmDelete" width="600px" title="XÁC NHẬN " :cancelButton="{
      text: 'Trở lại',
      onclick: closeConfirmDelete,
    }" :okButton="{
  text: 'Đồng ý',
  onclick: deletePost,
}" zIndex="2000" :closable="false">
      <div>
        Bạn có chắc chắn muốn xóa bài viết này không?
      </div>
    </modal>
    <Loading :active="isLoading"
             :color="'#40B883'"
             :height="70"
             :width="70"
             backgroundColor="rgba(192,192,192,1)"
             :is-full-page="true"/>
             
    <modal :visible="isVisibleConfirmApprove" width="600px" title="XÁC NHẬN " :cancelButton="{
      text: 'Trở lại',
      onclick: closeConfirmApprove,
    }" :okButton="{
  text: 'Đồng ý',
  onclick: approvePost,
}" zIndex="2000" :closable="false">
      <div>
        Bạn có chắc chắn muốn duyệt bài viết này không?
      </div>
    </modal>

    <header-content-admin :title="titlePage"></header-content-admin>
    <div class="checkout wow fadeInUp" data-wow-delay="0.1s" style="overflow-y: auto; padding-top: 90px">

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Công Ty</th>
            <th scope="col">Tiêu đề</th>
            <th scope="col">Email</th>
            <th scope="col">Ngày Hết Hạn</th>
            <th scope="col">Người Tạo</th>
            <th scope="col">Thời Gian Tạo</th>
            <th scope="col">Nội dung</th>
            <th scope="col">Thao Tác</th>
          </tr>
        </thead>
        <tbody style="vertical-align: middle;">
          <tr v-for="(post, index) in listPost" v-bind:key="post.id" :class="{
            'red-color': post.isDel === true,
            'blue-color': (post.isDel === false && post.flag === true),
            'black-color': (post.isDel === false && post.flag === false)
          }">
            <td scope="row">{{ index+ 1 }}</td>
            <td>{{ post.company }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.email }}</td>
            <td>{{ post.expiredDate }}</td>
            <td>{{ post.createBy }}</td>
            <td>{{ post.createTime }}</td>
            <td>
            <nav class="text-post" style="cursor: pointer" @click="openPostDetail(post.id)">Xem Chi Tiết</nav>
          </td>
            <td class="d-flex">

              <button class="btn-delete" v-if="!post.isDel" @click="confirmDetele(post.id)">
                <icon icon="trash" style="height=1em" class="svgIcon"></icon>
                <span class="tooltip">Xoá</span>
              </button>
              <button class="btn-confirm" v-if="post.isDel === false && post.flag === false && account.authority === 'ROLE_ADMIN'" type="button" style="margin-left: 15px;"
                @click="confirmApprove(post.id)">
                <icon icon="fa-solid fa-pen-to-square" style="color: #23be25;"></icon>
              </button>

            </td>
          </tr>
        </tbody>
      </table>
      <!-- Phân trang -->
      <nav aria-label="..." class="d-flex flex-row justify-content-center">
        <ul class="pagination page">
          <li class="page-item link" :class="{ disabled: isFirstPage }">
            <a class="page-link" href="#" @click="changePage(page - 1)">Trang Trước</a>
          </li>
          <li>
            <input class="form-control" type="text" v-model="currentPageInput" @change="updateCurrentPage">
          </li>
          <li class="fs-3">/</li>
          <li class="fs-3 page-item">
            <a href="#" class="page-link disabled" style="background: #00B074;">{{ totalPages }}</a>
          </li>
          <li class="page-item link" :class="{ disabled: isLastPage }">
            <a class="page-link" href="#" @click="changePage(page + 1)">Trang Sau</a>
          </li>
        </ul>
      </nav>
      <!-- End phân trang -->


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
<style src="./post-management.css" scoped></style>
<script src="./post-management.js"></script>
