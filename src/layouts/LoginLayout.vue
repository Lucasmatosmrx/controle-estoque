<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Estoque </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import useAuthUser from "src/composables/UseAuthUser";

export default defineComponent({
  name: "LoginLayout",

  setup() {
    const { logout } = useAuthUser();
    return {
      logout,
    };
  },
});
</script>
