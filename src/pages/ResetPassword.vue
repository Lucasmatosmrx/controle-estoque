<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="New Password"
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length >= 6) ||
              'Password is required and 6 characters',
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="full-width q-pt-md q-gutter-y-md">
          <q-btn
            label="Send New Password"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />
        </div>
        <div class="full-width">
          <q-btn
            label="Return"
            color="black"
            class="full-width"
            flat
            rounded
            :to="{ name: 'login' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter, useRoute } from "vue-router";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "PageRestPassword",

  setup() {
    const { resetPassword } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();
    const router = useRouter();
    const route = useRoute();
    const token = route.query.token;

    const password = ref("");

    const handlePasswordReset = async () => {
      try {
        await resetPassword(token, password.value);
        notifySuccess("New Password Sent");
        router.push({ name: "login" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      password,
      handlePasswordReset,
      isPwd: ref(true),
    };
  },
});
</script>
