<template>
  <div class="index-container">
    <!--搜索-->
    <search />
    <div class="index-wrap">
      <!--常用应用-->
      <common-apply @add="comboBoxShow = true" />
      <!--全部应用-->
      <apply :apply-list="applyList" />
      <perfect :dialogFormVisible="dialogFormVisible" />
      <combo-box @close="comboBoxShow = false" :apply-list="applyList" :pop-show="comboBoxShow" />
    </div>
  </div>
</template>

<script>
import Search from "./components/search";
import Apply from "./components/apply";
import CommonApply from "./components/common-apply";
import Perfect from "./components/perfect";
import { getUserinfo } from "@/api/user";

export default {
  name: "Index",
  data() {
    return {
      comboBoxShow: false,
      applyList: [
        {
          url: "/apps/payroll",
          icon: "payroll",
          name: "公司工资薪资表"
        },
        {
          url: "/apps/payroll",
          icon: "client",
          name: "产品系统"
        },
        {
          url: "/apps/order",
          icon: "collect",
          name: "订单汇总"
        },
        {
          url: "/material",
          icon: "namematerial",
          name: "材料名称表"
        },
        {
          url: "/apps/order_admin",
          icon: "collect",
          name: "订单管理"
        },
         {
          url: "/apps/customer_index",
          icon: "collect",
          name: "客户管理"
        },
         {
          url: "/apps/material_admin",
          icon: "collect",
          name: "材料管理"
        },
         {
          url: "/apps/consumption_index",
          icon: "collect",
          name: "单耗管理"
        },
         {
          url: "/apps/materialSupplier_index",
          icon: "collect",
          name: "材料供应商"
        },
         {
          url: "/apps/machining_index",
          icon: "collect",
          name: "外加工厂"
        },
         {
          url: "/apps/logisticsSupplier_index",
          icon: "collect",
          name: "物流供应商"
        },
         {
          url: "/apps/contractFiling_index",
          icon: "collect",
          name: "合同备案"
        },
      ],
      company_id: null,
      dialogFormVisible: false
    };
  },

  created() {
    // this.fetchUserInfo();
    const company_id = localStorage.getItem("company_id");
    if (company_id) {
      // 从企业列表选择企业登录会有
      this.company_id = company_id;
    }
    console.log("id", this.company_id);

    const registerEnterprise = this.$route.query.registerEnterprise;
    if (registerEnterprise) {
      // 从创建企业页面进来会有
      this.dialogFormVisible = true;
    }
  },
  methods: {
    // 获取用户信息
    // async fetchUserInfo() {
    //   const uesr_id = localStorage.getItem("user_id");
    //   // const res = await getUserinfo(uesr_id);
    //   const res = await getUserinfo(14);  // test
    //   this.$store.commit("user/setUserinfo", {
    //     userinfo: res.data
    //   });
    //   localStorage.setItem('userinfo', JSON.stringify(res.data))
    //   console.log("getUserInfo", res);
    // }
  },
  components: {
    Search,
    Apply,
    CommonApply,
    Perfect
  }
};
</script>

<style lang="scss">
.index {
  &-wrap {
    padding: 51px;
  }
}
.apply-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
