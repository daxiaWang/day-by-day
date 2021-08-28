import { getData, postForm, deleteForm } from "@/api/product";
import { NcapTable, NcapPagination } from "@/components/index";
import { debounce } from "@/utils/utils"
export default {
    components: {
        NcapTable,
        NcapPagination
    },
    data() {
        return {
            isShow: false,
            dialogTitle: "新增",
            tableData: [],
            pages: {
                current: 1,
                size: 10,
                pageSizes: [10, 20, 50, 100],
                total: 0
            },
            loading: false,
            popVisib: false,
            selectListAll: [], //table列表所选数据
            editForm: {},
            currentType: "" //记录当前页面类型
        }
    },
    computed: {
        isDelete() {
            return this.selectListAll.length === 0 ? true : false;
        },
        isEdit() {
            return this.selectListAll.length === 1 ? false : true;
        }
    },

    methods: {
        getList(type) {
            this.currentType = type
            const params = {
                current: this.pages.current,
                size: this.pages.size,
            };
            this.loading = true
            getData(`${type}D`, params).then((res) => {
                if (res.code === 0) {
                    const { data } = res;
                    this.tableData = data.records;
                    this.pages.total = data.total;
                    this.$notify({
                        type: 'success',
                        message: '查询成功',
                        position: 'bottom-right'
                    });
                } else {
                    this.$message.fail(res.message);
                }
            }).finally(() => {
                this.loading = false
            });
        },
        resetPage() {
            this.pages.current = 1;
            this.getList(this.currentType);
        },
        /*翻页*/
        handleSizeChange(val) {
            this.pages.size = val;
            this.resetPage();
        },
        handleCurrentChange(val) {
            this.pages.current = val;
            this.getList(this.currentType);
        },
        selectionChange(row) {
            this.selectListAll = row;
        },
        addModule(type) {
            this.isShow = true;
            this.dialogTitle = type === "add" ? "新增" : "编辑";
            this.editForm =
                type === "add" ?
                this.addForm :
                this.selectListAll[0];
        },
        submitForm1(type, data) {
            postForm(type, data).then((res) => {
                if (res.code === 0) {
                    this.$notify({
                        type: 'success',
                        message: `${this.dialogTitle}成功`,
                        position: 'bottom-right'
                    });
                    this.isShow = false;
                    this.resetPage();
                } else {
                    this.$message.fail(res.message);
                }
            });
        },
        submitForm: debounce(
            function(type, data) {
                this.submitForm1(type, data)
            },
            2000,
            true
        ),
        cancelForm() {
            this.isShow = false;
        },
        deleteRow(type) {
            const deleteArr = this.selectListAll.map(item => item.id).join()
            const params = {
                id: deleteArr
            }
            deleteForm(type, params).then(res => {
                if (res.code === 0) {
                    this.$notify({
                        type: 'success',
                        message: '删除成功',
                        position: 'bottom-right'
                    });
                    this.popVisib = false
                    this.resetPage()
                } else {
                    this.$message.fail(res.message);
                }
            })
        }
    },
}