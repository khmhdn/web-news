<template>
  <div class="TextInput flex flex-col">
    <h3 v-if="title" class="mb-3 ml-6 font-m">{{ title }}</h3>
    <div class="relative">
      <input
        :class="`dir-ltr w-full text-base sm:text-xl lg:text-2xl p-2 px-3 sm:px-6 sm:p-4 bg-transparent border-2 outline-none border-blue-300 focus:border-blue-400 hover:border-blue-400 peer font-m rounded-full
        ${errorMessage && 'border-red-500'}
        ${succeedMessage && 'border-emerald-500'}
        ${disabled && 'hover:cursor-not-allowed'}`"
        v-model="inputValue"
        :id="inputName"
        :name="inputName"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        autoComplete="off"
      />
      <BaseIcon
        v-if="succeedMessage"
        name="check"
        color="var(--color-emerald-500)"
        size="30px"
        border-radius="50%"
        class="absolute right-3 sm:right-6 top-1/2 -translate-y-[50%] ml-1 sm:ml-[6px] lg:ml-2"
      />
      <BaseIcon
        v-if="errorMessage"
        name="close"
        color="var(--color-red-500)"
        size="30px"
        border-radius="50%"
        class="absolute right-3 sm:right-6 top-1/2 -translate-y-[50%] ml-1 sm:ml-[6px] lg:ml-2"
      />
    </div>
    <h6 v-if="errorMessage" class="mt-2 ml-6 text-red-500">
      {{ errorMessage }}
    </h6>
    <h6 v-if="succeedMessage" class="mt-2 ml-6 text-emerald-500">
      {{ succeedMessage }}
    </h6>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  errorMessage: String,
  succeedMessage: String,
  placeholder: String,
  type: {
    type: String,
    default: "text",
  },
  initValue: {
    type: String,
    default: "",
  },
  inputName: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["onValueChange"]);

const inputValue = ref<string>(props.initValue);

watch(
  () => inputValue.value,
  (val) => {
    emits("onValueChange", val);
  }
);
</script>
