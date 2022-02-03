<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="form.email"
          lazy-rules
          type="email"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          label="Password"
          v-model="form.password"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Password type something',
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
        <div class="full-width q-pt-md">
          <q-btn
            label="Login"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />
        </div>
        <div class="full-width" q-gutter-y-sm>
          <q-btn
            label="Register"
            color="black"
            class="full-width"
            flat
            to="/register"
            size="sm"
          />
          <q-btn
            label="Forgot Password ?"
            color="black"
            class="full-width"
            flat
            :to="{ name: 'forgot-password' }"
            size="sm"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "PageLogin",

  setup() {
    const router = useRouter();

    const { login, isLoggedIn } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const form = ref({
      email: "",
      password: "",
    });

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: "me" });
      }
    });

    const handleLogin = async () => {
      try {
        await login(form.value);
        notifySuccess("Login Sucessfully!");
        router.push({ name: "me" });
      } catch (error) {
        notifyError(error.message);
        //alert(error.message);
      }
    };

    return {
      form,
      isPwd: ref(true),
      handleLogin,
    };
  },
});
</script>
