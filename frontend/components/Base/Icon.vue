<template>
  <div
    class="BaseIcon aspect-square"
    :style="{
      backgroundColor,
      borderRadius,
      width: size,
      height: size,
      padding,
    }"
    @click="emits('onClick')"
  >
    <div
      class="icon w-full h-full"
      :class="{ 'icon-hover': cursorPointer }"
      :style="[
        { '-webkit-mask': `url(/_nuxt/assets/icons/${name}.svg)` },
        { mask: `url(/_nuxt/assets/icons/${name}.svg)` },
        { backgroundColor: color },
      ]"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: String,
  size: { type: String, default: "115px" },
  color: { type: String, default: "var(--color-blue-300)" },
  backgroundColor: { type: String, default: "none" },
  borderRadius: { type: String, default: "50%" },
  cursorPointer: { type: Boolean, default: false },
  padding: { type: String, default: "1px" },
});

const emits = defineEmits(["onClick"]);
</script>

<style scoped>
.icon {
  background-size: cover;
  mask-repeat: no-repeat !important;
}
</style>
