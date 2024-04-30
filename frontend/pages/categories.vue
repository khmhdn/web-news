<template>
  <div class="p-2 animate__animated animate__fadeIn">
    <div class="bg-slate-900 p-4 rounded-lg flex items-center mb-4 shadow-lg">
      <BaseIcon name="hint" color="orange" size="25px" />
      <h6 class="ml-2 text-orange">You can select multiple categories</h6>
    </div>
    <div
      class="bg-slate-900 rounded-xl py-[5%] shadow-xl relative min-h-[500px]"
    >
      <div v-if="loading" class="overlay rounded-[40px]">
        <BaseIcon
          name="loading"
          size="80px"
          color="var(--color-blue-300)"
          class="animate-spin"
        />
      </div>
      <div v-if="!loading" class="grid grid-cols-6 gap-16 justify-items-center">
        <div
          v-for="item in categories"
          :key="item.id"
          :class="{ 'bg-blue-300': item.active }"
          class="aspect-square col-span-3 md:col-span-2 flex flex-col items-center rounded-2xl border-2 border-blue-300 p-[5%] shadow-blue-300 hover:shadow-md hover:scale-95 hover:shadow-blue-300 transition-all duration-200 md:cursor-pointer animate__animated animate__pulse"
          @click="item.active = !item.active"
        >
          <div
            class="w-24 h-24 bg-slate-800 rounded-full flex justify-center items-center"
          >
            <BaseIcon :name="item.iconName" size="60px" />
          </div>
          <h4 class="mt-3" :class="{ 'text-slate-800': item.active }">
            {{ item.name }}
          </h4>
        </div>
      </div>
      <div class="mt-2 flex justify-end px-[5%]">
        <BaseButton text="update" @on-click="updateUserCategory" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";

import { getCategoryUser, assiginCategoryToUser } from "@/api/category";

definePageMeta({
  layout: "default-layout",
  middleware: "auth",
});

onMounted(async () => {
  await getCategories();
});

const toast = useToast();

const loading = ref<boolean>(false);
const userCategories = ref<string[]>([]);
const categories = ref([
  { id: 1, name: "Technology", iconName: "technology", active: false },
  { id: 2, name: "Health", iconName: "health", active: false },
  { id: 3, name: "Economics", iconName: "economics", active: false },
  { id: 4, name: "Sports", iconName: "sport", active: false },
  { id: 5, name: "Politics", iconName: "user", active: false },
]);

const getCategories = async () => {
  loading.value = true;
  await getCategoryUser()
    .then((res) => {
      userCategories.value = res.data.categories;
      categories.value.forEach((item) => {
        userCategories.value.forEach((cat) => {
          if (item.id === parseInt(cat)) item.active = true;
        });
      });
    })
    .finally(() => {
      loading.value = false;
    });
};

const updateUserCategory = async () => {
  loading.value = true;
  let data: number[] = [];
  categories.value.forEach((item) => {
    if (item.active) data.push(item.id);
  });

  await assiginCategoryToUser(data)
    .then((res) => {
      toast.success("categories successfully assign to user");
      navigateTo("/news");
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
