<script setup lang="ts">
import {ref} from "vue";
const activeIndex = ref("1")

</script>
<template>

  <div class="common-layout">
    <el-container>
      <el-header>
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
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

