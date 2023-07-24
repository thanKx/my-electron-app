<template>

  <el-container>
    <el-aside width="200px">
        <database />
    </el-aside>
    <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" label="表名" prop="tableName" />
        <el-table-column align="center" label="行数" prop="rows" width="80" />
        <el-table-column align="center" label="引擎" prop="engine" width="80" />
        <el-table-column align="center" label="编码集" prop="collation" width="180" />
        <el-table-column align="center" label="创建时间" prop="createTime" width="180"/>
        <el-table-column align="center" label="更新时间" prop="updateTime" width="180"/>
        <el-table-column align="center" label="注释" prop="comment" width="180"/>
        <el-table-column align="center" label="操作" width="240">
          <template #default="scope">
            <el-button link type="primary" icon="View" @click="handleView(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>

  <el-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
    <span>It's a draggable Dialog</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
import {getTableList} from "../http/apis/form"
import {ref} from "vue";
import Database from "./Database.vue";
const tableData = ref([])
const dialogVisible = ref(false)

function getList() {
  getTableList().then(response => {
    tableData.value = response.data;
  })
}

function handleView(row) {
  dialogVisible.value = true
}


getList()

</script>

<style scoped>

</style>