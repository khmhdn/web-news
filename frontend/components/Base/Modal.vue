<template>
  <div
    class="modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto z-30"
    :class="{ hidden: !isOpen }"
    @click="toggleModal"
    :key="id"
  >
    <div class="modal-dialog lg:max-w-3xl lg:mx-auto py-[5%] relative w-auto">
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-slate-900 bg-clip-padding rounded-md outline-none text-current animate__animated animate__faster animate__zoomIn"
        @click.stop=""
      >
        <!--------- modal header --------->
        <div
          class="modal-header flex items-center justify-between p-4 border-b border-slate-800 rounded-t-lg"
        >
          <h4 class="ml-3 font-medium leading-normal">{{ title }}</h4>
          <BaseIcon
            name="close"
            size="30px"
            @onClick="toggleModal"
            class="md:cursor-pointer"
          />
        </div>
        <!--------- modal body --------->
        <div class="modal-body relative p-[7%] py-[3%]">
          <slot name="body"></slot>
        </div>
        <!--------- modal footer --------->
        <div
          v-if="footer"
          class="modal-footer flex flex-wrap items-center justify-start p-4 border-t border-slate-800 rounded-b-lg"
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    default: "modal",
  },
  footer: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["setIsOpen"]);

const toggleModal = () => {
  emits("setIsOpen", !props.isOpen);
};
</script>

<style lang="scss">
.modal {
  background-color: rgba($color: #000000, $alpha: 0.6);
}
</style>
