<template>
  <div class="comPower">
    <!-- 角色详细权限 -->
    <div class="powerDetail">
      <div class="power_detail">
        <div class="roleCheckGroup">
          <div
            class="list_item"
            v-for="(item, index) in rolePowerDetail.rolePower"
            :key="item.rolePowerTypeId"
          >
            <div>
              <el-checkbox
                :indeterminate="item.isIndeterminate"
                v-model="item.checkAll"
                class="check_item"
                @change="handleCheckAll(item)"
              >
                {{ item.rolePowerType }}
              </el-checkbox>
              <i :class="`el-icon-arrow-${item.isShow ? 'down' : 'up'}`" @click="item.isShow  = !item.isShow"></i>
            </div>
            <div v-show="item.isShow">
              <el-checkbox-group
                v-model="item.rolePowerNow"
                @change="checkAllGroupChange(item, index)"
              >
                <el-checkbox
                  class="check_item"
                  v-for="data in item.rolePowerList"
                  :label="data.fieldId"
                  :key="data.fieldId"
                >
                  <span>{{ data.name }}</span>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ComPower",
  data() {
    return {
      powerList: {
        roleList: [
          {
            roleName: "拥有者",
            id: "comOwners",
            defaultRole: false, // boolean
            selfDefinedRole: "sys", // 'sys' or 'self'
            rolePower: [
              {
                rolePowerType: "项目分组管理",
                rolePowerTypeId: "groupManage",
                isIndeterminate: false,
                checkAll: false,
                rolePowerNow: [],
                isShow: false,
                rolePowerList: [
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
              {
                rolePowerType: "项目管理",
                rolePowerTypeId: "projManage",
                rolePowerNow: [],
                isShow: false,
                rolePowerList: [
                  {
                    name: "创建项目",
                    fieldId: "proj_build",
                  },
                  {
                    name: "查看企业所有项目",
                    fieldId: "proj_seeAll",
                  },
                  {
                    name: "全企业内主动加入项目",
                    fieldId: "proj_selfAdd",
                  },
                  {
                    name: "解锁/锁定项目信息字段",
                    fieldId: "proj_lockField",
                  },
                  {
                    name: "创建企业项目模板",
                    fieldId: "proj_buildTemp",
                  },
                  {
                    name: "管理企业模板",
                    fieldId: "proj_manageTemp",
                  },
                  {
                    name: "迁入项目",
                    fieldId: "proj_moveIn",
                  },
                  {
                    name: "迁出项目",
                    fieldId: "proj_moveOut",
                  },
                ],
              },
              {
                rolePowerType: "成员管理",
                rolePowerTypeId: "memManage",
                rolePowerNow: [],
                isShow: false,
                rolePowerList: [
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
                    fieldId: "mem_editRole",
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
              },
            ],
          },
        ],
      },
      rolePowerDetail: {},
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.rolePowerDetail = this.powerList.roleList[0];
    });
  },
  methods: {
    handleCheckAll(item) {
      console.log("all", item);
      item.isIndeterminate = false;
      let allPower = [];
      item.rolePowerList.map((item) => {
        allPower.push(item.fieldId);
      });
      item.rolePowerNow =
        item.rolePowerNow.length === item.rolePowerList.length ? [] : allPower;
    },
    checkAllGroupChange(item, index) {
      console.log("item", item);

      let length = item.rolePowerList.length; //数组长度
      item.isIndeterminate = item.rolePowerNow.length > 0 && item.rolePowerNow.length < length;
      item.checkAll = item.rolePowerNow.length === length;
      let data = this.rolePowerDetail.rolePower[index].rolePowerNow;
      console.log("data1111111", data);
      console.log("all data", this.rolePowerDetail)
    },
    //
  },
  beforeUnmount() {
    this.rolePowerVisi = false;
  },
};
</script>

<style lang="scss" scoped>
.comPower {
  .card_header {
    padding: 26px 0px;
    border-bottom: 1px solid #e5e5e5;
    .title_left {
      font-size: 18px;
    }
    .title_right {
      el-color: #1b9aee;
    }
    .title_back {
      cursor: pointer;
      &:hover {
        el-color: #1b9aee;
      }
    }
  }
  .card_content {
    padding: 0px 20px;
    .list_item {
      cursor: pointer;
      padding: 22px 24px;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
      border-bottom: 1px solid #e5e5e5;
      &:hover {
        background: #f7f7f7;
      }
    }
  }
  .powerDetail {
    .power_detail {
      ul {
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: flex-start;
        li {
          margin-left: 20px;
          cursor: pointer;
        }
        .active {
          el-color: #262626;
          box-shadow: inset 0 -4px #1b9aee;
        }
      }
    }
  }
  .roleCheckGroup {
    margin: 20px;
    .list_item {
      margin-bottom: 1px;
      border-bottom: 1px solid #e5e5e5;
      .check_item {
        margin: 16px 50px 16px 0;
      }
    }
  }
}
</style>