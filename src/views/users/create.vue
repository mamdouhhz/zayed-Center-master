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
      </DynamicCreateForm>
    </div>
  </div>
</template>

<script setup>
import DynamicCreateForm from "@/components/Form/DynamicCreateForm.vue";
import { computed, ref, watch } from "vue";
import { formData, formFields } from "@/providers/users";
import { useUsersStore } from "@/stores/users";
import { Form, Field, ErrorMessage } from "vee-validate";
import { required } from "@vee-validate/rules";

// Get the users store instance
const store = useUsersStore();
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
// Sort the form fields based on their order property
const sortedInputsFileds = computed(() => {
  return formFields.sort((a, b) => a.order - b.order);
});

// Handle form submission
const handleSubmit = (data) => {
  if (ifSpecialist.value) {
    data.department = selectedDepartment.value;
  }
  store.create(data);
};
const handleUpdateFormData = (data) => {
  console.log("🚀 ~ handleUpdateFormData ~ data", data);
  formData.role = data.role;
  console.log("🚀 ~ handleUpdateFormData ~ data.role:", data.role);
  if (data.role === "اخصائي") {
    ifSpecialist.value = true;
  } else {
    ifSpecialist.value = false;
  }
};
</script>
<style scoped></style>
