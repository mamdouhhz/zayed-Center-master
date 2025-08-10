<template>
    <div class="card">
        <div
            id="kt_customer_details_invoices_1"
            class="py-0 tab-pane fade active show card-body pt-0"
            role="tabpanel"
        >
            <DynamicEditForm
                :formFields="formFields"
                :formData="formData"
                @submit="handleSubmit"
                :intialData="externalUserItem"
            ></DynamicEditForm>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeMount } from "vue";
import DynamicEditForm from "@/components/Form/DynamicEditForm.vue";
import { formData, formFields } from "@/providers/externalUser";
import { useExternalUserStore } from '@/stores/externalUser';
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    DynamicEditForm,
  },
  setup() {
    const externalUserEntity = useExternalUserStore();
    const externalUserItem = ref();
    const router = useRouter();
    const id = ref(router.currentRoute.value.params.id);
    onMounted(async () => {
      await externalUserEntity.fetchItem(id.value).then(() => {
       externalUserItem.value = externalUserEntity.itemData;
      });
    });
    const handleSubmit = (data: any) => {
     externalUserEntity.update(data);
    };

    return { handleSubmit, formData, formFields, externalUserItem };
  },
});
</script>
