<template>

  <UserHeader></UserHeader>
  <router-view></router-view>
  <UserFooter></UserFooter>

</template>

<script>
import UserHeader from "../components/user-header.vue";
import UserFooter from "../components/user-footer.vue";
import {RouterView} from "vue-router";
export default {
  name: "user",
  components: {UserFooter, UserHeader, RouterView},
  mounted() {
  },
  methods: {
  }
}
</script>

<style>

</style>
