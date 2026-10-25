<script setup lang="ts">
import { ref } from "vue";
import type { formType, optionListResponseType } from "@/types/workbench";
import { regionData } from "element-china-area-data";

const emit = defineEmits();
const props = defineProps(["isSettingSmallScreen"]);

const handleToggleSetting = () => {
  emit("toggle-setting", !props.isSettingSmallScreen);
};

//选项部分

//打印材质数组
const settingMaterialList = ref<optionListResponseType[]>([
  {
    id: 0,
    title: "打印材质",
    radioValue: "1",
    operationList: [
      { id: 0, operationTitle: "树脂" },
      { id: 1, operationTitle: "PLA" },
      { id: 2, operationTitle: "ABS" },
      { id: 3, operationTitle: "PETG" },
      { id: 4, operationTitle: "TPU" },
      { id: 5, operationTitle: "PET" },
      { id: 6, operationTitle: "PEEK" },
    ],
  },
  {
    id: 1,
    title: "打印尺寸",
    radioValue: "1",
    operationList: [
      { id: 0, operationTitle: "小" },
      { id: 1, operationTitle: "中" },
      { id: 2, operationTitle: "大" },
    ],
  },
  {
    id: 2,
    title: "打印密目",
    radioValue: "1",
    operationList: [
      { id: 0, operationTitle: "小" },
      { id: 1, operationTitle: "中" },
      { id: 2, operationTitle: "大" },
    ],
  },
]);

//快递表单
const form = ref<formType>({
  name: "",
  phone: "",
  region: "",
  detail: "",
  isAnonymity: false,
  courierCompanies: "",
  remark: "",
});

const onSubmit = () => {
  console.log(form.value);
};
</script>

<template>
  <div class="setting-container">
    <section>
      <header class="big" ref="headerRef">
        <ul>
          <li class="left">
            <i :class="props.isSettingSmallScreen
              ? 'iconfont icon-zhankai-right'
              : 'iconfont icon-zhedie-right'
              " @click="handleToggleSetting"></i>
          </li>
          <li class="center">
            <i class="iconfont icon-dayinshezhi"></i>
            <span>打印设置</span>
          </li>
          <li class="right"></li>
        </ul>
      </header>
    </section>
    <el-scrollbar max-height="calc(100vh - 110px)">
      <section class="main" v-if="!props.isSettingSmallScreen">
        <!--        打印选项-->
        <section class="setting-view-container" v-for="item in settingMaterialList" :key="item.id">
          <p>{{ item.title }}</p>
          <el-radio-group v-model="item.radioValue">
            <el-radio v-for="(radioItem, radioIndex) in item.operationList" :key="radioItem.id"
              :value="`${radioIndex + 1}`" border>
              {{ radioItem.operationTitle }}
            </el-radio>
          </el-radio-group>
        </section>
        <!--        联系方式-->
        <section class="contact-container">
          <p>收件表单</p>
          <el-form :model="form">
            <el-form-item label="姓名">
              <el-input v-model="form.name" placeholder="请填写姓名" />
            </el-form-item>
            <el-form-item label="联系方式">
              <el-input v-model="form.phone" type="number" placeholder="请填写电话联系方式" />
            </el-form-item>
            <el-form-item label="收件地址">
              <el-cascader class="cascader-container" size="default" placeholder="请选择地区" :options="regionData" clearable
                v-model="form.region">
              </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input v-model="form.detail" placeholder="请填写详细的家庭地址" />
            </el-form-item>
            <el-form-item label="匿名">
              <el-switch v-model="form.isAnonymity" />
            </el-form-item>
            <el-form-item label="快递公司">
              <el-radio-group v-model="form.courierCompanies">
                <el-radio value="0">邮政EMS</el-radio>
                <el-radio value="1">顺丰</el-radio>
                <el-radio value="2">圆通</el-radio>
                <el-radio value="3">申通</el-radio>
                <el-radio value="4">韵达</el-radio>
                <el-radio value="5">汇通</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" />
            </el-form-item>
            <div style="display: flex; justify-content: center">
              <el-button type="primary" @click="onSubmit">确定</el-button>
            </div>
          </el-form>
        </section>
      </section>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/workbench/components/3DPrinting/setting";
</style>
