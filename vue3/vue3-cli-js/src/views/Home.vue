<template>
  <!-- 角色详细权限 -->
  <div class="filedCheckGroup">
    <p>已选标签</p>
    <div class="filed_box">
      <div class="filed_cont" v-for="(item, index) in filedGroupDetail.filedGroup" :key="index">
        <div class="filed_label" v-for="(ite, iteIndex) in item.filedGroupNow" :key="ite">
          <span>{{ite}}</span><i class="el-icon-close icon_cross" @click="handleDelete(ite, iteIndex, item, index)"></i>
        </div>
      </div>
    </div>
    <div
      class="list_item"
      v-for="(item, index) in filedGroupDetail.filedGroup"
      :key="index"
    >
    <!-- {{item}}=={{index}} -->
      <div class="list_all">
        <el-checkbox
          :indeterminate="item.isIndeterminate"
          v-model="item.checkAll"
          class="check_item"
          @change="handleCheckAll(item)"
        >
          {{ index }}
        </el-checkbox>
        <i :class="`el-icon-arrow-${item.isShow ? 'up' : 'down'}`" @click="item.isShow  = !item.isShow"></i>
      </div>
      <div v-show="item.isShow" class="list_group">
        <el-checkbox-group
          v-model="item.filedGroupNow"
          @change="checkAllGroupChange(item, index)"
        >
          <el-checkbox
            class="check_item"
            v-for="data in item.filedGroupList"
            :label="data.fieldId"
            :key="data.fieldId"
          >
            <span>{{ data.name }}</span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ComPower",
  data() {
    return {
      filedList: {
          filedGroup: {
            "基本信息": {
              // filedGroupType: "项目分组管理",
              // filedGroupTypeId: "groupManage",
              isIndeterminate: false,
              checkAll: false,
              filedGroupNow: [],
              isShow: false,
              filedGroupList: [
                {
                  name: "创建项目分组",
                  fieldId: "group_build",
                },
                {
                  name: "删除项目分组",
                  fieldId: "group_del",
                },
                {
                  name: "编辑项目分组",
                  fieldId: "group_edit",
                },
                {
                  name: "项目分组层级调整",
                  fieldId: "group_levelAdjust",
                },
                {
                  name: "分组成员管理",
                  fieldId: "group_memberManage",
                },
                {
                  name: "查看企业所有项目分组",
                  fieldId: "group_seeAll",
                },
              ],
            },
            "家庭成员":{
              // filedGroupType: "项目管理",
              // filedGroupTypeId: "projManage",
              filedGroupNow: [],
              isShow: false,
              filedGroupList: [
                {
                  name: "家庭成员",
                  fieldId: "proj_build",
                }
              ],
            },
            "其他":{
              // filedGroupType: "成员管理",
              // filedGroupTypeId: "memManage",
              filedGroupNow: [],
              isShow: false,
              filedGroupList: [
                {
                  name: "添加企业成员",
                  fieldId: "mem_add",
                },
                {
                  name: "添加企业外部成员",
                  fieldId: "mem_addExter",
                },
                {
                  name: "移除企业成员",
                  fieldId: "mem_del",
                },
                {
                  name: "启用/停用企业成员",
                  fieldId: "mem_useBoolean",
                },
                {
                  name: "修改企业成员的角色",
                  fieldId: "mem_editfiled",
                },
                {
                  name: "修改企业成员信息",
                  fieldId: "mem_editInfo",
                },
                {
                  name: "编辑部门",
                  fieldId: "mem_editDepart",
                },
                {
                  name: "创建群组",
                  fieldId: "mem_createGroup",
                },
                {
                  name: "添加群组成员",
                  fieldId: "mem_addGroupMem",
                },
              ],
            },},
        },
      filedGroupDetail: {},
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.filedGroupDetail = this.filedList;
    });
  },
  methods: {
    handleCheckAll(item) {
      console.log("handleCheckAll item", item);
      item.isIndeterminate = false;
      let allPower = [];
      item.filedGroupList.map((item) => {
        allPower.push(item.fieldId);
      });
      item.filedGroupNow = item.filedGroupNow.length === item.filedGroupList.length ? [] : allPower;
    },
    checkAllGroupChange(item, index) {
      console.log("checkAllGroupChange item", item)
      let length = item.filedGroupList.length; //数组长度
      item.isIndeterminate = item.filedGroupNow.length > 0 && item.filedGroupNow.length < length;
      item.checkAll = item.filedGroupNow.length === length;
      // let data = this.filedGroupDetail.filedGroup[index].filedGroupNow;
      // console.log("filedGroupNow", data);
      // console.log("filedGroupDetail", this.filedGroupDetail)
    },
    handleDelete(currentItem, currentIndex, parentItem, parentIndex) {
      console.log("filedGroupDetail", this.filedGroupDetail.filedGroup[parentIndex].filedGroupNow)
      this.filedGroupDetail.filedGroup[parentIndex].filedGroupNow.splice(currentIndex,1)
      this.checkAllGroupChange(this.filedGroupDetail.filedGroup[parentIndex], parentIndex)
    }
  },
};
</script>

<style lang="scss" scoped>
.filed_box{
  min-height: 150px;
  .filed_cont{
    display: inline-flex;
  }
}
.filed_label{
  padding: 5px 30px 5px 5px;
  border: 1px solid #968b8b;
  margin: 5px;
  border-radius: 3px;
  position: relative;
  .icon_cross {
    position: absolute;
    right: 2px;
    top: 2px;
    cursor: pointer;
  }
}
.filedCheckGroup {
  .list_item {
    margin-bottom: 1px;
    border-bottom: 1px solid #e5e5e5;
    .list_all{
      background: rgba(#e5e5e5, 0.1);
      padding: 10px;
      display: flex;
      justify-content: space-between;
      i{
        cursor: pointer;
      }
    }
    .list_group{
      padding-left: 30px;
      .check_item {
        margin: 10px 30px 10px 0;
      }
    }
  }
}
</style>