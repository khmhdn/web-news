<template>
  <div class="pt-0 animate__animated animate__fadeIn">
    <div class="bg-slate-900 p-[5%] rounded-lg">
      <div
        v-if="!loading"
        class="grid grid-cols-2 justify-items-stretch gap-[5%] mb-4 shadow-lg"
      >
        <div class="col-span-2 xl:col-span-1 rounded-lg">
          <ImagePicker
            :image="newData?.image"
            @onSelect="setPicture"
            :size="17 / 9"
          />
          <div class="mt-10 animate__animated animate__bounceInUp">
            <h3 class="mb-4 ml-7">Category</h3>
            <BaseSelect
              :options="[
                'Technology',
                'Health',
                'Economics',
                'Sports',
                'Politics',
              ]"
              :select="newData?.category.name"
              @on-select="selectCategory"
            />
          </div>
        </div>
        <div class="col-span-2 xl:col-span-1">
          <BaseTextInput
            :init-value="newData?.title"
            title="Title"
            input-name="input-title"
            @on-value-change="setTitle"
            class="animate__animated animate__bounceInDown"
          />
          <div class="mt-10 animate__animated animate__bounceInRight">
            <h3 class="mb-4 ml-7">Description</h3>
            <textarea
              v-model="apiData!.body"
              rows="7"
              class="border-2 border-blue-300 outline-none focus:border-blue-400 rounded-3xl px-5 py-2 bg-slate-900 w-full text-xl"
              >{{ newData?.body }}</textarea
            >
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center gap-2 mt-4">
        <BaseButton
          text="delete"
          background-color="var(--color-red-500)"
          color="white"
        />
        <BaseButton text="update" @on-click="updateNewsData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";

import { getSingleNew, updateNew } from "@/api/news";
import { NewsData } from "@/constants/types";

definePageMeta({
  layout: "default-layout",
  middleware: "auth",
});

const route = useRoute();
const router = useRouter();
const toast = useToast();

const loading = ref<boolean>(true);
const newData = ref<NewsData | null>(null);
const apiData = ref<NewsData | null>(null);
const selectedCategory = ref<string>("");
const selectedFile = ref<any>(null);
const categories = ref<{ [key: string]: string }>({
  Technology: "1",
  Health: "2",
  Economics: "3",
  Sports: "4",
  Politics: "5",
});

onMounted(async () => {
  await getNew();
});

const setTitle = (val: string) => {
  apiData.value!.title = val;
};

const setPicture = (picture: any) => {
  selectedFile.value = picture;
};

const selectCategory = (category: string) => {
  selectedCategory.value = category;
};

const getNew = async () => {
  loading.value = true;
  await getSingleNew(+route.params.id)
    .then((res) => {
      newData.value = res.data;
      apiData.value = res.data;
    })
    .catch(() => {
      toast.error("there is no new with this id");
      router.replace("/news/");
    })
    .finally(() => {
      loading.value = false;
    });
};

const updateNewsData = async () => {
  loading.value = true;
  const fd = new FormData();
  fd.append("title", apiData.value!.title);
  fd.append("slug", apiData.value!.slug);
  fd.append("body", apiData.value!.body);
  fd.append("views", apiData.value!.views.toString());
  fd.append("category", categories.value[selectedCategory.value]);
  if (selectedFile.value) {
    selectedFile.value.toBlob(async (blob: Blob) => {
      fd.append("image", blob, "image.webp");
      await updateNew(apiData.value!.id, fd).then((res) => {
        toast.success("New successfully updated!");
      });
    }, "image/webp");
  } else {
    await updateNew(apiData.value!.id, fd).then((res) => {
      toast.success("New successfully updated!");
    });
  }
  await getNew();
  loading.value = false;
};
</script>
