<template>
  <div
    class="BaseButton md:cursor-pointer transition-all xl:px-16 xl:py-4 lg:px-12 lg:py-3 px-8 py-2 rounded-full hover:scale-95"
    :style="{ backgroundColor, padding: text ? padding : '16px', margin }"
    @click="$emit('onClick')"
  >
    <div class="flex items-center justify-center h-full">
      <BaseIcon
        v-if="rightIconName"
        :name="rightIconName"
        :color="color"
        :backgroundColor="backgroundIconColor"
        size="30px"
      />
      <h3
        v-if="text"
        class="text-button"
        :class="{ 'mx-4': leftIconName || rightIconName }"
        :style="{ color }"
      >
        {{ text }}
      </h3>
      <BaseIcon
        v-if="leftIconName"
        :name="leftIconName"
        :color="color"
        :backgroundColor="backgroundIconColor"
        size="30px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: String,
  leftIconName: String,
  rightIconName: String,
  color: {
    type: String,
    default: "var(--color-slate-900)",
  },
  backgroundColor: {
    type: String,
    default: "var(--color-blue-300)",
  },
  backgroundIconColor: {
    type: String,
    default: "var(--color-slate-900)",
  },
  padding: {
    type: String,
    default: "8px 16px",
  },
  margin: {
    type: String,
    default: "0px",
  },
});

const emits = defineEmits(["onClick"]);
</script>
