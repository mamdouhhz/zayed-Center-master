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
        :intialData="usersItem"
        @updateFormData="handleUpdateFormData"
      >
        <template v-if="ifSpecialist" v-slot:department>
          <!-- content for the header slot -->
          <!-- <label> القسم </label> -->

          <Field
            name="department"
            rules="required"
            v-slot="{ field, errors }"
            :value="selectedDepartment"
          >
            <el-form-item
              class="required-field"
              label="القسم"
              prop="department"
              :error="errors[0]"
            >
              <el-select
                v-model="selectedDepartment"
                placeholder="اختر القسم"
                clearable
                filterable
                v-bind="field"
              >
                <el-option
                  v-for="item in departments"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </Field>
        </template>
      </DynamicEditForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, onBeforeMount } from "vue";
import DynamicEditForm from "@/components/Form/DynamicEditForm.vue";
import { formData, formFields } from "@/providers/users";
import { useUsersStore } from "@/stores/users";
import { useRouter } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import { required } from "@vee-validate/rules";

const usersEntity = useUsersStore();
const usersItem = ref();
const router = useRouter();
const id = ref(router.currentRoute.value.params.id);
const departments = ref([
  "تكامل حسي",
  "عمود فقري",
  "علاج وظيفي",
  "تنمية مهارات",
  "عيادة الاسنان",
  "علاج طبيعي",
  "منعكسات",
  "تعديل سلوك",
  "صعوبات تعلم",
  "اورال موتور",
  "تخاطب",
  "منتسوري",
]);
const ifSpecialist = ref(false);

const selectedDepartment = ref(null);

// Fetch the user item data when the component is mounted
onMounted(async () => {
  await usersEntity.fetchItem(id.value).then(() => {
    usersItem.value = usersEntity.itemData;
    console.log(
      "🚀 ~ awaitusersEntity.fetchItem ~ usersItem.value.department:",
      usersItem.value.department
    );

    if (usersItem.value.department) {
      selectedDepartment.value = usersItem.value.department;
      ifSpecialist.value = true;
    }
  });
});
const handleUpdateFormData = (data: any) => {
  console.log("🚀 ~ handleUpdateFormData ~ data", data);
  formData.role = data.role;
  console.log("🚀 ~ handleUpdateFormData ~ data.role:", data.role);
  if (data.role === "اخصائي") {
    ifSpecialist.value = true;
  } else {
    ifSpecialist.value = false;
  }
};

// Handle form submission
const handleSubmit = (data: any) => {
  console.log("🚀 ~ handleSubmit ~ data:", data);
  if (ifSpecialist.value) {
    data.department = selectedDepartment.value;
  }
  usersEntity.update(data);
};
</script>
