<template>
  <div class="detail-approver">
    <custom-header title="审批信息" />
    <div class="approver-info">
      <div>
        <span class="label">审批编号</span>
        <span>6468455656151</span>
      </div>
      <div>
        <span class="label">发起人</span>
        <span>王力宏</span>
      </div>
      <div>
        <span class="label">所在部门</span>
        <span>技术部</span>
      </div>
      <div>
        <span class="label">发起时间</span>
        <span>2018年6月20日 18:44:50</span>
      </div>
    </div>
    <custom-header title="会签" desc="(须所有审批人同意)" />
    <approver :approver-data="data" :copy-data="copyData" :in-turn="true" />
  </div>
</template>

<script>
export default {
  name: 'DetailApprover',
  components: {
    'custom-header': {
      props: ['title', 'desc'],
      template: `
        <div class="custom-header">
          <span>{{ title }}</span>
          <span v-if="desc">{{ desc }}</span>
        </div>
      `
    },
    approver: {
      props: ['approverData', 'copyData', 'inTurn'],
      methods: {
        classList(isLast, inTurn, status) {
          return {
            is_last: isLast,
            in_turn: inTurn,
            pass: !!status
          }
        }
      },
      template: `
        <div class="approver">
          <div class="approver-item" v-for="(item, index) of approverData" :key="index" :class="classList(index === approverData.length - 1, inTurn, item.status)">
            <div v-if="!item.status" class="index">{{ index + 1 }}</div>
            <div v-else class="index"><i class="el-icon-check" /></div>
            <div class="approver-header">
              <p class="title">{{ item.status ? '审批通过' : '审批中' }}</p>
              <p class="time">审批时间：{{ item.time }}</p>
            </div>
            <div class="approver-container">
              <div>
                <div class="label">审批人：</div>
                <div class="admins">
                  <template v-for="(admin, adminIndex) of item.admin">
                    <span v-if="adminIndex > 0">或</span>
                    <div class="admin">
                      <zx-name :name="admin.name" />
                    </div>
                  </template>
                </div>
              </div>
              <div>
                <span class="label">审批意见：</span>{{ item.desc }}
              </div>
            </div>
          </div>
          <div class="copy">
            <span>抄送人</span>
            <div class="admins">
              <div v-for="(admin, adminIndex) of copyData" class="admin">
                <zx-name :name="admin.name" />
              </div>
            </div>
          </div>
        </div>
      `
    }
  },
  data: () => ({
    data: [
      {
        status: 1,
        admin: [
          {
            name: '林心如'
          }
        ],
        desc: '通过',
        time: '2018年6月20日  18:44:30'
      },
      {
        status: 0,
        admin: [
          {
            name: '林心如'
          },
          {
            name: '林心如'
          }
        ],
        desc: '通过',
        time: '2018年6月20日  18:44:30'
      }
    ],
    copyData: [
      {
        name: '林心如'
      },
      {
        name: '林心如'
      }
    ]
  })
}
</script>
<style lang="scss" scoped>
.detail-approver {
  padding: 0 65px;
  .approver-info {
    font-size: 0;
    padding: 0 100px;
    > div {
      font-size: 19px;
      display: inline-block;
      width: 50%;
      .label {
        color: #606266;
        display: inline-block;
        width: 120px;
      }
      &:nth-child(n + 3) {
        margin-top: 43px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.custom-header {
  font-size: 21px;
  padding-bottom: 11px;
  margin: 41px 0;
  border-bottom: 3px solid #eeeeee;
  >>> span {
    position: relative;
    display: inline-block;
    &:first-child:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      bottom: -14px;
      left: 0;
      background-color: #cccccc;
    }
    & + span {
      margin-left: 13px;
      color: #999999;
      font-size: 19px;
    }
  }
}
</style>
<style lang="scss" scoped>
>>> .approver {
  font-size: 19px;
  &- {
    &item {
      margin-top: 40px;
      width: 100%;
      height: 247px;
      border: 1px solid rgba(220, 220, 220, 1);
      > div:not(.index) {
        padding: 0 21px;
      }
      .index {
        display: none;
      }
      &.in_turn {
        position: relative;
        margin-left: 60px;
        width: calc(100% - 60px);
        .index {
          display: block;
          width: 29px;
          height: 29px;
          line-height: 29px;
          border-radius: 50%;
          text-align: center;
          font-size: 16px;
          color: #999999;
          background: rgba(255, 255, 255, 1);
          border: 3px solid rgba(232, 233, 238, 1);
          position: absolute;
          top: 19px;
          left: -61px;
        }
        &:not(.is_last)::after {
          content: '';
          width: 3px;
          height: 260px;
          background: rgba(232, 233, 238, 1);
          position: absolute;
          top: 47px;
          left: -47px;
        }
        &.pass .index {
          border-color: #409eff;
          background: #409eff;
          color: #ffffff;
        }
        &.pass::after {
          background: #c5e1ff;
        }
      }
      &.pass .title {
        color: #409eff;
      }
    }
    &header {
      height: 67px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(247, 247, 247, 1);

      .time {
        color: #999999;
      }
    }
    &container {
      padding: 13px 21px !important;
      > div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding-bottom: 50px;
      }
      .label {
        color: #666666;
      }
    }
  }
  .admins {
    display: flex;
    align-items: center;
    span {
      padding: 0 21px;
      color: #a0a9c0;
    }
    .admin {
      width: 187px;
      height: 53px;
      background: rgba(247, 247, 247, 1);
      border-radius: 5px;
      display: flex;
      align-items: center;
      padding-left: 22px;
      >>> .zx-name {
        font-size: 19px;
      }
    }
  }
  .copy {
    margin-top: 40px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      padding-right: 60px;
      color: #999999;
    }
    .admin:nth-child(n+2) {
      margin-left: 13px;
    }
  }
}
</style>