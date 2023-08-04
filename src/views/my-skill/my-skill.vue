<template>
  <div>
    <Loading :active="isLoading"
             :color="'#40B883'"
             :height="70"
             :width="70"
             backgroundColor="rgba(192,192,192,1)"
             :is-full-page="true"/>
    <div class="d-flex flex-row align-items-center">
      <v-autocomplete :items="listBaseSkill" v-model="skillSelect" item-title="skill" v-model:search="newSkill"
        @keyup.enter="addNewData" item-text="skill" item-value="skill" :no-data-text="'Nhấn enter để thêm kỹ năng mới'"
        label="--Chọn kỹ năng của bạn--" variant="solo-filled">
      </v-autocomplete>

      <button class="btn d-flex flex-row btn-add" @click="add">
        <icon icon="circle-plus" class="icon-add" style="height=20.625, width: 20.503"></icon>
      </button>
    </div>

    <div class="container-fluid" style="max-height: 200px; overflow-y: auto; overflow-x: hidden;">
      <table class="table" >
        <thead>
          <tr>
            <th class="text-center">Kỹ Năng</th>
            <th class="text-center">Xóa</th>
          </tr>
        </thead>
        <tbody v-for="(skill, index) in listSkill" >
          <tr>
            <td class="text-center text-uppercase text-wrap" style="vertical-align: middle;">{{ skill }}</td>
            <td class="d-flex justify-content-center">
              <button class="btn-delete" @click="deleteSkill(index)">
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
<style src="./my-skill.css" scoped></style>
<script src="./my-skill.js"></script>

<style scoped></style>
