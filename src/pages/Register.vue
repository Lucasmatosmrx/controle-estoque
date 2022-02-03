<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center">Register</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Name"
          v-model="form.name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Name type something']"
        />
        <q-input
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Email type something']"
          type="email"
        />
        <q-input
          label="Password"
          v-model="form.password"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length >= 6) ||
              'Password type something and 6 characters',
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
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Register"
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
import { useRouter } from "vue-router";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "PageRegister",

  setup() {
    const router = useRouter();
    const { register } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const form = ref({
      name: "",
      email: "",
      password: "",
    });

    const handleRegister = async () => {
      try {
        await register(form.value);
        notifySuccess();
        router.push({
          name: "email-confirmation",
          query: { email: form.value.email },
        });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      isPwd: ref(true),
      handleRegister,
    };
  },
});
</script>
