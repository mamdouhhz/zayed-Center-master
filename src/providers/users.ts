import { ref } from "vue"; // Import the ref function from the Vue Composition API
/* Thats the interface Export for Entity */
export interface Iusers {
  _id: string;
  username: string;
  email: string;
}

/* Thats the tableHeader for the table in index file */
export const tableHeader = [
  {
    columnName: "المعرف",
    columnLabel: "_id",
  },
  {
    columnName: "اسم المستخدم",
    columnLabel: "username",
  },
  {
    columnName: "البريد الالكتروني",
    columnLabel: "email",
  },
  {
    columnName: "الدور",
    columnLabel: "role",
  },
  {
    columnName: "القسم",
    columnLabel: "department",
  },

  /* It's gonna be static, so you can use it as a constant for all table so we can use the dropdown actions */
  {
    columnName: "العمليات",
    columnLabel: "actions",
  },
];

/* Thats the formFields Export to create dynamic inputs */

export const formFields = [
  {
    label: "اسم المستخدم",
    name: "username",
    order: 1,
    placeholder: "ادخل اسم المستخدم",
    attributeType: "string",
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
  {
    label: "البريد الالكتروني",
    name: "email",
    order: 2,
    placeholder: "ادخل البريد الالكتروني",
    attributeType: "email",
    display: {
      create: true,
      list: true,
      view: true,
      edit: true,
    },
    allowedExtensions: [],
    options: [],
    rules: "required|email",
  },
  {
    label: "كلمة المرور",
    name: "password",
    order: 3,
    placeholder: "ادخل كلمة المرور",
    attributeType: "password",
    display: {
      create: true,
      list: false,
      view: false,
      edit: true,
    },
    allowedExtensions: [],
    options: [],
    rules: "required",
  },
  {
    label: "الدور",
    name: "role",
    order: 4,
    placeholder: "ادخل الدور",
    attributeType: "enumeration",
    display: {
      create: true,
      list: true,
      view: true,
      edit: true,
    },
    allowedExtensions: [],
    options: ["ادمن", "اخصائي", "رعاية نهارية"],
    rules: "required",
  },
];

/* Thats the formFields Export to create dynamic inputs */
export const formData = ref({
  username: "",
  email: "",
  password: "",
  role: "",
});
