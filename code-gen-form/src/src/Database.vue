<template>
  <el-row>
    <el-button type="success" icon="Plus" circle @click="handleAdd"/>
    <el-button type="primary" icon="Edit" circle />
    <el-button type="danger" icon="Delete" circle />
  </el-row>

  <el-row>
    <ul class="list-ul">
      <li  v-for="db in databases" :key="db.id" @click="handleClick(db.id)" :class="{ active: activeId === db.id }">
        <a class="list-link">{{ db.name }}</a>
      </li>
    </ul>
  </el-row>

  <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form :model="form" label-width="auto" :rules="rules">
      <el-form-item label="数据库名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="主机名">
        <el-input v-model="form.host" />
      </el-form-item>
      <el-form-item label="端口">
        <el-input v-model="form.port" />
      </el-form-item>
      <el-form-item label="库名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.user" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.pass" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";

const databases =  ref([
  {
    id: 1,
    name: '数据库1'
  },
  {
    id: 2,
    name: '数据库2'
  },
  {
    id: 3,
    name: '数据库3'
  },
])
const activeId = ref(null);
const form = reactive({
  name: '',
  host: '',
  port:'',
  schema: '',
  user: '',
  pass: ''
})
const rules = reactive({

})
function handleClick(id) {
  activeId.value = id;
}

const dialogFormVisible = ref(false)
function handleAdd() {
  dialogFormVisible.value = true
}
</script>

<style scoped>
  .list-ul {
    list-style-type: none; /* 移除默认的列表样式 */
    padding: 20px 0 0 0;
    margin: 0;
    width: 100%;
  }

  .list-ul li {
    display: inline-block; /* 设置列表项为行内块元素 */
    margin: 10px 0; /* 调整列表项之间的间距 */
  }

  .list-ul li  {
    display: block; /* 将链接转换为块元素以占据整个列表项空间 */
    padding: 10px; /* 调整链接的内边距 */
    text-decoration: none; /* 移除链接的下划线 */
    color: #333; /* 设置链接文本的颜色 */
    background-color: #f1f1f1; /* 设置链接的背景色 */
    border-radius: 5px; /* 添加一点圆角边框 */
    transition: background-color 0.3s ease; /* 添加过渡效果 */
  }

  .list-ul li:hover {
    background-color: #3f9eff; /* 鼠标悬停时更改链接的背景色 */
    color: white;
  }

  .list-ul li.active {
    background-color: #0676e4;
    color: white;
  }

</style>