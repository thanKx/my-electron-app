<template>
  <div class="form">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>

</template>

<script>
export default {
  name: "form"
}
</script>

<style scoped>
  .form {
    text-align: center;
    padding-top: 100px;
  }
</style>