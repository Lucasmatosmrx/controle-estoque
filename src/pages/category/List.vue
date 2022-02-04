<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="fat"
        class="col-12"
      />
    </div>
  </q-page>
</template>

<script>
const columns = [
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  { name: "carbs", label: "Carbs (g)", field: "carbs" },
  { name: "protein", label: "Protein (g)", field: "protein" },
];

const rows = [
  {
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
  },
];

import { defineComponent } from "vue";

export default defineComponent({
  name: "PageCategoryList",

  setup() {
    return {
      columns,
      rows,
    };
  },
});
</script>
