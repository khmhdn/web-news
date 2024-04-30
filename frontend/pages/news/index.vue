<template>
  <div class="pt-0 animate__animated animate__fadeIn">
    <div
      class="bg-slate-900 p-4 rounded-lg flex items-center gap-5 justify-center mb-4 shadow-lg sticky top-0 z-20 overflow-x-auto"
    >
      <div
        v-for="category in categories"
        :key="category.id"
        class="py-1 px-2 transition-all duration-200 border-b-2 md:cursor-pointer"
        :class="
          selectedCategory === category.name
            ? 'border-blue-400'
            : 'border-transparent'
        "
        @click="selectCategory(category.name)"
      >
        <h4
          class="font-light"
          :class="{ 'text-blue-400': selectedCategory === category.name }"
        >
          {{ category.name }}
        </h4>
      </div>
    </div>
    <div
      v-if="filteredNews.length === 0"
      class="p-5 bg-slate-900 rounded-xl flex justify-center"
    >
      <h4>No data found</h4>
    </div>
    <div v-else class="grid grid-cols-2 justify-items-stretch gap-5">
      <NewsItem
        v-for="item in filteredNews"
        :key="item.id"
        :new-data="item"
        @click="clickNew(item)"
      />
    </div>
    <BaseModal
      v-if="isOpen"
      :is-open="isOpen"
      @set-is-open="setIsOpen"
      :title="selectedNew?.title!"
      footer
    >
      <template #body>
        <div class="relative">
          <img
            :src="selectedNew?.image"
            alt=""
            class="w-full md:mr-5 mb-4 md:mb-0 rounded-xl"
          />
          <div
            class="absolute top-0 right-0 bg-gradient-to-t from-black to-transparent w-full h-full flex flex-col justify-end rounded-xl"
          >
            <div class="flex items-center justify-between p-[2%]">
              <h3 class="text-center">{{ selectedNew?.title }}</h3>
              <div class="flex items-center bg-slate-800 rounded-full p-1 pr-3">
                <BaseIcon name="technology" size="30px" />
                <h6 class="ml-2">{{ selectedNew?.category.name }}</h6>
              </div>
            </div>
          </div>
        </div>
        <h6 class="text-justify mt-4 font-light">
          {{ selectedNew?.body }}
        </h6>
      </template>
      <template #footer>
        <div class="flex justify-end w-full">
          <BaseButton
            text="edit"
            padding="0px 28px"
            right-icon-name="edit"
            background-icon-color="var(--color-blue-300)"
            @on-click="navigateTo(`/news/${selectedNew?.id}`)"
          />
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";

import { getCategoryUser } from "@/api/category";
import { getNews, updateNew } from "@/api/news";
import { NewsData } from "@/constants/types";

definePageMeta({
  layout: "default-layout",
  middleware: "auth",
});

onMounted(async () => {
  await getCategories();
  await getAllNews();
  setInterval(getAllNews, 1000);
});

const loading = ref<boolean>(false);
const isOpen: Ref<boolean> = ref(false);
const userCategories = ref<number[]>([]);
const news: Ref<NewsData[]> = ref([]);
const filteredNews: Ref<NewsData[]> = ref([]);
const selectedCategory: Ref<string> = ref("All");
const selectedNew: Ref<NewsData | null> = ref(null);
const categories = ref([
  { id: 0, name: "All" },
  { id: 1, name: "Technology" },
  { id: 2, name: "Health" },
  { id: 3, name: "Economics" },
  { id: 4, name: "Sports" },
  { id: 5, name: "Politics" },
]);

const setIsOpen = (val: boolean) => {
  isOpen.value = val;
};

const selectCategory = (name: string) => {
  selectedCategory.value = name;
};

const getCategories = async () => {
  loading.value = true;
  await getCategoryUser()
    .then((res) => {
      userCategories.value = res.data.categories;
    })
    .finally(() => {
      loading.value = false;
    });
};

const getAllNews = async () => {
  await getNews().then((res) => {
    news.value = [];
    res.data.forEach((data: any) => {
      userCategories.value.forEach((item) => {
        if (item === data.id) {
          news.value.push(data);
        }
      });
    });
    filteredNews.value = [...news.value];
  });
};

const clickNew = async (item: NewsData) => {
  isOpen.value = !isOpen.value;
  item.views += 1;
  selectedNew.value = item;
  await updateNew(selectedNew.value.id, {
    category: selectedNew.value.category,
    title: selectedNew.value.title,
    slug: selectedNew.value.slug,
    body: selectedNew.value.body,
    views: selectedNew.value.views,
  });
};

watch(
  () => selectedCategory.value,
  (val) => {
    if (val === "All") {
      filteredNews.value = [...news.value];
    } else {
      filteredNews.value = news.value.filter(
        (item) => item.category.name === val
      );
    }
  }
);

watch(
  () => news.value,
  (val) => {
    if (selectedCategory.value === "All") {
      filteredNews.value = [...news.value];
    } else {
      filteredNews.value = news.value.filter(
        (item) => item.category.name === selectedCategory.value
      );
    }
  }
);
</script>
