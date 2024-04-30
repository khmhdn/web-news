<template>
  <div class="pt-0 animate__animated animate__fadeIn">
    <div class="bg-slate-900 p-[5%] rounded-lg">
      <div
        class="grid grid-cols-2 justify-items-stretch gap-[5%] mb-4 shadow-lg"
      >
        <div class="col-span-2 xl:col-span-1 rounded-lg">
          <ImagePicker @onSelect="setPicture" :size="17 / 9" />
          <div class="mt-10 animate__animated animate__bounceInUp">
            <h3 class="ml-7 mb-4">Category</h3>
            <BaseSelect
              :options="[
                'Technology',
                'Health',
                'Economics',
                'Sports',
                'Politics',
              ]"
              @on-select="selectCategory"
            />
          </div>
        </div>
        <div class="col-span-2 xl:col-span-1">
          <BaseTextInput
            title="Title"
            input-name="input-title"
            @on-value-change="setTitle"
            class="animate__animated animate__bounceInDown"
          />
          <div class="mt-10 animate__animated animate__bounceInRight">
            <h3 class="mb-4 ml-7">Description</h3>
            <textarea
              v-model="apiData.body"
              rows="7"
              class="border-2 border-blue-300 outline-none focus:border-blue-400 rounded-3xl px-5 py-2 bg-slate-900 w-full text-xl"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center gap-2 mt-4">
        <BaseButton text="Add" @on-click="createNewNew" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";

import { createNew } from "@/api/news";

definePageMeta({
  layout: "default-layout",
  middleware: "auth",
});

const toast = useToast();

const loading = ref<boolean>(false);
const selectedCategory = ref<string>("");
const selectedFile = ref<any>(null);
const apiData = ref({
  title: "",
  category: 1,
  body: "",
  slug: "",
});
const categories = ref<{ [key: string]: string }>({
  Technology: "1",
  Health: "2",
  Economics: "3",
  Sports: "4",
  Politics: "5",
});

const setPicture = (pic: any) => {
  selectedFile.value = pic;
};

const setTitle = (title: string) => {
  apiData.value.title = title;
};

const selectCategory = (category: string) => {
  selectedCategory.value = category;
};

const createNewNew = async () => {
  loading.value = true;
  const fd = new FormData();
  fd.append("title", apiData.value.title);
  fd.append("body", apiData.value.body);
  fd.append("slug", apiData.value.title);
  fd.append(
    "category",
    JSON.stringify({
      name: selectedCategory.value,
      id: categories.value[selectedCategory.value],
    })
  );
  if (selectedFile.value) {
    selectedFile.value.toBlob(async (blob: Blob) => {
      fd.append("picture", blob, "image.webp");

      await createNew(fd).then((res) => {
        toast("new successfully created");
      });
      loading.value = false;
    }, "image/webp");
  } else {
    await createNew(fd).then((res) => {
      toast("new successfully created");
    });
    loading.value = false;
  }
};
</script>
