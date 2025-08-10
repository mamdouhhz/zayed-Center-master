<template>
    <div class="card">
        <div
            id="kt_customer_details_invoices_1"
            class="py-0 tab-pane fade active show card-body pt-0"
            role="tabpanel"
        >
            <DynamicCreateForm
                :formFields="sortedInputsFileds"
                :formData="formData"
                @submit="handleSubmit"
            ></DynamicCreateForm>
        </div>
    </div>
</template>

<script setup>
import DynamicCreateForm from '@/components/Form/DynamicCreateForm.vue';
import { computed } from 'vue'
import { formData, formFields } from '@/providers/externalUser';
import { useExternalUserStore } from '@/stores/externalUser';

const externalUserEntity = useExternalUserStore();

const sortedInputsFileds = computed(() => {
  return  formFields.sort((a, b) => a.order - b.order);
})

const handleSubmit = (data) => {
  externalUserEntity.create(data);
};
</script>
