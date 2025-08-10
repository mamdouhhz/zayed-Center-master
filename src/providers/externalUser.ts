import { ref } from "vue"; // Import the ref function from the Vue Composition API
  /* Thats the interface Export for Entity */
export interface IexternalUser {
  email: string,
  fullName: string,
  provider: string,
}


  /* Thats the tableHeader for the table in index file */
export const tableHeader = [
  {
    columnName: "Email",
    columnLabel: "email",
  },
  {
    columnName: "FullName",
    columnLabel: "fullName",
  },
  {
    columnName: "Provider",
    columnLabel: "provider",
  },
  {
    columnName: "User",
    columnLabel: "externalUseruser",
  },
  {
    columnName: "User",
    columnLabel: "owner",
  },
  {
    columnName: "BusinessUnit",
    columnLabel: "businessUnit",
  },
  /* It's gonna be static, so you can use it as a constant for all table so we can use the dropdown actions */
  {
    columnName: "Actions",
    columnLabel: "actions",
  },
];



  /* Thats the formFields Export to create dynamic inputs */

export const formFields =[
 {
    label: "email",
    name: "email",
    order: 1,
    placeholder: "Enter email",
    attributeType: "email",
    display: {
      create: true,
      list: true,
      view: true,
      edit: true,
    },
    allowedExtensions: [
    ],
    options: [
    ],
    rules: "required|email",
  },
 {
    label: "fullName",
    name: "fullName",
    order: 1,
    placeholder: "Enter fullName",
    attributeType: "string",
    display: {
      create: true,
      list: true,
      view: true,
      edit: true,
    },
    allowedExtensions: [
    ],
    options: [
    ],
    rules: "",
  },
 {
    label: "provider",
    name: "provider",
    order: 1,
    placeholder: "Enter provider",
    attributeType: "string",
    display: {
      create: true,
      list: true,
      view: true,
      edit: true,
    },
    allowedExtensions: [
    ],
    options: [
    ],
    rules: "required",
  },
  {
    label: "user",
    order: 1,
    name: "ExternalUseruserId",
    placeholder: "Enter user",
    attributeType: "hasOne",
    displayName:"email",
    rules: "",
  },
  {
    label: "user",
    order: 1,
    name: "ownerId",
    placeholder: "Enter user",
    attributeType: "hasOne",
    displayName:"email",
    rules: "required",
  },
  {
    label: "businessUnit",
    order: 1,
    name: "businessUnitId",
    placeholder: "Enter businessUnit",
    attributeType: "hasOne",
    displayName:"code",
    rules: "",
  },
]

  /* Thats the formFields Export to create dynamic inputs */
export const formData = ref({
    email: null,
    fullName: null,
    provider: null,
    ExternalUseruserId: null,
    ownerId: null,
    businessUnitId: null,
});


