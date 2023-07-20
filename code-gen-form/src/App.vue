<script setup lang="ts">
import HelloWorld from './components/Home.vue'
import {ref} from "vue";

const activeIndex = ref("1")

</script>
<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
  >

    <router-link class="list-group-item" to="/">
      <el-menu-item index="1">主页</el-menu-item>
    </router-link>

    <router-link class="list-group-item" to="/form">
      <el-menu-item index="2">表单</el-menu-item>
    </router-link>

  </el-menu>

  <router-view></router-view>
</template>

