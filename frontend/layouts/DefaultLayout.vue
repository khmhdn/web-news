<template>
  <div
    :style="{
      backgroundImage: `url(/_nuxt/assets/images/bg.webp)`,
      backgroundPosition: 'fixed',
    }"
    class="w-full p-4 overflow-x-hidden"
  >
    <div class="container rounded-[40px] m-auto p-4 sm:p-[60px] sm:pt-8">
      <LayoutTheHeader />
      <div
        class="overflow-y-scroll main animate__animated animate__fadeIn mt-4 scrollbar-hide"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>
