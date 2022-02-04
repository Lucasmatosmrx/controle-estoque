<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Form Category</p>
      </div>

      <q-form
        class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md"
        @submit.prevent="handleSubmit"
      >
        <q-input label="Name" v-model="form.name" />

        <q-btn
          label="Save"
          color="primary"
          class="full-width"
          rounded
          type="submit"
        />
        <q-btn
          label="Cancel"
          color="primary"
          class="full-width"
          rounded
          flat
          :to="{ name: 'category' }"
        />
      </q-form>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "PageFormCategory",

  setup() {
    const table = "category";
    const router = useRouter();
    const { post } = useApi();
    const { notifyError, notifySuccess } = useNotify();

    const form = ref({
      name: "",
    });

    const handleSubmit = async () => {
      try {
        await post(table, form.value);
        notifySuccess("Saved Successfully");
        router.push({ name: "category" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      handleSubmit,
      form,
    };
  },
});
</script>
