<template>
  <div class="card">
    <div
      id="kt_customer_details_invoices_1"
      class="py-0 tab-pane fade active show card-body pt-0"
      role="tabpanel"
    >
      <!-- DynamicEditForm component -->
      <DynamicEditForm
        :formFields="formFields"
        :formData="formData"
        @submit="handleSubmit"
        :intialData="waitingListItem"
      ></DynamicEditForm>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeMount } from "vue";
import DynamicEditForm from "@/components/Form/DynamicEditForm.vue";
import { formData, formFields } from "@/providers/waitingList";
import { useWaitingListStore } from "@/stores/waitingList";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    DynamicEditForm,
  },
  setup() {
    const waitingListEntity = useWaitingListStore();
    const waitingListItem = ref();
    const router = useRouter();
    const id = ref(router.currentRoute.value.params.id);

    // Fetch the user item data when the component is mounted
    onMounted(async () => {
      await waitingListEntity.fetchItem(id.value).then(() => {
        waitingListItem.value = waitingListEntity.itemData;
      });
    });

    // Handle form submission
    const handleSubmit = (data: any) => {
      console.log("🚀 ~ handleSubmit ~ data:", data);
      waitingListEntity.update(data);
    };

    return { handleSubmit, formData, formFields, waitingListItem };
  },
});
</script>
