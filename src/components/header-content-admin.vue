<template>
  <div class="page-breadcrumb bg-white p-2" style="position: fixed; width: 100%; z-index: 100">
    <div class="row align-items-center" style="height: 100%">
      <div class="col-lg-3 col-md-12 col-sm-4 col-xs-12">
        <h4 class="page-title" style="margin-left: 10%">{{ title }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "header-content-admin",
  props: [
    'title'
  ]
}
</script>

<style scoped></style>
