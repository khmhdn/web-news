<template>
  <div
    class="w-full sticky top-4 sm:top-8 flex items-center justify-between z-10"
  >
    <h1>Web News</h1>
    <div class="flex items-center">
      <Popover class="relative ring-0 border-none" v-slot="{ close }">
        <PopoverButton as="div" class="ring-0 border-none">
          <BaseIcon
            name="menu"
            size="50px"
            padding="8px"
            background-color="var(--color-slate-900)"
            color="var(--color-blue-300)"
            class="ml-2 sm:cursor-pointer hover:scale-95 transition-all"
          />
        </PopoverButton>
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="translate-y-1 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-1 opacity-0"
        >
          <PopoverPanel
            class="absolute right-0 z-10 mt-3 transform px-4 sm:px-0"
          >
            <div
              class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <ul class="relative bg-slate-900 p-6" @click="close">
                <li @click="navigateTo('/news/add')">
                  <BaseIcon name="plus" size="24px" class="mr-2" />
                  Add new post
                </li>
                <hr class="my-1 bg-slate-800 text-slate-800" />
                <li @click="navigateTo('/news')">
                  <BaseIcon name="list" size="24px" class="mr-2" />
                  List of my news
                </li>
                <hr class="my-1 bg-slate-800 text-slate-800" />
                <li @click="navigateTo('/categories')">
                  <BaseIcon name="edit" size="24px" class="mr-2" />
                  Edit category
                </li>
                <hr class="my-1 bg-slate-800 text-slate-800" />
                <li @click="logout" class="text-red-500">
                  <BaseIcon
                    name="logout"
                    size="24px"
                    color="var(--color-red-500)"
                    class="mr-2"
                  />
                  Logout
                </li>
              </ul>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

import { useUser } from "@/stores/user";

const user = useUser();

const logout = () => {
  user.logout();
};
</script>
