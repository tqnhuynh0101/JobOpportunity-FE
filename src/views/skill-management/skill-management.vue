<template>
    <div>
      <Loading :active="isLoading"
             :color="'#40B883'"
             :height="70"
             :width="70"
             backgroundColor="rgba(192,192,192,1)"
             :is-full-page="true"/>
      <header-content-admin :title="titlePage"></header-content-admin>
      <div class="checkout wow fadeInUp" data-wow-delay="0.1s" style="overflow-y: auto; padding-top: 90px">

      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Tên Kĩ Năng</th>
            <th scope="col">Người Tạo</th>
            <th scope="col">Thao Tác</th>

          </tr>
        </thead>
        <tbody style="vertical-align: middle;">
          <tr v-for="skill in listSkill" v-bind:key="skill.id" :class="{
            'blue-color': skill.type === false,
            'red-color': skill.type === true
          }">
            <th scope="row">{{ skill.id }}</th>
            <td>{{ skill.skill }}</td>
            <td>{{ skill.createBy }}</td>
            <td class="d-flex">
              <button class="btn-delete"  @click="deleteSkill(skill.id)">
                <icon icon="trash" style="height=1em" class="svgIcon"></icon>
                <span class="tooltip">Xoá</span>
              </button>
              <button class="btn-confirm" v-if="skill.type === true" type="button" style="margin-left: 15px;" @click="approveSkill(skill.id)">
                <icon icon="fa-solid fa-pen-to-square" style="color: #23be25;"></icon>
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

<style scoped src="./skill-management.css"></style>
<script src="./skill-management.js"></script>
