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
          <th scope="col">Người đăng</th>
          <th scope="col">Id bài viết</th>
          <th scope="col">Ngày nộp</th>
          <th scope="col">Link cv</th>
          <th scope="col">Lời nhắn</th>
          <th scope="col">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in listApplyPost" v-bind:key="post.id" :class ="{'black-color': post.type === 0,'red-color': post.type === 1,'blue-color': post.type === 2}">
          <th scope="row">{{ post.id }}</th>
          <td>{{ post.accountId }}</td>
          <td>{{ post.postId }}</td>
          <td>{{ post.appTime }}</td>
          <td>{{ post.linkCv }}</td>
          <td>{{ post.message }}</td>
          <td><button type="button" v-if = "post.type === 0"><icon icon="fa-solid fa-trash" style="color: #e51520;"></icon></button>
            <button v-if = "post.type === 0" style="margin-left: 15px;"><icon icon="fa-solid fa-check" style="color: #1a8e28;"></icon></button></td>
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
    .blue-color{
      color: blue;
    }
    .black-color{
      color: black;
    }
    </style>
    
    <script src="./apply-post.js"></script>
    