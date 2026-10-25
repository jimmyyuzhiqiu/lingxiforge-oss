<script setup lang="ts">
const items = [
  {
    q: "你们是做“模型生成”还是做“文创落地”？",
    a: "我们更关注“可交付”。生成只是第一步，后续还需要可制造优化、质检标准与履约对接，才能真正变成能卖的产品。",
  },
  {
    q: "只用网页也能看 3D 吗？",
    a: "可以。推荐交付 GLB（glTF）用于网页端实时展示，支持旋转、缩放与细节观察；打印则使用 STL。",
  },
  {
    q: "如何保证打印成功率？",
    a: "通过壁厚/支撑/拆件建议、网格修复与 print-ready 检查清单，把问题前置在生成阶段，减少打样返工。",
  },
  {
    q: "IP 合规怎么做？会不会侵权？",
    a: "在流程里建立授权范围、溯源留档与下架/投诉机制。对外展示与商业履约的边界不同，我们会按场景给出建议。",
  },
  {
    q: "你们可以对接我们的制造供应链吗？",
    a: "可以。我们提供标准化交付包与质检清单，便于对接自有工厂或外部工坊，降低沟通与返工成本。",
  },
  {
    q: "上线后内容如何持续维护？",
    a: "用可复用模块来维护：教程、案例、质量标准、合规流程做成可更新内容资产，而不是一次性堆文案。",
  },
];
</script>

<template>
  <section class="section container" id="faq" aria-labelledby="faq-title">
    <header class="head">
      <h2 id="faq-title">常见问题</h2>
      <p class="desc">
        你关心的核心问题，我们用可落地的流程语言回答。需要更具体的合作边界与交付清单，可以直接申请演示。
      </p>
    </header>

    <div class="wrap glass-card">
      <el-collapse accordion>
        <el-collapse-item v-for="item in items" :key="item.q" :title="item.q">
          <div class="answer">{{ item.a }}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </section>
</template>

<style scoped lang="scss">
.head {
  display: grid;
  gap: 10px;
  margin-bottom: 12px;
}

h2 {
  margin: 0;
}

.desc {
  margin: 0;
  color: var(--font-color2);
  line-height: 1.7;
  max-width: 76ch;
}

.wrap {
  padding: 12px;
}

.answer {
  color: var(--font-color2);
  line-height: 1.7;
  font-size: 13px;
}
</style>
