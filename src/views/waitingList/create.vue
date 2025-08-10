<template>
  <div class="card">
    <!-- This div contains the content of the tab pane -->
    <div
      id="kt_customer_details_invoices_1"
      class="py-0 tab-pane fade active show card-body pt-0"
      role="tabpanel"
    >
      <!-- This is a custom component called DynamicCreateForm -->
      <!-- It receives props formFields and formData -->
      <!-- It emits a submit event when the form is submitted -->
      <DynamicCreateForm
        :formFields="sortedInputsFileds"
        :formData="formData"
        @submit="handleSubmit"
      ></DynamicCreateForm>
    </div>
  </div>
</template>

<script setup>
import DynamicCreateForm from "@/components/Form/DynamicCreateForm.vue";
import { computed } from "vue";
import { formData, formFields } from "@/providers/waitingList";
import { useWaitingListStore } from "@/stores/waitingList";

// Get the waitingList store instance
const store = useWaitingListStore();

// Sort the form fields based on their order property
const sortedInputsFileds = computed(() => {
  return formFields.sort((a, b) => a.order - b.order);
});

// Handle form submission
const handleSubmit = (data) => {
  // Call the create method of the waitingList store and pass the form data
  store.create(data);
};
</script>
