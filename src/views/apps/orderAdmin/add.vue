<template>
  <div class="container">
    <div class="filter block">
      <el-form inline label-width="107px">
        <el-form-item label="订单状态">
          <el-select v-model="value">
            <el-option value="1">1</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户订单号码">
          <el-input v-model="value" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="业务来源">
          <el-select v-model="value">
            <el-option value="1">1</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户代码">
          <el-input v-model="value" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="value" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="工厂订单号码">
          <el-input v-model="value" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="交货日期">
          <el-date-picker v-model="value" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="交货地点">
          <el-input v-model="value" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="价格条件">
          <el-select v-model="value">
            <el-option value="1">1</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="付款条件">
          <el-select v-model="value">
            <el-option value="1">1</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="货币类别">
          <el-select v-model="value">
            <el-option value="1">1</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合计金额(¥)">
          <el-input v-model="vlaue" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="合计数量">
          <el-input v-model="vlaue" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input v-model="vlaue" placeholder="请输入内容" style="width: 1125px"></el-input>
        </el-form-item>

        <el-form-item label="业务部门">
          <el-select v-model="value">
            <el-option value="1">1</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务人员">
          <el-select v-model="value">
            <el-option value="1">1</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="建档人员">
          <el-select v-model="value">
            <el-option value="1">1</el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="block">
      <el-tabs type="border-card">
        <el-tab-pane class="product" label="产品">
          <div class="product-title">
            <div>
              产品信息
              <span>合计{{ tableData.length }}项</span>
            </div>
            <div class="buttons">
              <el-button>
                <svg-icon icon-class="button_delete" />批量删除
              </el-button>
              <el-button type="primary" @click="addDefData">
                <svg-icon icon-class="custom_add" />增加产品
              </el-button>
            </div>
          </div>
          <div class="table_container">
            <el-table :data="tableData" :border="true" style="width: 100%">
              <el-table-column
                v-for="(value, key, index) in keyName"
                :key="index"
                :label="keyName[key]"
                :prop="key"
                width="160"
              >
                <template slot-scope="scope">
                  <product-img v-if="key === 'image'" v-model="scope.row[key]" />
                  <table-input v-else v-model="scope.row[key]" />
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="165">
                <template slot-scope="scope">
                  <el-link type="primary" @click="detailShow = true">查看</el-link>
                  <el-link type="primary" @click="tableData.splice(scope.$index, 1)">删除</el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="isApprover" class="buttons">
            <el-button type="primary" @click="handlePass">提交</el-button>
            <el-button type="plain">暂存</el-button>
          </div>
          <el-dialog title="产品详情" :visible.sync="detailShow">
            <product-detail />
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="审批信息">
          <approver />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import ProductImg from './components/productImg'
import ProductDetail from './components/productDetail'
import TableInput from './components/tableInput'
import Approver from './components/approver'
export default {
  name: 'Add',
  components: { ProductImg, ProductDetail, TableInput, Approver },
  data() {
    return {
      msgInput: '',
      isApprover: true,
      value: '',
      detailShow: false,
      tableData: [],
      keyName: {
        image: '图片',
        custom_goods_num: '客户货号',
        style_name: '款式名称',
        size: '尺码规格',
        colour_name: '配色名称',
        colour_code: '配色代码',
        factory_goods_num: '工厂货号',
        unit: '计量单位',
        number: '数量',
        single_price: '单价',
        money: '金额',
        remark: '备注'
      }
    }
  },
  mounted() {
    this.addDefData()
  },
  methods: {
    addDefData() {
      const length = this.tableData.length
      if (length && Object.values(this.tableData[length - 1]).some(e => !e)) {
        this.$message({
          message: '请您填写完整后再添加产品'
        })
        return
      }
      const e = this.$api.resteObj({ ...this.keyName })
      e.image = []
      this.tableData.push(e)
    },
    handlePass() {
      this.$msgbox({
        title: '提示',
        message: (
          <div>
            <div>
              <svg-icon
                icon-class="stop"
                style="margin-right: 12px; font-size: 22px;vertical-align: middle"
              />
              <span>确认通过该文件的审批，是否继续？</span>
            </div>
            <div>
              <p style="margin-top: 20px;margin-bottom: 7px">审批意见</p>
              <textarea
                autofocus
                class="msg_input"
                vModel={this.msgInput}
              ></textarea>
            </div>
          </div>
        ),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            console.log(this.msgInput)
            this.msgInput = ''
            done()
          } else {
            this.msgInput = ''
            done()
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './static.scss';
.msg_input {
  width: 100%;
  height: 133px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  resize: none;
  transition: all 0.2s;
  &:focus {
    border-color: rgba(25, 137, 250, 1);
  }
}
.container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  .block {
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    overflow: hidden;
    &:nth-child(n + 2) {
      margin-top: 15px;
    }
    >>> .el-tabs {
      box-shadow: none;
      border: none;
    }
    .buttons {
      display: flex;
      justify-content: center;
      margin-top: 68px;
      padding-bottom: 25px;
      >>> .el-button {
        width: 120px;
        & + .el-button {
          margin-left: 40px;
        }
      }
    }
    .product {
      &-title {
        line-height: 80px;
        font-size: 21px;
        background: rgba(247, 247, 247, 1);
        padding: 0 20px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          color: #ff5a5a;
          font-size: 19px;
          margin-left: 28px;
        }
        .buttons {
          padding: 0;
          margin: 0;
          >>> .el-button {
            width: auto;
            & + .el-button {
              margin-left: 20px;
            }
          }
        }
      }
    }
    .table-input {
      height: 73px;
    }
    >>> .el-dialog {
      width: 848px;
      &__header {
        padding: 0 27px;
        line-height: 67px;
        background: rgba(243, 243, 243, 1);
        border-radius: 5px 5px 0px 0px;
      }
      &__body {
        padding: 27px 32px;
      }
    }
  }
}
</style>
