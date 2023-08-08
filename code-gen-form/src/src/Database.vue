<template>
  <div>
    <el-button type="success" icon="Plus" link @click="handleAdd"/>
    <el-tree
      :data="databases"
      :props="{ label: 'name', id : 'id', isLeaf: 'leaf'}"
      :load="loadNode"
      lazy
      @nodeClick="handleClick"
      style="margin-top: 20px"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span v-if="node.level === 1">
            <el-button type="primary" link icon="Edit" @click.stop="handleEdit(data)"/>
            <el-popconfirm
              width="220"
              confirm-button-text="是的"
              cancel-button-text="不是"
              icon-color="#626AEF"
              title="是否要删除吗?"
              @confirm="handleDelete(data)"
            >
              <template #reference>
                <el-button type="danger" link icon="Delete" @click.stop/>
              </template>
            </el-popconfirm>

          </span>
        </span>
      </template>
    </el-tree>
  </div>

  <el-dialog v-model="dialogFormVisible" :title="title">
    <el-form ref="formRef" :model="form" label-width="auto" :rules="rules">
      <el-form-item label="数据库名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="主机名" prop="host">
        <el-input v-model="form.host" />
      </el-form-item>
      <el-form-item label="端 口" prop="port">
        <el-input v-model="form.port" />
      </el-form-item>
      <el-form-item label="用户名" prop="user">
        <el-input v-model="form.user" />
      </el-form-item>
      <el-form-item label="密 码" prop="pass">
        <el-input v-model="form.pass" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {inject, nextTick, onMounted, reactive, ref, toRefs} from "vue";
import {add, deleteDb , getDataBase, getDatabaseList, getDbs, update} from "../http/apis/form";
import type { FormInstance } from "element-plus";
import type Node from "element-plus/es/components/tree/src/model/node";
import { ElMessage } from "element-plus";
const getList = inject<(id, dbName) => void>('getList', () => {});
const formRef = ref<FormInstance>()

const data = reactive({
  form: {},
  rules: {},
  title: '',
  dialogFormVisible: false,
  databases: []
})

const { form, rules, dialogFormVisible, databases, title } = toRefs(data)

onMounted(() => {
  getDbList()
})

function handleClick( data, node) {
  console.log('node......', node)
  console.log('data......', data)

  if (node.level === 2) {
    getList(data.dbId, data.name)
  }
}

function getDbList() {
  getDatabaseList().then(response => {
    databases.value = response.data
  })
}

/*新增数据库*/
function handleAdd() {
  resetForm(formRef.value)
  dialogFormVisible.value = true
  title.value = "新增数据源"
}

const resetForm = (formEl: FormInstance | undefined) => {
  form.value = {
    id: '',
    name: '',
    host: '',
    port: '',
    user: '',
    pass: ''
  }
  if (!formEl) return
  formEl.resetFields()
}

/*修改数据库*/
function handleEdit(node) {
  title.value = "编辑数据源"
  getDataBase(node.id).then( res => {
    nextTick(() => {
      dialogFormVisible.value = true
      form.value = res.data
    })
  })
}

/*删除数据库*/
function handleDelete(node) {
  deleteDb(node.id).then( res => {
    if (res) {
      ElMessage.success("删除成功❗️")
      getDbList()
    }
  })
}

/*新增或修改*/
function handleSubmit() {
  if ( !form.value.id ) {
    // 新增
    add(form.value).then( res => {
      if (res.data) {
        ElMessage.success("新增成功 😀")
        dialogFormVisible.value = false
        getDbList()
      }
    })
  } else {
    // 修改
    update(form.value).then( res => {
      if (res.data) {
        ElMessage.success("修改成功 😀")
        dialogFormVisible.value = false
        getDbList()
      }
    })
  }
}


interface Tree {
  name: string
  leaf?: boolean
}
const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
  if (node.level === 1) {
    getDbs(node.data.id).then( res => {
      resolve(res.data.map( item => { return { name : item, leaf: true, dbId: node.data.id} } ) )
    })
  } else {
    resolve([])
  }
}
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>