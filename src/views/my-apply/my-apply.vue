<template>
    <div>
      <div class="checkout wow fadeInUp" data-wow-delay="0.1s" style="overflow-y: auto; padding-top: 90px">

      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
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
          <tr v-for="applyPost in listApplyPost" v-bind:key="applyPost.id" :class="{
            'blue-color': applyPost.type === true,
            'red-color': applyPost.type === false
          }">
            <th scope="row">{{ applyPost.id }}</th>
            <td>{{ applyPost.company }}</td>
            <td>{{ applyPost.position }}</td>
            <td><button>Xem CV</button></td>
            <td v-if="applyPost.type === 0">
            Chưa duyệt
            </td>
            <td v-if="applyPost.type === 1">
            Đã duyệt
            </td>
            <td>{{ applyPost.appTime }}</td>
            <td>{{ applyPost.message }}</td>
            <td><RouterLink :to="{ name: 'PostDetail', params: { id: applyPost.postId } }">Xem chi
            tiết
          </RouterLink></td>
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
