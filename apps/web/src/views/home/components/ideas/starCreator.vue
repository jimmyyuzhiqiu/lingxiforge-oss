<script setup lang="ts">
import IdeasList from "./IdeasList.vue";

const props = defineProps<{ keyword?: string }>();
</script>

<template>
  <IdeasList typeKey="star" :keyword="props.keyword" />
</template>

