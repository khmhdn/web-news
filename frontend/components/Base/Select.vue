<template>
  <div class="SelectInput w-full flex flex-col items-center relative">
    <div
      class="flex justify-between items-center w-full p-1 md:cursor-pointer transition-all delay-200 px-5 py-[14px]"
      :style="{ backgroundColor, borderRadius, border }"
    >
      <BaseIcon
        name="down-arrow"
        size="30px"
        color="var(--color-blue-400)"
        background-color="var(--color-slate-800)"
        cursor-pointer
        :class="{ 'rotate-180': isOptionsShow }"
        @click="isOptionsShow = !isOptionsShow"
      />
      <h4
        class="w-full text-center text-blue-400"
        :class="{ 'mr-[5%]': selected.length === 0 }"
        @click="isOptionsShow = !isOptionsShow"
      >
        {{ selected.length === 0 ? "choose one option" : selected }}
      </h4>
      <BaseIcon
        v-if="selected.length !== 0"
        :size="`30px`"
        name="close"
        color="var(--color-blue-400)"
        background-color="var(--color-slate-800)"
        cursor-pointer
        @on-click="
          selected = '';
          $emit('onSelect', '');
        "
      />
    </div>
    <div
      class="w-full px-4 absolute right-0 top-full z-20 bg-slate-900 transition-all delay-200 animate__animated animate__fadeIn animate__faster"
      v-if="isOptionsShow"
    >
      <div class="shadow-md p-2">
        <div v-for="item in filterOptions" :key="item">
          <div
            class="w-full hover:bg-slate-800 rounded mb-1 pb-[2px] px-3 md:cursor-pointer"
            :class="{ 'bg-slate-800': selected === item }"
            @click="
              selected = item;
              isOptionsShow = !isOptionsShow;
              $emit('onSelect', item);
            "
          >
            <h5>{{ item }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  name: "SelectInput",
  props: {
    options: Array as PropType<string[]>,
    select: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
    },
    isSearch: {
      type: Boolean,
      defalut: false,
    },
    backgroundColor: {
      type: String,
      default: "var(--color-slate-900)",
    },
    borderRadius: {
      type: String,
      default: "200px",
    },
    border: {
      type: String,
      default: "2px solid var(--color-blue-300)",
    },
    size: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isOptionsShow: false as boolean,
      selected: this.select as string,
      filterOptions: this.options as Array<string>,
    };
  },
  emits: ["onSelect"],
});
</script>
