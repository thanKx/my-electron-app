<template>

  <el-container>
    <el-aside width="200px">
        <database />
    </el-aside>
    <el-main>
      <el-table :data="tableData" height="780" style="width: 100%">
        <el-table-column align="center" label="表名" prop="tableName" />
        <el-table-column align="center" label="行数" prop="rows" width="120" />
        <el-table-column align="center" label="引擎" prop="engine" width="120" show-overflow-tooltip/>
        <el-table-column align="center" label="编码集" prop="collation" width="180" />
        <el-table-column align="center" label="创建时间" prop="createTime" width="180"/>
        <el-table-column align="center" label="更新时间" prop="updateTime" width="180"/>
        <el-table-column align="center" label="注释" prop="comment" width="180" show-overflow-tooltip/>
        <el-table-column align="center" label="操作" width="240">
          <template #default="scope">
            <el-button link type="primary" icon="View" @click="handleView(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>

  <el-dialog v-model="dialogVisible" title="字段信息" width="80%" align-center draggable>
    <el-table :data="columnData" height="780" style="width: 100%">
      <el-table-column align="center" label="字段名" prop="columnName" />
      <el-table-column align="center" label="数据类型" prop="dataType" width="120" />
      <el-table-column align="center" label="字段大小" prop="columnSize" width="120" show-overflow-tooltip/>
      <el-table-column align="center" label="数字大小" prop="decimalDigits" width="180" />
      <el-table-column align="center" label="注释" prop="remarks" width="180"/>
      <el-table-column align="center" label="是否主键" prop="primaryKey" width="180"/>
      <el-table-column align="center" label="可为空" prop="nullable" width="180" show-overflow-tooltip/>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
        <el-button type="primary">生成代码</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
import {getColumnList, getTableList} from "../http/apis/form"
import {provide, ref} from "vue";
import Database from "./Database.vue";
const tableData = ref([])
const columnData = ref([])
const dialogVisible = ref(false)
let dataSourceId : number, dataBaseName: string

provide('getList', getList)
function getList(id, dbName) {
  dataSourceId = id;
  dataBaseName = dbName
  getTableList(id, dbName).then(response => {
    tableData.value = response.data;
  })
}

function handleView(row) {
  dialogVisible.value = true
  getColumnList(dataSourceId, dataBaseName, row.tableName).then(response => {
    columnData.value = response.data;
  })
}

</script>

<style scoped>

</style>