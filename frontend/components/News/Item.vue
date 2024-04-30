<template>
  <div
    class="col-span-2 xl:col-span-1 flex flex-col md:flex-row w-full p-5 bg-slate-900 rounded-xl shadow-lg relative hover:bg-slate-800 transition-all duration-200 md:cursor-pointer"
  >
    <img
      :src="newData.image"
      alt=""
      class="h-44 md:mr-5 mb-4 md:mb-0 rounded-xl"
    />
    <div class="flex flex-col justify-between">
      <div class="md:mb-0 mb-4">
        <h3 class="text-blue-400 mb-2 line-clamp-1">{{ newData.title }}</h3>
        <h6 class="text-blue-300 line-clamp-2">
          {{ newData.body }}
        </h6>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center bg-slate-800 rounded-full p-1 pr-3">
          <BaseIcon name="technology" size="30px" />
          <h6 class="ml-2">{{ newData.category.name }}</h6>
        </div>
        <div class="flex items-center">
          <h5 class="text-orange mr-1">{{ newData.views }}</h5>
          <BaseIcon name="view" size="25px" color="orange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

import { NewsData } from "@/constants/types";

defineProps({
  newData: {
    type: Object as PropType<NewsData>,
    required: true,
  },
});
</script>
