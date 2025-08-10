import { ref } from "vue"; // Import the ref function from the Vue Composition API
/* Thats the interface Export for Entity */

/* Thats the formFields Export to create dynamic inputs */

export const formFields = [
  {
    label: "اسم المريض",
    api: "patients",
    name: "patient",
    order: 1,
    placeholder: "ادخل اسم المريض",
    displayName: "name",
    attributeType: "hasOne",
    display: {
      create: true,
      list: true,
      view: true,
      edit: true,
    },
    allowedExtensions: [],
    options: [],
    rules: "required",
  },
];

/* Thats the formFields Export to create dynamic inputs */
export const formData = ref({
  patient: "",
});
