<template>
  <el-row>
    <el-button type="success" icon="Plus" circle @click="handleAdd"/>
    <el-button type="primary" icon="Edit" circle @click="handleEdit"/>
    <el-button type="danger" icon="Delete" circle />
  </el-row>

  <el-row>
    <ul class="list-ul">
      <li  v-for="db in databases" :key="db.id" @click="handleClick(db.id)" :class="{ active: activeId === db.id }">
        <a class="list-link">{{ db.name }}</a>
      </li>
    </ul>
  </el-row>

  <el-dialog v-model="dialogFormVisible" :title="title">
    <el-form ref="formRef" :model="form" label-width="auto" :rules="rules">
      <el-form-item label="数据库名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="主机名" prop="host">
        <el-input v-model="form.host" />
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input v-model="form.port" />
      </el-form-item>
      <el-form-item label="库名" prop="schema">
        <el-input v-model="form.schema" />
      </el-form-item>
      <el-form-item label="用户名" prop="user">
        <el-input v-model="form.user" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="form.pass" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          确认
        </el-button>
        <el-button @click="resetForm(formRef)">Reset</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {inject, nextTick, onMounted, reactive, ref, toRefs} from "vue";
import { add, getDataBase, getDatabaseList, update } from "../http/apis/form";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
const getList = inject<(id) => void>('getList', () => {});
const formRef = ref<FormInstance>()

const data = reactive({
  form: {},
  rules: {},
  title: '',
  dialogFormVisible: false,
  databases: [],
  activeId: null
})

const { form, rules, dialogFormVisible, databases, activeId, title} = toRefs(data)

getDatabaseList().then(response => {
  databases.value = response.data
  // 默认选择第一个
  if (databases.value.length > 0) {
    activeId.value = response.data[0].id
    getList(response.data[0].id)
  }
})
function handleClick(id) {
  activeId.value = id
  getList(id)
}

/*新增数据库*/
function handleAdd() {
  dialogFormVisible.value = true
  title.value = "新增数据源"
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

/*修改数据库*/
function handleEdit() {
  if (!activeId.value) {
    ElMessage.warning("💥请选择您要修改的数据库...")
    return
  }
  title.value = "编辑数据源"
  getDataBase(activeId.value).then( res => {
    nextTick(() => {
      dialogFormVisible.value = true
      form.value = res.data
    })
  })
}

/*新增或修改*/
function handleSubmit() {
  if ( !form.value.id ) {
    // 新增
    add(form.value).then( res => {
      ElMessage.success("😀新增成功")
    })
  } else {
    // 修改
    update(form.value).then( res => {
      ElMessage.success("😀修改成功")
    })
  }
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
    color: white; /* 设置链接文本的颜色 */
    background-color: #76b0f8; /* 设置链接的背景色 */
    border-radius: 5px; /* 添加一点圆角边框 */
    transition: background-color 0.3s ease; /* 添加过渡效果 */
    margin-right: 20px;
    text-align: center;
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