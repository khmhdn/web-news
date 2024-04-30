<template>
  <div
    :style="{
      backgroundImage: `url(/_nuxt/assets/images/bg.webp)`,
      backgroundPosition: 'fixed',
    }"
    class="w-full h-screen flex items-center p-4 overflow-x-hidden"
  >
    <div
      class="container bg-slate-900 rounded-[40px] m-auto p-4 sm:p-[60px] animate__animated animate__fadeIn"
    >
      <slot></slot>
    </div>
  </div>
</template>
