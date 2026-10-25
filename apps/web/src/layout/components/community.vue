<script lang="ts" setup>
import WaterFall from "@/components/WaterFall.vue";
import { ref } from "vue";
import { RandomColor } from "@/utils/RandomColor.ts";
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createTextAnimation } from "@/utils/createAnimation.ts";
import { getWaterfullList } from "@/api/layout/index.ts";
import type { cardListType, waterfulListType } from "@/types/layout";
import { ideaItems } from "@/data/siteContent";
import avatarSvg from "../../assets/images/avatar.svg";

gsap.registerPlugin(ScrollTrigger);

const cardList = ref<cardListType[]>([
  {
    id: 1,
    username: "灵犀造物 · 馆方运营",
    content:
      "我们把馆藏纹样转译成“冰箱贴 + 旋转结构”的组合件，Lingxi Forge 的可制造优化帮我们一次就过了切片检查。树脂打印出来细节非常清晰，打样周期从 2 周压到 3 天。",
    img: ideaItems[0]?.cover,
  },
  {
    id: 2,
    username: "Mika",
    content:
      "Lingxi Forge の提示詞テンプレートに「器型 + 紋様 + 材質」を入れると、文創っぽい雰囲気が一気に出ました。分割パーツも提案してくれるので、後処理が楽になりました。",
    img: ideaItems[1]?.cover,
  },
  {
    id: 3,
    username: "Pierre",
    content:
      "J’ai utilisé Lingxi Forge pour créer un petit objet décoratif. Le guide d’épaisseur et les corrections de maillage m’ont évité les erreurs de non-manifold. Résultat: impression plus propre et moins de supports.",
    img: ideaItems[2]?.cover,
  },
  {
    id: 4,
    username: "Aria",
    content:
      "The best part is the workflow: concept image → multi-view → printable mesh. I export GLB for review, then STL for printing. The iteration loop feels fast and predictable.",
    img: ideaItems[3]?.cover,
  },
  {
    id: 5,
    username: "木棉设计",
    content:
      "我们在上新前会用“基础生成”快速铺一轮方案，再用“中精度生成”做结构加厚和表面细节。这样既省次数，又能保证最后的成品率。",
    img: ideaItems[4]?.cover,
  },
  {
    id: 6,
    username: "Noah",
    content:
      "I like that Lingxi Forge nudges you toward manufacturable constraints (wall thickness, overhangs). It’s not just a pretty mesh; it’s something you can actually print.",
    img: ideaItems[5]?.cover,
  },
  {
    id: 7,
    username: "韩月 · 教育产品",
    content:
      "我们做“古建斗拱积木”这类模块化产品，最怕结构对不上。Lingxi Forge 的分件与卡扣建议很好用，打印后装配顺畅，适合教学场景。",
    img: ideaItems[6]?.cover,
  },
  {
    id: 8,
    username: "Sato",
    content:
      "細かいパーツは樹脂、強度が欲しい部分はナイロンで…と材質の選び方のメモが役に立ちました。試作から量産の見通しが立てやすいです。",
    img: ideaItems[7]?.cover,
  },
  {
    id: 9,
    username: "Léa",
    content:
      "La partie conformité est un vrai plus: garder une trace des sources d’inspiration, des autorisations et des variantes aide beaucoup quand on travaille avec des IP culturelles.",
    img: ideaItems[8]?.cover,
  },
  {
    id: 10,
    username: "Kian",
    content:
      "从“看起来像”到“能落地卖”，最关键就是可制造与履约。Lingxi Forge 的建议让我们少走了很多弯路，尤其是小件的支撑与厚度策略。",
    img: ideaItems[9]?.cover,
  },
]);

const list = ref<HTMLElement>(
  document.querySelector(".card-container ul") as HTMLElement
);

const waterfulList = ref<waterfulListType[]>([]);

onMounted(async () => {
  gsap.delayedCall(0.1, () => ScrollTrigger.refresh());
  createTextAnimation(".community-title h1", "y", -300, 40, -20);
  createTextAnimation(".community-title p", "x", 200, 40, -15);

  const fallback = ideaItems.slice(0, 12).map((i) => ({
    cover: i.cover,
    avatar: i.avatar,
    username: i.username,
    shelfDate: i.shelfDate,
  }));
  try {
    const res = await getWaterfullList();
    waterfulList.value = res.data?.length ? res.data : fallback;
  } catch {
    waterfulList.value = fallback;
  }
});
</script>
<template>
  <div class="container">
    <header class="community-title">
      <h1>加入Lingxi Forge社区，与全球创意人士一同探索、创造与分享</h1>
      <p>
        &emsp;&emsp;Lingxi Forge不仅仅是一家技术创新公司。我们还拥有一个充满活力和创造力的在线社区。在这里，用户可以分享自己的创意项目，获取反馈，与其他创作者交流灵感和技巧。我们的社区是一个支持和鼓励每位成员将其艺术和技术梦想变为现实的平台。
      </p>
    </header>
    <div class="waterfall-box">
      <water-fall style="background: var(--background)" :list="waterfulList">
        <template #layoutPart="{ $avatar, $username, $shelfDate }">
          <footer class="waterfall-item">
            <div class="left">
              <img :src="$avatar" :alt="`${$username} 头像`" loading="lazy" decoding="async" />
            </div>
            <div class="right">
              <h4 class="text">{{ $username }}</h4>
              <p>{{ $shelfDate }}</p>
            </div>
          </footer>
        </template>
      </water-fall>
    </div>

    <!--    card-->
    <div class="card-container">
      <ul ref="list" :style="{ '--width': '400px', '--quantity': cardList.length }">
        <li v-for="i in cardList" :key="i.id" :style="{ '--background-color': RandomColor(), '--position': i.id }">
          <header>
            <img :src="avatarSvg" :alt="`${i.username} 头像`" loading="lazy" decoding="async" />
            <span>{{ i.username }}</span>
          </header>
          <p>{{ i.content }}</p>
          <footer>
            <img :src="i.img" :alt="`${i.username} 评价配图`" loading="lazy" decoding="async" />
          </footer>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/layout/components/community.scss";
</style>
