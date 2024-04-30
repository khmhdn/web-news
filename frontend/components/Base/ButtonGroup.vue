<template>
  <div className="BaseButtonGroup flex">
    <BaseButton
      :text="leftButtonText"
      class="z-10"
      margin="0 -48px 0 0"
      padding="12px 20px"
      @on-click="emits('onLefttButtonClick')"
    />
    <BaseButton
      :text="rightButtonText"
      color="var(--color-blue-300)"
      backgroundColor="var(--color-slate-900)"
      padding="12px 20px 12px 64px"
      @on-click="emits('onRightButtonClick')"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  leftButtonText: {
    type: String,
    required: true,
  },
  rightButtonText: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["onRightButtonClick", "onLefttButtonClick"]);
</script>
