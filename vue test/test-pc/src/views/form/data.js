
export const BaseGroup = [
  {
    label: '头像',
    column: [
      {
        label: '头像base',
        type: 'upload',
        listType: 'picture-img',
        propsHttp: {
          res: 'data',
          url: 'link'
        },
        canvasOption: {
          text: ' ',
          ratio: 0.1
        },
        action: '/api/blade-resource/oss/endpoint/put-file',
        tip: '只能上传jpg/png用户头像，且不超过500kb',
        showFileList: false, // 是否显示已上传文件列表
        accept: ['.jpg', '.png'], // 限制文件格式
        fileSize: 500 * 1024, // 限制文件大小B
        span: 12,
        row: true,
        prop: 'avatar'
      }
    ]
  },
  {
    label: '基础信息',
    column: [
      {
        label: '姓名',
        prop: 'realName',
        type: 'input',
        rules: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '姓名长度在2到20个字符'
          }
        ]
      },
      {
        label: '工号',
        prop: 'outid',
        type: 'input',
        rules: [
          {
            required: false,
            message: '请输入工号',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '工号长度在2到20个字符'
          }
        ]
      },
      {
        label: '员工性别',
        type: 'tree',
        dicUrl: '/api/blade-system/dict/dictionary?code=sex',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        slot: true,
        prop: 'sex',
        value: 1,
        rules: [
          {
            required: false,
            message: '请选择员工性别',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '手机号',
        prop: 'phone',
        type: 'input',
        rules: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '出生日期',
        type: 'date',
        prop: 'birthday',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '民族',
        type: 'tree',
        dicUrl:
          '/api/blade-system/dict-biz/dictionary?code=nation_kinds',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        prop: 'nation',
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择民族',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '籍贯',
        prop: 'nativePlace',
        rules: [
          {
            required: false,
            message: '请输入籍贯',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 50,
            message: '籍贯长度在2到50个字符'
          }
        ]
      },
      {
        label: '政治面貌',
        type: 'tree',
        dicUrl:
          '/api/blade-system/dict-biz/dictionary?code=politics_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        prop: 'politicsStatus',
        slot: true,
        value: 1,
        rules: [
          {
            required: false,
            message: '请选择政治面貌',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '婚育状况',
        type: 'tree',
        dicUrl:
          '/api/blade-system/dict-biz/dictionary?code=marital_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        prop: 'maritalStatus',
        slot: true,
        value: 1,
        rules: [
          {
            required: false,
            message: '请选择婚育状况',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '身份证号码',
        prop: 'idCrad',
        rules: [
          {
            required: true,
            message: '请输入身份证号码',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '证件期限开始时间',
        type: 'date',
        prop: 'idCardStartDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '证件期限截止时间',
        type: 'date',
        prop: 'idCardEndDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '签发机关',
        prop: 'idCardSignAuthority',
        rules: [
          {
            required: false,
            message: '请输入签发机关',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '签发机关长度在2到20个字符'
          }
        ]
      },
      {
        label: '生效日期',
        type: 'date',
        prop: 'idCardEffectDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '银行名称',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=back_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        prop: 'bankName',
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择银行名称',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '银行卡号',
        prop: 'bankCard',
        rules: [
          {
            required: false,
            message: '请输入银行卡号',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 50,
            message: '银行卡号长度在2到50个字符'
          }
        ]
      },
      {
        label: '邮箱',
        prop: 'email',
        rules: [
          {
            required: false,
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '现有职称',
        prop: 'currentJob',
        rules: [
          {
            required: false,
            message: '请输入现有职称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '现有职称长度在2到20个字符'
          }
        ]
      },
      {
        label: '最高学历',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=education',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        prop: 'educationBackground',
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择最高学历',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '毕业院校',
        prop: 'graduateSchool',
        rules: [
          {
            required: false,
            message: '请输入毕业院校',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '毕业院校长度在2到20个字符'
          }
        ]
      },
      {
        label: '专业方向',
        prop: 'specialty',
        rules: [
          {
            required: false,
            message: '请输入专业方向',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '专业方向长度在2到20个字符'
          }
        ]
      },
      {
        label: '毕业时间',
        type: 'date',
        prop: 'schoolEndDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '参加工作时间',
        type: 'date',
        prop: 'workDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '应聘岗位',
        prop: 'applyJob',
        rules: [
          {
            required: false,
            message: '请输入应聘岗位',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '应聘岗位长度在2到20个字符'
          }
        ]
      },
      {
        label: '应聘岗位工龄',
        prop: 'workYears',
        type: 'number',
        minRows: 0, // 最小值
        maxRows: 100, // 最大值
        rules: [
          {
            required: false,
            message: '请输入应聘岗位工龄',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '可上岗日期',
        type: 'date',
        prop: 'planEntryDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        rules: [
          {
            required: false,
            message: '请选择可上岗日期',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '身份证地址',
        prop: 'idCardAddress',
        span: 24,
        rules: [
          {
            required: false,
            message: '请输入身份证地址',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 50,
            message: '身份证地址长度在2到50个字符'
          }
        ]
      },
      {
        label: '现居住地址',
        prop: 'currentAddress',
        span: 24,
        rules: [
          {
            required: false,
            message: '请输入现居住地址',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 50,
            message: '现居住地址长度在2到50个字符'
          }
        ]
      },
      {
        label: '户籍所在地',
        prop: 'nativeAddress',
        span: 24,
        rules: [
          {
            required: false,
            message: '请输入户籍所在地',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 50,
            message: '户籍所在地长度在2到50个字符'
          }
        ]
      },
      {
        label: '户口性质',
        type: 'tree',
        dicUrl:
          '/api/blade-system/dict-biz/dictionary?code=household_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        slot: true,
        prop: 'householdType',
        value: 1,
        rules: [
          {
            required: false,
            message: '请选择户口性质',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '紧急联系人',
        prop: 'urgencyPeople',
        rules: [
          {
            required: false,
            message: '请输入紧急联系人',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '紧急联系人长度在2到20个字符'
          }
        ]
      },
      {
        label: '关系',
        prop: 'urgencyRelate',
        rules: [
          {
            required: false,
            message: '请输入关系',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '长度在2到10个字符'
          }
        ]
      },
      {
        label: '联系方式',
        prop: 'urgencyPhone',
        rules: [
          {
            required: false,
            message: '请输入联系方式',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 18,
            message: '联系方式长度在2到18个字符'
          }
        ]
      },
      {
        label: '健康状况',
        prop: 'healthCondition',
        rules: [
          {
            required: false,
            message: '请输入健康状况',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 50,
            message: '健康状况长度在2到50个字符'
          }
        ]
      }
    ]
  },
  {
    label: '工作信息',
    // prop: 'dutyInfo',
    // icon: 'el-icon-goods',
    column: [
      {
        label: '主部门',
        prop: 'mainDeptId',
        type: 'tree',
        dicData: [],
        props: {
          label: 'title'
        },
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择主部门',
            trigger: 'click'
          }
        ]
      },
      {
        label: '部门',
        prop: 'deptId',
        type: 'tree',
        multiple: true, // 多选
        dicData: [],
        props: {
          label: 'title'
        },
        checkStrictly: true,
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择部门',
            trigger: 'click'
          }
        ]
      },
      {
        label: '行政部门',
        prop: 'hrDeptId',
        type: 'tree',
        dicData: [],
        props: {
          label: 'title'
        },
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择行政部门',
            trigger: 'click'
          }
        ]
      },
      {
        label: '职务',
        prop: 'postId',
        type: 'tree',
        multiple: true,
        dicData: [],
        props: {
          label: 'postName',
          value: 'id'
        },
        rules: [
          {
            required: false,
            message: '请选择职务',
            trigger: 'click'
          }
        ]
      },
      {
        label: '岗位',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=job_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        // dataType: "number",
        prop: 'postType',
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择岗位',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '兼任岗位',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=job_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        // dataType: "number",
        prop: 'partPostType',
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择兼任岗位',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '职级',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=rank_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        // dataType: "number",
        prop: 'rank',
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择职级',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '员工状态',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=emp_status',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        prop: 'userStatus',
        slot: true,
        value: 1,
        rules: [
          {
            required: false,
            message: '请选择员工状态',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '员工类型',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=emp_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        prop: 'userType',
        slot: true,
        value: 1,
        rules: [
          {
            required: false,
            message: '请选择员工类型',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '状态类型',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=state_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        prop: 'stateType',
        slot: true,
        value: 1,
        rules: [
          {
            required: false,
            message: '请选择状态类型',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '试用期时长(月)',
        prop: 'probationPeriod',
        type: 'number',
        value: 3,
        minRows: 0, // 最小值
        maxRows: 12, // 最大值
        rules: [
          {
            required: false,
            message: '请输入试用期时长(月)',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '计划入职日期',
        type: 'date',
        prop: 'planEntryDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '实际入职日期',
        type: 'date',
        prop: 'realEntryDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '计划转正日期',
        type: 'date',
        prop: 'planOfficialDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '实际转正日期',
        type: 'date',
        prop: 'realOfficialDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '业务或费用部门编码',
        prop: 'payDeptNum',
        rules: [
          {
            required: false,
            message: '请输入业务或费用部门编码',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 50,
            message: '长度在2到50个字符'
          }
        ]
      },
      {
        label: '业务或费用部门名称',
        prop: 'payDeptName',
        rules: [
          {
            required: false,
            message: '请输入业务或费用部门名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 50,
            message: '长度在2到50个字符'
          }
        ]
      },
      {
        label: '内线电话',
        prop: 'internalCall',
        rules: [
          {
            required: false,
            message: '请输入内线电话',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 50,
            message: '长度在2到50个字符'
          }
        ]
      },
      {
        label: '职员身份',
        prop: 'staffIdentity',
        rules: [
          {
            required: false,
            message: '请输入职员身份',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 50,
            message: '长度在2到50个字符'
          }
        ]
      },
      {
        label: '从业状况',
        prop: 'workingConditions',
        rules: [
          {
            required: false,
            message: '请输入从业状况',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 50,
            message: '长度在2到50个字符'
          }
        ]
      },
      {
        label: '用工形式',
        type: 'tree',
        dicUrl:
          '/api/blade-system/dict-biz/dictionary?code=employment_form',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        slot: true,
        prop: 'employmentForm',
        value: 1,
        rules: [
          {
            required: false,
            message: '请选择用工形式',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '司龄',
        prop: 'companyWorkYears',
        type: 'number',
        minRows: 0, // 最小值
        maxRows: 100, // 最大值
        rules: [
          {
            required: false,
            message: '请输入司龄',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '工龄',
        prop: 'totalWorkYears',
        type: 'number',
        minRows: 0, // 最小值
        maxRows: 100, // 最大值
        rules: [
          {
            required: false,
            message: '请输入工龄',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '工作地点',
        prop: 'companyWorkAddress',
        rules: [
          {
            required: false,
            message: '请输入工作地点',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 50,
            message: '长度在2到50个字符'
          }
        ]
      }
    ]
  },
  {
    label: '合同信息',
    // prop: 'contractInfo',
    // icon: 'el-icon-goods',
    column: [
      {
        label: '合同编号',
        prop: 'contractNum',
        rules: [
          {
            required: false,
            message: '请输入合同编号',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在2到20个字符'
          }
        ]
      },
      {
        label: '合同类型',
        type: 'tree',
        dicUrl:
          '/api/blade-system/dict-biz/dictionary?code=contract_kinds',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        slot: true,
        prop: 'contractType',
        value: 1,
        rules: [
          {
            required: false,
            message: '请选择合同类型',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '初次合同起始日',
        type: 'date',
        prop: 'firstStartTime',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        rules: [
          {
            required: false,
            message: '请选择初次合同起始日',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '初次合同终止日',
        type: 'date',
        prop: 'firstEndTime',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '当前合同起始日',
        type: 'date',
        prop: 'nowStartTime',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '当前合同终止日',
        type: 'date',
        prop: 'nowEndTime',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      }
    ]
  },
  {
    label: '工作经历',
    // prop: 'workInfo',
    column: [
      {
        prop: 'workList',
        type: 'dynamic',
        span: 24,
        label: '工作经历1',
        children: {
          align: 'center',
          type: 'form',
          index: false,
          labelWidth: 120,
          headerAlign: 'center',
          rowAdd: (done) => {
            // this.$message.success('新增工作经历');
            done({})
          },
          rowDel: (row, done) => {
            // this.$message.success('删除工作经历'+JSON.stringify(row));
            done()
          },
          column: [
            {
              label: '开始时间',
              type: 'date',
              prop: 'workStartDate',
              format: 'yyyy-MM-dd',
              valueFormat: 'yyyy-MM-dd',
              rules: [
                {
                  required: true,
                  message: '请选择开始时间',
                  trigger: 'blur'
                }
              ]
            },
            {
              label: '结束时间',
              type: 'date',
              prop: 'workEndDate',
              format: 'yyyy-MM-dd',
              valueFormat: 'yyyy-MM-dd',
              rules: [
                {
                  required: true,
                  message: '请选择结束时间',
                  trigger: 'blur'
                }
              ]
            },
            {
              label: '公司名称',
              prop: 'workCompany',
              rules: [
                {
                  required: true,
                  message: '请输入公司名称',
                  trigger: 'blur'
                },
                {
                  min: 2,
                  max: 20,
                  message: '公司名称长度在2到20个字符'
                }
              ]
            },
            {
              label: '部门',
              prop: 'workDept',
              rules: [
                {
                  required: true,
                  message: '请输入部门',
                  trigger: 'blur'
                },
                {
                  min: 2,
                  max: 20,
                  message: '部门长度在2到20个字符'
                }
              ]
            },
            {
              label: '岗位',
              prop: 'workPost',
              rules: [
                {
                  required: true,
                  message: '请输入岗位',
                  trigger: 'blur'
                },
                {
                  min: 2,
                  max: 20,
                  message: '岗位长度在2到20个字符'
                }
              ]
            },
            {
              label: '证明人',
              prop: 'workCertifier',
              rules: [
                {
                  required: false,
                  message: '请输入证明人',
                  trigger: 'blur'
                },
                {
                  min: 2,
                  max: 20,
                  message: '证明人长度在2到20个字符'
                }
              ]
            },
            {
              label: '证明人联系方式',
              prop: 'workCertifierPhone',
              rules: [
                {
                  required: false,
                  message: '请输入证明人联系方式',
                  trigger: 'blur'
                },
                {
                  min: 2,
                  max: 20,
                  message: '证明人联系方式长度在2到20个字符'
                }
              ]
            },
            {
              label: '离职原因',
              prop: 'workLeaveReason',
              rules: [
                {
                  required: false,
                  message: '请输入离职原因',
                  trigger: 'blur'
                },
                {
                  min: 2,
                  max: 20,
                  message: '离职原因长度在2到20个字符'
                }
              ]
            }
          ]
        }
      },
      {
        label: '开始时间',
        type: 'date',
        prop: 'workStartDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        rules: [
          {
            required: true,
            message: '请选择开始时间',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '结束时间',
        type: 'date',
        prop: 'workEndDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        rules: [
          {
            required: true,
            message: '请选择结束时间',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '公司名称',
        prop: 'workCompany',
        rules: [
          {
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '公司名称长度在2到20个字符'
          }
        ]
      },
      {
        label: '部门',
        prop: 'workDept',
        rules: [
          {
            required: true,
            message: '请输入部门',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '部门长度在2到20个字符'
          }
        ]
      },
      {
        label: '岗位',
        prop: 'workPost',
        rules: [
          {
            required: true,
            message: '请输入岗位',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '岗位长度在2到20个字符'
          }
        ]
      },
      {
        label: '证明人',
        prop: 'workCertifier',
        rules: [
          {
            required: false,
            message: '请输入证明人',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '证明人长度在2到20个字符'
          }
        ]
      },
      {
        label: '证明人联系方式',
        prop: 'workCertifierPhone',
        rules: [
          {
            required: false,
            message: '请输入证明人联系方式',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '证明人联系方式长度在2到20个字符'
          }
        ]
      },
      {
        label: '离职原因',
        prop: 'workLeaveReason',
        rules: [
          {
            required: false,
            message: '请输入离职原因',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '离职原因长度在2到20个字符'
          }
        ]
      }
    ]
  },
  {
    label: '教育经历',
    // prop: 'educateInfo',
    // icon: 'el-icon-goods',
    column: [
      {
        prop: 'educateList',
        type: 'dynamic',
        span: 24,
        label: '教育经历1',
        children: {
          align: 'center',
          type: 'form',
          index: false,
          labelWidth: 120,
          headerAlign: 'center',
          rowAdd: (done) => {
            // this.$message.success('新增教育经历');
            done({})
          },
          rowDel: (row, done) => {
            // this.$message.success('删除教育经历'+JSON.stringify(row));
            done()
          },
          column: [
            {
              label: '开始时间',
              type: 'date',
              prop: 'schoolStartDate',
              format: 'yyyy-MM-dd',
              valueFormat: 'yyyy-MM-dd',
              rules: [
                {
                  required: true,
                  message: '请选择开始时间',
                  trigger: 'blur'
                }
              ]
            },
            {
              label: '结束时间',
              type: 'date',
              prop: 'schoolEndDate',
              format: 'yyyy-MM-dd',
              valueFormat: 'yyyy-MM-dd',
              rules: [
                {
                  required: true,
                  message: '请选择结束时间',
                  trigger: 'blur'
                }
              ]
            },
            {
              label: '毕业院校',
              prop: 'graduateSchool',
              rules: [
                {
                  required: true,
                  message: '请输入毕业院校',
                  trigger: 'blur'
                },
                {
                  min: 2,
                  max: 20,
                  message: '毕业院校长度在2到20个字符'
                }
              ]
            },
            {
              label: '专业方向',
              prop: 'specialty',
              rules: [
                {
                  required: true,
                  message: '请输入专业方向',
                  trigger: 'blur'
                },
                {
                  min: 2,
                  max: 20,
                  message: '专业方向长度在2到20个字符'
                }
              ]
            },
            {
              label: '学历',
              type: 'tree',
              dicUrl:
                '/api/blade-system/dict-biz/dictionary?code=education',
              props: {
                label: 'dictValue',
                value: 'dictKey'
              },
              dataType: 'number',
              prop: 'educationBackground',
              slot: true,
              rules: [
                {
                  required: true,
                  message: '请选择学历',
                  trigger: 'blur'
                }
              ]
            },
            {
              label: '学历类型',
              type: 'tree',
              dicUrl:
                '/api/blade-system/dict-biz/dictionary?code=education_type',
              props: {
                label: 'dictValue',
                value: 'dictKey'
              },
              dataType: 'number',
              prop: 'educationType',
              slot: true,
              rules: [
                {
                  required: false,
                  message: '请选择学历类型',
                  trigger: 'blur'
                }
              ]
            },
            {
              label: '学位',
              prop: 'degree',
              rules: [
                {
                  required: false,
                  message: '请输入学位',
                  trigger: 'blur'
                },
                {
                  min: 2,
                  max: 20,
                  message: '学位长度在2到20个字符'
                }
              ]
            },
            {
              label: '毕业证书编号',
              prop: 'diplomaNum',
              rules: [
                {
                  required: false,
                  message: '请输入毕业证书编号',
                  trigger: 'blur'
                },
                {
                  min: 2,
                  max: 20,
                  message: '毕业证书编号长度在2到20个字符'
                }
              ]
            }
          ]
        }
      },
      {
        label: '开始时间',
        type: 'date',
        prop: 'schoolStartDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        rules: [
          {
            required: true,
            message: '请选择开始时间',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '结束时间',
        type: 'date',
        prop: 'schoolEndDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        rules: [
          {
            required: true,
            message: '请选择结束时间',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '毕业院校',
        prop: 'graduateSchool',
        rules: [
          {
            required: true,
            message: '请输入毕业院校',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '毕业院校长度在2到20个字符'
          }
        ]
      },
      {
        label: '专业方向',
        prop: 'specialty',
        rules: [
          {
            required: true,
            message: '请输入专业方向',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '专业方向长度在2到20个字符'
          }
        ]
      },
      {
        label: '学历',
        type: 'tree',
        dicUrl:
            '/api/blade-system/dict-biz/dictionary?code=education',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        prop: 'educationBackground',
        slot: true,
        rules: [
          {
            required: true,
            message: '请选择学历',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '学历类型',
        type: 'tree',
        dicUrl:
            '/api/blade-system/dict-biz/dictionary?code=education_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        prop: 'educationType',
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择学历类型',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '学位',
        prop: 'degree',
        rules: [
          {
            required: false,
            message: '请输入学位',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '学位长度在2到20个字符'
          }
        ]
      },
      {
        label: '毕业证书编号',
        prop: 'diplomaNum',
        rules: [
          {
            required: false,
            message: '请输入毕业证书编号',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '毕业证书编号长度在2到20个字符'
          }
        ]
      }
    ]
  },
  {
    label: '家庭成员',
    // prop: 'familyInfo',
    // icon: 'el-icon-goods',
    column: [
      {
        prop: 'familyList',
        type: 'dynamic',
        span: 24,
        label: '家庭成员1',
        children: {
          align: 'center',
          type: 'form',
          index: false,
          labelWidth: 120,
          headerAlign: 'center',
          rowAdd: (done) => {
            // this.$message.success('新增家庭成员');
            done({})
          },
          rowDel: (row, done) => {
            // this.$message.success('删除家庭成员'+JSON.stringify(row));
            done()
          },
          column: [
            {
              label: '姓名',
              prop: 'familyName',
              rules: [
                {
                  required: true,
                  message: '请输入姓名',
                  trigger: 'blur'
                },
                {
                  min: 2,
                  max: 20,
                  message: '姓名长度在2到20个字符'
                }
              ]
            },
            {
              label: '性别',
              type: 'select',
              dicUrl: '/api/blade-system/dict/dictionary?code=sex',
              props: {
                label: 'dictValue',
                value: 'dictKey'
              },
              dataType: 'number',
              slot: true,
              prop: 'familySex',
              rules: [
                {
                  required: true,
                  message: '请选择性别',
                  trigger: 'blur'
                }
              ]
            },
            {
              label: '亲属关系',
              prop: 'familyRelate',
              rules: [
                {
                  required: true,
                  message: '请输入亲属关系',
                  trigger: 'blur'
                },
                {
                  min: 2,
                  max: 20,
                  message: '亲属关系长度在2到20个字符'
                }
              ]
            },
            {
              label: '工作单位或住址',
              prop: 'familyWorkCompany',
              rules: [
                {
                  required: false,
                  message: '请输入工作单位或住址',
                  trigger: 'blur'
                },
                {
                  min: 2,
                  max: 50,
                  message: '工作单位或住址长度在2到50个字符'
                }
              ]
            },
            {
              label: '联系电话',
              prop: 'familyPhone',
              rules: [
                {
                  required: false,
                  message: '请输入联系电话',
                  trigger: 'blur'
                },
                {
                  min: 2,
                  max: 20,
                  message: '联系电话长度在2到20个字符'
                }
              ]
            }
          ]
        }

      },
      {
        label: '姓名',
        prop: 'familyName',
        rules: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '姓名长度在2到20个字符'
          }
        ]
      },
      {
        label: '性别',
        type: 'select',
        dicUrl: '/api/blade-system/dict/dictionary?code=sex',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        slot: true,
        prop: 'familySex',
        rules: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '亲属关系',
        prop: 'familyRelate',
        rules: [
          {
            required: true,
            message: '请输入亲属关系',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '亲属关系长度在2到20个字符'
          }
        ]
      },
      {
        label: '工作单位或住址',
        prop: 'familyWorkCompany',
        rules: [
          {
            required: false,
            message: '请输入工作单位或住址',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 50,
            message: '工作单位或住址长度在2到50个字符'
          }
        ]
      },
      {
        label: '联系电话',
        prop: 'familyPhone',
        rules: [
          {
            required: false,
            message: '请输入联系电话',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '联系电话长度在2到20个字符'
          }
        ]
      }
    ]
  },
  {
    label: '技能信息',
    // prop: 'skillsInfo',
    // icon: 'el-icon-goods',
    column: [
      {
        prop: 'skillsList',
        type: 'dynamic',
        span: 24,
        label: '技能信息1',
        children: {
          align: 'center',
          type: 'form',
          index: false,
          labelWidth: 120,
          headerAlign: 'center',
          rowAdd: (done) => {
            // this.$message.success('新增技能信息');
            done({})
          },
          rowDel: (row, done) => {
            // this.$message.success('删除技能信息'+JSON.stringify(row));
            done()
          },
          column: [
            {
              label: '证书类型',
              type: 'tree',
              dicUrl:
                '/api/blade-system/dict-biz/dictionary?code=skills',
              props: {
                label: 'dictValue',
                value: 'dictKey'
              },
              dataType: 'number',
              slot: true,
              prop: 'skillsType',
              value: 1,
              rules: [
                {
                  required: true,
                  message: '请选择证书类型',
                  trigger: 'blur'
                }
              ]
            },
            {
              label: '证书名称',
              prop: 'skillsName',
              rules: [
                {
                  required: false,
                  message: '请输入证书名称',
                  trigger: 'blur'
                },
                {
                  min: 2,
                  max: 20,
                  message: '证书名称长度在2到20个字符'
                }
              ]
            },
            {
              label: '证书编号',
              prop: 'certificateNum',
              rules: [
                {
                  required: true,
                  message: '请输入证书编号',
                  trigger: 'blur'
                },
                {
                  min: 2,
                  max: 20,
                  message: '证书编号长度在2到20个字符'
                }
              ]
            }
          ]
        }
      },
      {
        label: '证书类型',
        type: 'tree',
        dicUrl:
            '/api/blade-system/dict-biz/dictionary?code=skills',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        slot: true,
        prop: 'skillsType',
        value: 1,
        rules: [
          {
            required: true,
            message: '请选择证书类型',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '证书名称',
        prop: 'skillsName',
        rules: [
          {
            required: false,
            message: '请输入证书名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '证书名称长度在2到20个字符'
          }
        ]
      },
      {
        label: '证书编号',
        prop: 'certificateNum',
        rules: [
          {
            required: true,
            message: '请输入证书编号',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '证书编号长度在2到20个字符'
          }
        ]
      }
    ]
  },
  {
    label: '其他',
    // prop: 'otherInfo',
    // icon: 'el-icon-goods',
    column: [
      {
        label: '招聘渠道',
        prop: 'recruitmentChannel',
        rules: [
          {
            required: false,
            message: '请输入招聘渠道',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '招聘渠道长度在2到20个字符'
          }
        ]
      },
      {
        label: '福利缴纳地',
        prop: 'welfareAddress',
        rules: [
          {
            required: false,
            message: '请输入福利缴纳地',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '福利缴纳地长度在2到20个字符'
          }
        ]
      },
      {
        label: '是否与本公司签订有知识产权相关的《保密协议》？',
        prop: 'ifSignSecrecy',
        labelWidth: 370,
        type: 'switch',
        span: 24,
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否签订',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否与本公司签订有知识产权相关的《竞业限制协议》？',
        prop: 'ifSignBusinessLimit',
        labelWidth: 400,
        type: 'switch',
        span: 24,
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否签订',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否与上一家签订有知识产权相关的《保密协议》？',
        prop: 'formerIfSignSecrecy',
        labelWidth: 370,
        type: 'switch',
        span: 24,
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否签订',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否与上一家签订有知识产权相关的《竞业限制协议》？',
        prop: 'formerIfSignBusinessLimit',
        labelWidth: 400,
        type: 'switch',
        span: 24,
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否签订',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否封存',
        prop: 'status',
        type: 'switch',
        align: 'center',
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: true,
            message: '请选择封存',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否核心人才',
        prop: 'ifCoreTalent',
        type: 'switch',
        align: 'center',
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否核心人才',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否发车补',
        prop: 'ifSendCarAllowance',
        type: 'switch',
        align: 'center',
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否发车补',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否发餐补',
        prop: 'ifSendMealAllowance',
        type: 'switch',
        align: 'center',
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否发餐补',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否工会会员',
        prop: 'ifUnionMember',
        type: 'switch',
        align: 'center',
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否工会会员',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否发放区域补贴',
        prop: 'ifSendRegionalAllowance',
        type: 'switch',
        align: 'center',
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否发放区域补贴',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '人员备注',
        prop: 'personRemark',
        span: 24,
        type: 'textarea',
        rules: [
          {
            required: false,
            message: '请输入人员备注',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 50,
            message: '人员备注长度在2到50个字符'
          }
        ]
      }
    ]
  }
]
export const RuzhiGroup = [
  {
    'column': [
      {
        'label': '头像ruzhi',
        type: 'upload',
        listType: 'picture-img',
        propsHttp: {
          res: 'data',
          url: 'link'
        },
        canvasOption: {
          text: ' ',
          ratio: 0.1
        },
        action: '/api/blade-resource/oss/endpoint/put-file',
        tip: '只能上传jpg/png用户头像，且不超过500kb',
        showFileList: false, // 是否显示已上传文件列表
        accept: ['.jpg', '.png'], // 限制文件格式
        fileSize: 500 * 1024, // 限制文件大小B
        span: 12,
        row: true,
        prop: 'avatar'
      }
    ]
  },
  {
    label: '基础信息',
    // prop: 'baseInfo',
    // icon: 'el-icon-user-solid',
    column: [
      {
        label: '所属租户',
        prop: 'tenantId',
        type: 'tree',
        dicUrl: '/api/blade-system/tenant/select',
        props: {
          label: 'tenantName',
          value: 'tenantId'
        },
        /* hide: !website.tenantMode,
        addDisplay: website.tenantMode,
        editDisplay: website.tenantMode,
        viewDisplay: website.tenantMode, */
        hide: true,
        addDisplay: false,
        editDisplay: false,
        viewDisplay: false,
        rules: [{
          required: true,
          message: '请输入所属租户',
          trigger: 'click'
        }],
        span: 24
      },
      {
        label: '姓名',
        prop: 'realName',
        rules: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '姓名长度在2到20个字符'
        }]
      },
      {
        label: '工号',
        prop: 'outid',
        rules: [{
          required: true,
          message: '请输入工号',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '工号长度在2到20个字符'
        }]
      },
      {
        label: '员工性别',
        type: 'tree',
        dicUrl: '/api/blade-system/dict/dictionary?code=sex',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        slot: true,
        prop: 'sex',
        value: 1,
        rules: [{
          required: false,
          message: '请选择员工性别',
          trigger: 'blur'
        }]
      },
      {
        label: '手机号',
        prop: 'phone',
        rules: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }]
      },
      {
        label: '出生日期',
        type: 'date',
        prop: 'birthday',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '民族',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=nation_kinds',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        prop: 'nation',
        slot: true,
        rules: [{
          required: false,
          message: '请选择民族',
          trigger: 'blur'
        }]
      },
      {
        label: '籍贯',
        prop: 'nativePlace',
        rules: [{
          required: false,
          message: '请输入籍贯',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 50,
          message: '籍贯长度在2到50个字符'
        }]
      },
      {
        label: '政治面貌',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=politics_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        prop: 'politicsStatus',
        slot: true,
        value: 1,
        rules: [{
          required: false,
          message: '请选择政治面貌',
          trigger: 'blur'
        }]
      },
      {
        label: '婚育状况',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=marital_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        prop: 'maritalStatus',
        slot: true,
        value: 1,
        rules: [{
          required: false,
          message: '请选择婚育状况',
          trigger: 'blur'
        }]
      },
      {
        label: '身份证号码',
        prop: 'idCrad',
        rules: [{
          required: true,
          message: '请输入身份证号码',
          trigger: 'blur'
        }]
      },
      {
        label: '证件期限开始时间',
        type: 'date',
        prop: 'idCardStartDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '证件期限截止时间',
        type: 'date',
        prop: 'idCardEndDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '签发机关',
        prop: 'idCardSignAuthority',
        rules: [{
          required: false,
          message: '请输入签发机关',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '签发机关长度在2到20个字符'
        }]
      },
      {
        label: '生效日期',
        type: 'date',
        prop: 'idCardEffectDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '银行名称',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=back_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        prop: 'bankName',
        slot: true,
        rules: [{
          required: true,
          message: '请选择银行名称',
          trigger: 'blur'
        }]
      },
      {
        label: '银行卡号',
        prop: 'bankCard',
        rules: [{
          required: true,
          message: '请输入银行卡号',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 50,
          message: '银行卡号长度在2到50个字符'
        }]
      },
      {
        label: '邮箱',
        prop: 'email',
        rules: [{
          required: false,
          message: '请输入邮箱',
          trigger: 'blur'
        }]
      },
      {
        label: '现有职称',
        prop: 'currentJob',
        rules: [{
          required: false,
          message: '请输入现有职称',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '现有职称长度在2到20个字符'
        }]
      },
      {
        label: '最高学历',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=education',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        prop: 'educationBackground',
        slot: true,
        rules: [{
          required: false,
          message: '请选择最高学历',
          trigger: 'blur'
        }]
      },
      {
        label: '毕业院校',
        prop: 'graduateSchool',
        rules: [{
          required: false,
          message: '请输入毕业院校',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '毕业院校长度在2到20个字符'
        }]
      },
      {
        label: '专业方向',
        prop: 'specialty',
        rules: [{
          required: false,
          message: '请输入专业方向',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '专业方向长度在2到20个字符'
        }]
      },
      {
        label: '毕业时间',
        type: 'date',
        prop: 'schoolEndDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '参加工作时间',
        type: 'date',
        prop: 'workDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '应聘岗位',
        prop: 'applyJob',
        rules: [{
          required: false,
          message: '请输入应聘岗位',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '应聘岗位长度在2到20个字符'
        }]
      },
      {
        label: '应聘岗位工龄',
        prop: 'workYears',
        type: 'number',
        minRows: 0, // 最小值
        maxRows: 100, // 最大值
        rules: [{
          required: false,
          message: '请输入应聘岗位工龄',
          trigger: 'blur'
        }]
      },
      {
        label: '可上岗日期',
        type: 'date',
        prop: 'planEntryDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        rules: [{
          required: false,
          message: '请选择可上岗日期',
          trigger: 'blur'
        }]
      },
      {
        label: '身份证地址',
        prop: 'idCardAddress',
        span: 24,
        rules: [{
          required: false,
          message: '请输入身份证地址',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 50,
          message: '身份证地址长度在2到50个字符'
        }]
      },
      {
        label: '现居住地址',
        prop: 'currentAddress',
        span: 24,
        rules: [{
          required: false,
          message: '请输入现居住地址',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 50,
          message: '现居住地址长度在2到50个字符'
        }]
      },
      {
        label: '户籍所在地',
        prop: 'nativeAddress',
        span: 24,
        rules: [{
          required: false,
          message: '请输入户籍所在地',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 50,
          message: '户籍所在地长度在2到50个字符'
        }]
      },
      {
        label: '户口性质',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=household_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        slot: true,
        prop: 'householdType',
        value: 1,
        rules: [{
          required: false,
          message: '请选择户口性质',
          trigger: 'blur'
        }]
      },
      {
        label: '紧急联系人',
        prop: 'urgencyPeople',
        rules: [{
          required: false,
          message: '请输入紧急联系人',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '紧急联系人长度在2到20个字符'
        }]
      },
      {
        label: '关系',
        prop: 'urgencyRelate',
        rules: [{
          required: false,
          message: '请输入关系',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 10,
          message: '长度在2到10个字符'
        }]
      },
      {
        label: '联系方式',
        prop: 'urgencyPhone',
        rules: [{
          required: false,
          message: '请输入联系方式',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 18,
          message: '联系方式长度在2到18个字符'
        }]
      },
      {
        label: '健康状况',
        prop: 'healthCondition',
        rules: [{
          required: false,
          message: '请输入健康状况',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 50,
          message: '健康状况长度在2到50个字符'
        }]
      }
    ]
  },
  {
    label: '工作信息',
    // prop: 'dutyInfo',
    // icon: 'el-icon-goods',
    column: [
      {
        label: '主部门',
        prop: 'mainDeptId',
        type: 'tree',
        dicData: [],
        props: {
          label: 'title'
        },
        slot: true,
        rules: [{
          required: true,
          message: '请选择主部门',
          trigger: 'click'
        }]
      },
      {
        label: '部门',
        prop: 'deptId',
        type: 'tree',
        multiple: true, // 多选
        dicData: [],
        props: {
          label: 'title'
        },
        checkStrictly: true,
        slot: true,
        rules: [{
          required: true,
          message: '请选择部门',
          trigger: 'click'
        }]
      },
      {
        label: '行政部门',
        prop: 'hrDeptId',
        type: 'tree',
        dicData: [],
        props: {
          label: 'title'
        },
        slot: true,
        rules: [{
          required: false,
          message: '请选择行政部门',
          trigger: 'click'
        }]
      },
      {
        label: '职务',
        prop: 'postId',
        type: 'tree',
        multiple: true,
        dicData: [],
        props: {
          label: 'postName',
          value: 'id'
        },
        rules: [{
          required: true,
          message: '请选择职务',
          trigger: 'click'
        }]
      },
      {
        label: '岗位',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=job_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        // dataType: "number",
        prop: 'postType',
        slot: true,
        rules: [{
          required: true,
          message: '请选择岗位',
          trigger: 'blur'
        }]
      },
      {
        label: '兼任岗位',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=job_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        // dataType: "number",
        prop: 'partPostType',
        slot: true,
        rules: [{
          required: false,
          message: '请选择兼任岗位',
          trigger: 'blur'
        }]
      },
      {
        label: '职级',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=rank_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        // dataType: "number",
        prop: 'rank',
        slot: true,
        rules: [{
          required: false,
          message: '请选择职级',
          trigger: 'blur'
        }]
      },
      {
        label: '员工状态',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=emp_status',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        value: 2,
        dataType: 'number',
        prop: 'userStatus',
        slot: true,
        rules: [{
          required: false,
          message: '请选择员工状态',
          trigger: 'blur'
        }]
      },
      {
        label: '员工类型',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=emp_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        prop: 'userType',
        slot: true,
        value: 1,
        rules: [{
          required: false,
          message: '请选择员工类型',
          trigger: 'blur'
        }]
      },
      {
        label: '状态类型',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=state_type',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        prop: 'stateType',
        slot: true,
        value: 1,
        rules: [{
          required: false,
          message: '请选择状态类型',
          trigger: 'blur'
        }]
      },
      {
        label: '试用期时长(月)',
        prop: 'probationPeriod',
        type: 'number',
        value: 3,
        rules: [{
          required: false,
          message: '请输入试用期时长(月)',
          trigger: 'blur'
        }]
      },
      {
        label: '计划入职日期',
        type: 'date',
        prop: 'planEntryDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        rules: [{
          required: true,
          message: '请选择员工类型',
          trigger: 'blur'
        }]
      },
      {
        label: '实际入职日期',
        type: 'date',
        prop: 'realEntryDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        rules: [{
          required: true,
          message: '请选择员工类型',
          trigger: 'blur'
        }]
      },
      {
        label: '计划转正日期',
        type: 'date',
        prop: 'planOfficialDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '实际转正日期',
        type: 'date',
        prop: 'realOfficialDate',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        label: '业务或费用部门编码',
        prop: 'payDeptNum',
        rules: [{
          required: false,
          message: '请输入业务或费用部门编码',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 50,
          message: '长度在2到50个字符'
        }]
      },
      {
        label: '业务或费用部门名称',
        prop: 'payDeptName',
        rules: [{
          required: false,
          message: '请输入业务或费用部门名称',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 50,
          message: '长度在2到50个字符'
        }]
      },
      {
        label: '内线电话',
        prop: 'internalCall',
        rules: [{
          required: false,
          message: '请输入内线电话',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 50,
          message: '长度在2到50个字符'
        }]
      },
      {
        label: '职员身份',
        prop: 'staffIdentity',
        rules: [{
          required: false,
          message: '请输入职员身份',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 50,
          message: '长度在2到50个字符'
        }]
      },
      {
        label: '从业状况',
        prop: 'workingConditions',
        rules: [{
          required: false,
          message: '请输入从业状况',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 50,
          message: '长度在2到50个字符'
        }]
      },
      {
        label: '用工形式',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=employment_form',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        slot: true,
        prop: 'employmentForm',
        value: 1,
        rules: [{
          required: false,
          message: '请选择用工形式',
          trigger: 'blur'
        }]
      },
      {
        label: '司龄',
        prop: 'companyWorkYears',
        type: 'number',
        minRows: 0, // 最小值
        maxRows: 100, // 最大值
        rules: [{
          required: false,
          message: '请输入司龄',
          trigger: 'blur'
        }]
      },
      {
        label: '工龄',
        prop: 'totalWorkYears',
        type: 'number',
        minRows: 0, // 最小值
        maxRows: 100, // 最大值
        rules: [{
          required: false,
          message: '请输入工龄',
          trigger: 'blur'
        }]
      },
      {
        label: '工作地点',
        prop: 'companyWorkAddress',
        rules: [{
          required: false,
          message: '请输入工作地点',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 50,
          message: '长度在2到50个字符'
        }]
      }
    ]
  },
  {
    label: '合同信息',
    // prop: 'contractInfo',
    // icon: 'el-icon-goods',
    column: [
      {
        label: '合同编号',
        prop: 'contractNum',
        rules: [{
          required: true,
          message: '请输入合同编号',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '长度在2到20个字符'
        }]
      },
      {
        label: '合同类型',
        type: 'tree',
        dicUrl: '/api/blade-system/dict-biz/dictionary?code=contract_kinds',
        props: {
          label: 'dictValue',
          value: 'dictKey'
        },
        dataType: 'number',
        slot: true,
        prop: 'contractType',
        value: 1,
        rules: [{
          required: true,
          message: '请选择合同类型',
          trigger: 'blur'
        }]
      },
      {
        label: '初次合同起始日',
        type: 'date',
        labelWidth: 125,
        prop: 'firstStartTime',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        rules: [{
          required: true,
          message: '请选择初次合同起始日',
          trigger: 'blur'
        }]
      },
      {
        label: '初次合同终止日',
        type: 'date',
        prop: 'firstEndTime',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        rules: [{
          required: true,
          message: '请选择初次合同终止日',
          trigger: 'blur'
        }]
      },
      {
        label: '当前合同起始日',
        type: 'date',
        prop: 'nowStartTime',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        rules: [{
          required: true,
          message: '请选择当前合同起始日',
          trigger: 'blur'
        }]
      },
      {
        label: '当前合同终止日',
        type: 'date',
        prop: 'nowEndTime',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        rules: [{
          required: true,
          message: '请选择当前合同终止日',
          trigger: 'blur'
        }]
      },
      {
        label: '续签次数',
        prop: 'renewNumber',
        disabled: true,
        addDisplay: false,
        value: 0,
        rules: [{
          required: false,
          message: '请输入续签次数',
          trigger: 'blur'
        }]
      }
    ]
  },
  {
    label: '工作经历',
    // prop: 'workInfo',
    column: [
      {
        prop: 'workList',
        type: 'dynamic',
        span: 24,
        children: {
          align: 'center',
          type: 'form',
          index: false,
          labelWidth: 120,
          headerAlign: 'center',
          rowAdd: (done) => {
            // this.$message.success('新增工作经历');
            done({
            })
          },
          rowDel: (row, done) => {
            // this.$message.success('删除工作经历'+JSON.stringify(row));
            done()
          },
          column: [
            {
              label: '开始时间',
              type: 'date',
              prop: 'workStartDate',
              format: 'yyyy-MM-dd',
              valueFormat: 'yyyy-MM-dd',
              rules: [{
                required: true,
                message: '请选择开始时间',
                trigger: 'blur'
              }]
            },
            {
              label: '结束时间',
              type: 'date',
              prop: 'workEndDate',
              format: 'yyyy-MM-dd',
              valueFormat: 'yyyy-MM-dd',
              rules: [{
                required: true,
                message: '请选择结束时间',
                trigger: 'blur'
              }]
            },
            {
              label: '公司名称',
              prop: 'workCompany',
              rules: [{
                required: true,
                message: '请输入公司名称',
                trigger: 'blur'
              },
              {
                min: 2,
                max: 20,
                message: '公司名称长度在2到20个字符'
              }]
            },
            {
              label: '部门',
              prop: 'workDept',
              rules: [{
                required: true,
                message: '请输入部门',
                trigger: 'blur'
              },
              {
                min: 2,
                max: 20,
                message: '部门长度在2到20个字符'
              }]
            },
            {
              label: '岗位',
              prop: 'workPost',
              rules: [{
                required: true,
                message: '请输入岗位',
                trigger: 'blur'
              },
              {
                min: 2,
                max: 20,
                message: '岗位长度在2到20个字符'
              }]
            },
            {
              label: '证明人',
              prop: 'workCertifier',
              rules: [{
                required: false,
                message: '请输入证明人',
                trigger: 'blur'
              },
              {
                min: 2,
                max: 20,
                message: '证明人长度在2到20个字符'
              }]
            },
            {
              label: '证明人联系方式',
              prop: 'workCertifierPhone',
              rules: [{
                required: false,
                message: '请输入证明人联系方式',
                trigger: 'blur'
              },
              {
                min: 2,
                max: 20,
                message: '证明人联系方式长度在2到20个字符'
              }]
            },
            {
              label: '离职原因',
              prop: 'workLeaveReason',
              rules: [{
                required: false,
                message: '请输入离职原因',
                trigger: 'blur'
              },
              {
                min: 2,
                max: 20,
                message: '离职原因长度在2到20个字符'
              }]
            }
          ]
        }
      }
    ]

  },
  {
    label: '教育经历',
    // prop: 'educateInfo',
    // icon: 'el-icon-goods',
    column: [
      {
        prop: 'educateList',
        type: 'dynamic',
        span: 24,
        children: {
          align: 'center',
          type: 'form',
          index: false,
          labelWidth: 120,
          headerAlign: 'center',
          rowAdd: (done) => {
            // this.$message.success('新增教育经历');
            done({
            })
          },
          rowDel: (row, done) => {
            // this.$message.success('删除教育经历'+JSON.stringify(row));
            done()
          },
          column: [
            {
              label: '开始时间',
              type: 'date',
              prop: 'schoolStartDate',
              format: 'yyyy-MM-dd',
              valueFormat: 'yyyy-MM-dd',
              rules: [{
                required: true,
                message: '请选择开始时间',
                trigger: 'blur'
              }]
            },
            {
              label: '结束时间',
              type: 'date',
              prop: 'schoolEndDate',
              format: 'yyyy-MM-dd',
              valueFormat: 'yyyy-MM-dd',
              rules: [{
                required: true,
                message: '请选择结束时间',
                trigger: 'blur'
              }]
            },
            {
              label: '毕业院校',
              prop: 'graduateSchool',
              rules: [{
                required: true,
                message: '请输入毕业院校',
                trigger: 'blur'
              },
              {
                min: 2,
                max: 20,
                message: '毕业院校长度在2到20个字符'
              }]
            },
            {
              label: '专业方向',
              prop: 'specialty',
              rules: [{
                required: true,
                message: '请输入专业方向',
                trigger: 'blur'
              },
              {
                min: 2,
                max: 20,
                message: '专业方向长度在2到20个字符'
              }]
            },
            {
              label: '学历',
              type: 'tree',
              dicUrl: '/api/blade-system/dict-biz/dictionary?code=education',
              props: {
                label: 'dictValue',
                value: 'dictKey'
              },
              dataType: 'number',
              prop: 'educationBackground',
              slot: true,
              rules: [{
                required: true,
                message: '请选择学历',
                trigger: 'blur'
              }]
            },
            {
              label: '学历类型',
              type: 'tree',
              dicUrl: '/api/blade-system/dict-biz/dictionary?code=education_type',
              props: {
                label: 'dictValue',
                value: 'dictKey'
              },
              dataType: 'number',
              prop: 'educationType',
              slot: true,
              rules: [{
                required: false,
                message: '请选择学历类型',
                trigger: 'blur'
              }]
            },
            {
              label: '学位',
              prop: 'degree',
              rules: [{
                required: false,
                message: '请输入学位',
                trigger: 'blur'
              },
              {
                min: 2,
                max: 20,
                message: '学位长度在2到20个字符'
              }]
            },
            {
              label: '毕业证书编号',
              prop: 'diplomaNum',
              rules: [{
                required: false,
                message: '请输入毕业证书编号',
                trigger: 'blur'
              },
              {
                min: 2,
                max: 20,
                message: '毕业证书编号长度在2到20个字符'
              }]
            }
          ]
        }
      }
    ]
  },
  {
    label: '家庭成员',
    // prop: 'familyInfo',
    // icon: 'el-icon-goods',
    column: [
      {
        prop: 'familyList',
        type: 'dynamic',
        span: 24,
        children: {
          align: 'center',
          type: 'form',
          index: false,
          labelWidth: 120,
          headerAlign: 'center',
          rowAdd: (done) => {
            // this.$message.success('新增家庭成员');
            done({
            })
          },
          rowDel: (row, done) => {
            // this.$message.success('删除家庭成员'+JSON.stringify(row));
            done()
          },
          column: [
            {
              label: '姓名',
              prop: 'familyName',
              rules: [{
                required: true,
                message: '请输入姓名',
                trigger: 'blur'
              },
              {
                min: 2,
                max: 20,
                message: '姓名长度在2到20个字符'
              }]
            },
            {
              label: '性别',
              type: 'select',
              dicUrl: '/api/blade-system/dict/dictionary?code=sex',
              props: {
                label: 'dictValue',
                value: 'dictKey'
              },
              dataType: 'number',
              slot: true,
              prop: 'familySex',
              rules: [{
                required: true,
                message: '请选择性别',
                trigger: 'blur'
              }]
            },
            {
              label: '亲属关系',
              prop: 'familyRelate',
              rules: [{
                required: true,
                message: '请输入亲属关系',
                trigger: 'blur'
              }]
            },
            {
              label: '工作单位或住址',
              prop: 'familyWorkCompany',
              rules: [{
                required: false,
                message: '请输入工作单位或住址',
                trigger: 'blur'
              },
              {
                min: 2,
                max: 50,
                message: '工作单位或住址长度在2到50个字符'
              }]
            },
            {
              label: '联系电话',
              prop: 'familyPhone',
              rules: [{
                required: false,
                message: '请输入联系电话',
                trigger: 'blur'
              },
              {
                min: 2,
                max: 20,
                message: '联系电话长度在2到20个字符'
              }]
            }
          ]
        }
      }
    ]
  },
  {
    label: '技能信息',
    // prop: 'skillsInfo',
    // icon: 'el-icon-goods',
    column: [
      {
        prop: 'skillsList',
        type: 'dynamic',
        span: 24,
        children: {
          align: 'center',
          type: 'form',
          index: false,
          labelWidth: 120,
          headerAlign: 'center',
          rowAdd: (done) => {
            // this.$message.success('新增技能信息');
            done({
            })
          },
          rowDel: (row, done) => {
            // this.$message.success('删除技能信息'+JSON.stringify(row));
            done()
          },
          column: [
            {
              label: '证书类型',
              type: 'tree',
              dicUrl: '/api/blade-system/dict-biz/dictionary?code=skills',
              props: {
                label: 'dictValue',
                value: 'dictKey'
              },
              dataType: 'number',
              slot: true,
              prop: 'skillsType',
              value: 1,
              rules: [{
                required: true,
                message: '请选择证书类型',
                trigger: 'blur'
              }]
            },
            {
              label: '证书名称',
              prop: 'skillsName',
              rules: [{
                required: false,
                message: '请输入证书名称',
                trigger: 'blur'
              },
              {
                min: 2,
                max: 20,
                message: '证书名称长度在2到20个字符'
              }]
            },
            {
              label: '证书编号',
              prop: 'certificateNum',
              rules: [{
                required: true,
                message: '请输入证书编号',
                trigger: 'blur'
              },
              {
                min: 2,
                max: 20,
                message: '证书编号长度在2到20个字符'
              }]
            }
          ]
        }
      }
    ]
  },
  {
    label: '其他',
    // prop: 'otherInfo',
    // icon: 'el-icon-goods',
    column: [
      {
        label: '招聘渠道',
        prop: 'recruitmentChannel',
        rules: [{
          required: false,
          message: '请输入招聘渠道',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '招聘渠道长度在2到20个字符'
        }]
      },
      {
        label: '福利缴纳地',
        prop: 'welfareAddress',
        rules: [{
          required: false,
          message: '请输入福利缴纳地',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '福利缴纳地长度在2到20个字符'
        }]
      },
      {
        label: '是否与本公司签订有知识产权相关的《保密协议》？',
        prop: 'ifSignSecrecy',
        labelWidth: 370,
        type: 'switch',
        span: 24,
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否签订',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否与本公司签订有知识产权相关的《竞业限制协议》？',
        prop: 'ifSignBusinessLimit',
        labelWidth: 400,
        type: 'switch',
        span: 24,
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否签订',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否与上一家签订有知识产权相关的《保密协议》？',
        prop: 'formerIfSignSecrecy',
        labelWidth: 370,
        type: 'switch',
        span: 24,
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否签订',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否与上一家签订有知识产权相关的《竞业限制协议》？',
        prop: 'formerIfSignBusinessLimit',
        labelWidth: 400,
        type: 'switch',
        span: 24,
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否签订',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否封存',
        prop: 'status',
        type: 'switch',
        align: 'center',
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: true,
            message: '请选择封存',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否核心人才',
        prop: 'ifCoreTalent',
        type: 'switch',
        align: 'center',
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否核心人才',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否发车补',
        prop: 'ifSendCarAllowance',
        type: 'switch',
        align: 'center',
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否发车补',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否发餐补',
        prop: 'ifSendMealAllowance',
        type: 'switch',
        align: 'center',
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否发餐补',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否工会会员',
        prop: 'ifUnionMember',
        type: 'switch',
        align: 'center',
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否工会会员',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '是否发放区域补贴',
        prop: 'ifSendRegionalAllowance',
        type: 'switch',
        align: 'center',
        dicData: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ],
        value: 0,
        slot: true,
        rules: [
          {
            required: false,
            message: '请选择是否发放区域补贴',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '人员备注',
        prop: 'personRemark',
        span: 24,
        type: 'textarea',
        rules: [{
          required: false,
          message: '请输入人员备注',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 50,
          message: '人员备注长度在2到50个字符'
        }]
      }
    ]
  }
]
