<template>
  <div class="ImagePicker">
    <BaseModal
      v-if="show"
      :is-open="show"
      @set-is-open="show = !show"
      title="crop image"
      body
      id="imageCropModal"
    >
      <template v-slot:body>
        <div class="flex flex-col justify-center items-center">
          <div class="w-full">
            <cropper
              class="cropper"
              id="fileInput"
              :src="
                newImage ? newImage : '/_nuxt/assets/images/sample_image.webp'
              "
              :stencil-props="{
                aspectRatio: size,
              }"
              @change="change"
            />
          </div>
          <div class="flex items-center mt-6 gap-4">
            <BaseButton
              text="close"
              padding="4px 20px"
              backgroundColor="var(--color-slate-800)"
              color="var(--color-blue-300)"
              @onClick="show = !show"
            />
            <BaseButton
              text="crop"
              padding="4px 24px"
              class="ml-4"
              @onClick="sendFile"
            />
          </div>
        </div>
      </template>
    </BaseModal>
    <input ref="fileUpload" type="file" @change="onfileSelected" hidden />
    <div
      @click="
        ($refs.fileUpload as HTMLInputElement).click();
        show = !show;
      "
    >
      <div
        class="w-full border-2 border-blue-300 rounded-lg border-dashed p-4 py-10 text-center hover:bg-slate-800 md:cursor-pointer"
      >
        <img
          :src="
            prewImage ? prewImage : '/_nuxt/assets/images/sample_image.webp'
          "
          alt=""
          class="h-36 rounded-lg m-auto"
        />
        <h4 class="mt-3">
          {{
            selectedFile
              ? "click for changing picture"
              : "click for uploading picture"
          }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Cropper } from "vue-advanced-cropper";
import { CropperResult } from "vue-advanced-cropper/types";
import "vue-advanced-cropper/dist/style.css";

export default defineComponent({
  name: "ImagePicker",
  components: { Cropper },
  props: {
    image: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: 1 / 1,
    },
  },
  data() {
    return {
      selectedFile: this.image as null | any,
      show: false as boolean,
      newImage: this.image as any,
      prewImage: this.image as any,
    };
  },
  methods: {
    onfileSelected(event: any) {
      this.selectedFile = event.target.files[0];
      if (event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newImage = String(e.target?.result);
        };
        reader.readAsDataURL(this.selectedFile);
      }
    },
    change({ canvas }: CropperResult) {
      this.selectedFile = canvas;
    },
    sendFile() {
      this.$emit("onSelect", this.selectedFile);
      this.prewImage = this.selectedFile?.toDataURL();
      this.show = false;
    },
  },
  emits: ["onSelect"],
});
</script>
