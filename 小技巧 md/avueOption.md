# avue小记

```html
<avue-crud :option="option" :search.sync="search" :data="data" @search-change="searchChange">
	<template slot-scope="{disabled,size}" slot="ageSearch">
		<el-input placeholder="自定义输入框" :disabled="disabled" :size="size" style="width:200px" v-model="search.age"></el-input>
	</template>
    <template slot="searchMenu" slot-scope="scope">
		<el-button size="small">自定义按钮</el-button>
	</template>
    <template slot="menuLeft">    
      <el-button
        type="danger"
        size="small"
        icon="el-icon-delete"
        plain
        v-if="permission.terminfo_delete"
        @click="handleDelete('all')"
        >删 除
      </el-button>
  	</template>
    <template slot="status" slot-scope="scope" >
      	<el-switch
          class="switch"
          v-model="scope.row.status"
          active-text="启用"
          inactive-text="停用"
          active-value="0"
          inactive-value="1"
          @change="handleStatus('row',scope.row)"
        >
        </el-switch>
    </template>
</avue-crud>
```
 
```javascript
export default {
  data(){
    return {
        search:{},
        data:[{
          name:'张三',
          age:18,
        }],
        option:{
          align:'center',
              menuAlign:'center',
              column:[
                 {
                  label:'姓名',
                  prop:'name',
                  editDisabled:true
                }, {
                  label:'性别',
                  prop: 'sex',
                  type:'select',
                  dicData:[{
                    label:'男',
                    value:0
                  },{
                    label:'女',
                    value:1
                  }],
                  cell: true
                },{
                label:'年龄',
                prop: 'age',
                slot:true,
                formslot:true,
                dicData:[{
                  label:'男',
                  value:0
                },{
                  label:'女',
                  value:1
                }],
                rules: [
                  {
                    required: true,
                    message: '请输入年龄',
                    trigger: 'blur'
                  }
                ],
                cell: true
              },{
                label:'开关',
                prop: 'switch',
                type:'switch',
                cell: true
            }, {
                  label:'权限',
                  prop:'grade',
                  editDetail:true,
                  addDisabled:true
                }, {
                  label:'测试',
                  prop:'test',
                  addDisplay:false,
                  hide:true,
                  showColumn:false,
                },{
                  label: '省份',
                  prop: 'province',
                  type: 'select',
                  props: {
                    label: 'name',
                    value: 'code'
                  },
                  cell: true,
                  cascaderItem: ['city', 'area'],
                  dicUrl: `${baseUrl}/getProvince`,
                  rules: [
                    {
                      required: true,
                      message: '请选择省份',
                      trigger: 'blur'
                    }
                  ]
                },
                {
                  label: '城市',
                  prop: 'city',
                  type: 'select',
                  cell: true,
                  props: {
                    label: 'name',
                    value: 'code'
                  },
                  dicUrl: `${baseUrl}/getCity/{{key}}`,
                  rules: [
                    {
                      required: true,
                      message: '请选择城市',
                      trigger: 'blur'
                    }
                  ]
                },
                {
                  label: '地区',
                  prop: 'area',
                  cell: true,
                  props: {
                    label: 'name',
                    value: 'code'
                  },
                  type: 'select',
                  dicUrl: `${baseUrl}/getArea/{{key}}`,
                  rules: [
                    {
                      required: true,
                      message: '请选择地区',
                      trigger: 'blur'
                    }
                  ]
                },
    {
            label: "启用状态",
            prop: "status",
            search: true,
            order: 7,
            span: 24,
            type: "switch",
            value: 0,
            cell: true,
            slot: true,
            dicData: [
              {
                label: "停用",
                value: 1
              },
              {
                label: "启用",
                value: 0
              },
            ],
            rules: [{
              required: true,
              message: "启用状态",
              trigger: "blur"
            }]
          },
              ]
            },
      }
   },
```


```javascript
option: {
    addBtn: false,
    menu: false,
    columnBtn: false,
    refreshBtn: false,
    // searchShowBtn: false,
    // delBtn: false,
    labelWidth: 120,
    calcHeight: 30,
    tip: false,
    searchShow: true,
    searchMenuSpan: 6,
    border: true,
    index: true,
    viewBtn: false,
    // editBtn: true,
    selection: false,
    dialogClickModal: false,
    column: [],
},
```




```javascript
showColumn   true      是否加入动态现隐列

hide    false    隐藏列

tip   文字提示

rules    验证规则

display   true    是否可见

dicData  Array   字典

dicUrl   String   字典远程字典

dicFlag  true/false   表格打开表单的时候是否重新拉取字典

dicMethod   get    字典的请求方式

dicQuery   Object     字典的请求参数

addDisabled false      表单新增时是否禁止

addDisplay  true      表单新增时是否可见   只在table中展示，新增时不展示

addDetail   false    表单新增时是否为查看模式

editDisabled  false    表单编辑时是否禁止

editDisplay   true     表单编辑时是否可见 

editDetail    false    表单编辑时是否为查看模式

viewDisplay    true 

order       字段位置排序，数字越大位置越靠前

searchslot    false   表格搜索选项的自定义

cell   开启行编辑模式

menu  false   操作栏隐藏

columnBtn  列动态显隐按钮
refreshBtn   刷新按钮
addBtn  表格新增按钮
editBtn  行编辑按钮
delBtn  行删除按钮

自定义按钮调用组件中对应方法 即可(https://avuejs.com/views/doc.html),例如
编辑方法  rowEdit
保存  rowSave
打开表单新增窗口  rowAdd
打开表单查看窗口  rowView
表单更新调用  rowUpdate
                  
this.$refs.crud.rowView(this.form,0);


findObject  找出option下column对应的prop的对象
let modelname = this.findObject(this.option.column, "modelname");



表单类型
type   类型
input
select
array
url
img
cascader
checkbox
datetime
time
dynamic   子菜单
icon
radio
map
number
switch
rate
slider
color
upload
tree
table

```







[avue​]: https://avuejs.com/crud/crud-btn.html