<template>
  <div
    class="RegisterPageCard flex flex-col-reverse xl:flex-row gap-5 overflow-hidden"
  >
    <!------------ left section ------------>
    <div
      class="w-full xl:w-1/2 bg-slate-800 rounded-[40px] sm:px-16 sm:py-10 p-6 animate__animated animate__zoomIn relative"
    >
      <div v-if="loading" class="overlay rounded-[40px]">
        <BaseIcon
          name="loading"
          size="80px"
          color="var(--color-blue-300)"
          class="animate-spin"
        />
      </div>
      <h2
        class="font-m mb-5 sm:mb-12 text-center animate__animated animate__bounceInDown"
      >
        Register
      </h2>
      <!------------ input fields ------------>
      <BaseTextInput
        inputName="email"
        title="Email"
        type="text"
        placeholder="example@gmail.com"
        class="mb-4 sm:mb-6 animate__animated animate__bounceInLeft"
        :error-message="userData.email.errorMessage"
        :succeed-message="userData.email.suceedMessage"
        @on-value-change="changeEmailValue"
      />
      <BaseTextInput
        inputName="password"
        title="Password"
        type="password"
        placeholder="Password"
        class="mb-4 sm:mb-6 animate__animated animate__bounceInLeft"
        :error-message="userData.password.errorMessage"
        :succeed-message="userData.password.suceedMessage"
        @on-value-change="changePasswordValue"
      />
      <BaseTextInput
        inputName="agreed"
        title="Confirm password"
        type="password"
        placeholder="Password confirm"
        class="mb-5 sm:mb-12 animate__animated animate__bounceInLeft"
        :error-message="userData.agreed.errorMessage"
        :succeed-message="userData.agreed.suceedMessage"
        @on-value-change="changeAgreedValue"
      />
      <!------------ login or register buttons ------------>
      <div
        class="flex w-full justify-center animate__animated animate__bounceInUp"
      >
        <BaseButtonGroup
          leftButtonText="Register"
          rightButtonText="Login"
          @on-right-button-click="navigateTo('/login')"
          @on-leftt-button-click="register"
        />
      </div>
    </div>
    <!------------ right section ------------>
    <div class="w-full xl:w-1/2 mb-5 xl:mb-0">
      <h1
        class="max-w-[200px] sm:max-w-md text-center mb-5 mx-auto animate__animated animate__bounceInDown"
      >
        Custom web news website
      </h1>
      <div class="flex w-full xl:h-[600px] justify-center items-center">
        <img
          src="/_nuxt/assets/images/man1.webp"
          alt=""
          class="w-5/12 animate__animated animate__zoomIn"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { useToast } from "vue-toastification";

import * as regex from "@/constants/regex";
import { _register } from "@/api/auth";
import { RegisterData } from "@/constants/types";

definePageMeta({
  layout: "auth-layout",
});

// plugin and composable variables -----------------------------------------------
const toast = useToast();

// data variables -----------------------------------------------------------------
const loading: Ref<boolean> = ref(false);
const userData: Ref<RegisterData> = ref({
  email: { value: "", errorMessage: "", suceedMessage: "" },
  password: { value: "", errorMessage: "", suceedMessage: "" },
  agreed: { value: "", errorMessage: "", suceedMessage: "" },
});

// internall functions ----------------------------------------------------------
const changeEmailValue = (email: string) => {
  userData.value.email.value = email;
  if (regex.email.test(userData.value.email.value)) {
    userData.value.email.suceedMessage = "valid email";
    userData.value.email.errorMessage = "";
  } else {
    userData.value.email.suceedMessage = "";
    userData.value.email.errorMessage = "invalid email";
  }
};

const changePasswordValue = (pass: string) => {
  userData.value.password.value = pass;
  if (regex.password.test(userData.value.password.value)) {
    userData.value.password.suceedMessage = "valid password";
    userData.value.password.errorMessage = "";
  } else {
    userData.value.password.suceedMessage = "";
    userData.value.password.errorMessage =
      "atleast: 1 uppercase letter, 1 lowercase letter, 8 length";
  }
};

const changeAgreedValue = (pass: string) => {
  userData.value.agreed.value = pass;
  if (pass === userData.value.password.value) {
    userData.value.agreed.suceedMessage = "password and confirmation are same";
    userData.value.agreed.errorMessage = "";
  } else {
    userData.value.agreed.suceedMessage = "";
    userData.value.agreed.errorMessage =
      "password and confirmation aren't same";
  }
};

const register = async () => {
  if (
    !!userData.value.email.errorMessage ||
    !!userData.value.password.errorMessage ||
    !!userData.value.agreed.errorMessage
  )
    return;

  loading.value = true;
  await _register({
    email: userData.value.email.value,
    username: userData.value.email.value,
    password: userData.value.password.value,
  })
    .then((res) => {
      toast.success("user account successfully created please login");
      navigateTo("/login");
    })
    .catch((err) => {
      toast.error(err.response.data.username[0]);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
