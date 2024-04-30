<template>
  <div
    class="LoginPageCard flex flex-col-reverse xl:flex-row gap-5 overflow-hidden"
  >
    <!------------ left section ------------>
    <div
      class="w-full xl:w-1/2 bg-slate-800 rounded-[40px] animate__animated animate__zoomIn relative"
    >
      <div v-if="loading" class="overlay rounded-[40px]">
        <BaseIcon
          name="loading"
          size="80px"
          color="var(--color-blue-300)"
          class="animate-spin"
        />
      </div>
      <div
        class="w-full h-full sm:px-16 sm:py-10 p-6 flex flex-col justify-between"
      >
        <h2
          class="font-m mb-5 sm:mb-12 text-center animate__animated animate__bounceInDown"
        >
          Login to your account
        </h2>
        <!------------ input fields ------------>
        <BaseTextInput
          inputName="email"
          title="Email"
          type="text"
          placeholder="example@gmail.com"
          class="animate__animated animate__bounceInLeft"
          @on-value-change="changeEmailValue"
        />
        <BaseTextInput
          inputName="password"
          title="Password"
          type="password"
          placeholder="Password"
          class="mb-3 animate__animated animate__bounceInLeft"
          @on-value-change="changePasswordValue"
        />
        <!------------ login or register buttons ------------>
        <div
          class="flex w-full justify-center animate__animated animate__bounceInUp"
        >
          <BaseButtonGroup
            leftButtonText="Login"
            rightButtonText="Register"
            @on-right-button-click="navigateTo('/register')"
            @on-leftt-button-click="login"
          />
        </div>
      </div>
    </div>
    <!------------ right section ------------>
    <div
      class="w-full xl:w-1/2 flex flex-col items-center justify-between mb-5 xl:mb-0"
    >
      <h1
        class="max-w-[200px] sm:max-w-md text-center mb-5 animate__animated animate__bounceInDown"
      >
        Custom web news website
      </h1>
      <img
        src="/_nuxt/assets/images/man3.webp"
        alt=""
        class="w-5/12 animate__animated animate__zoomIn"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { useToast } from "vue-toastification";

import { useUser } from "@/stores/user";
import { LoginData } from "@/constants/types";

definePageMeta({
  layout: "auth-layout",
});

// plugin and composable variables -----------------------------------------------
const user = useUser();
const toast = useToast();

// data variables -----------------------------------------------------------------
const userData: Ref<LoginData> = ref({ email: "", password: "" });
const loading: Ref<boolean> = ref(false);

// internall functions ----------------------------------------------------------
const changeEmailValue = (email: string) => {
  userData.value.email = email;
};

const changePasswordValue = (pass: string) => {
  userData.value.password = pass;
};

const login = async () => {
  if (loading.value) return;

  // username and password should not be empty
  if (userData.value.email === "" || userData.value.password === "") {
    toast.warning("Email or Password may not be blank");
    return;
  }

  loading.value = true;
  // call api and handle userInfo for login
  await user
    .login({
      email: userData.value.email,
      password: userData.value.password,
    })
    .then((response) => {
      toast.success("successfully loged in welcome!");
      navigateTo({ path: "/" });
    })
    .catch((err) => {
      toast.error(err.response.data.non_field_errors[0]);
    });

  loading.value = false;
};
</script>
