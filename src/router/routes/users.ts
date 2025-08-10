import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import List from "@/views/users/index.vue";
import Create from "@/views/users/create.vue";
import Edit from "@/views/users/edit.vue";
import View from "@/views/users/view.vue";

const usersRoutes: Array<RouteRecordRaw> = [
  {
    path: "/users-list",
    name: "users-list",
    component: List,
    meta: {
      pageTitle: "قائمة المستخدمين",
      breadcrumbs: ["المستخدمين"],
    },
  },
  {
    path: "/users-create",
    name: "users-create",
    component: Create,
    meta: {
      pageTitle: "اضافة مستخدم",
      // breadcrumbs: ["users", "Create"],
    },
  },
  {
    path: "/users-edit/:id",
    name: "users-edit",
    component: Edit,
    meta: {
      pageTitle: "تعديل بيانات المستخدم",
      // breadcrumbs: ["users", "Edit"],
    },
  },
  {
    path: "/users-view/:id",
    name: "users-view",
    component: View,
    meta: {
      pageTitle: "عرض بيانات المستخدم",
      // breadcrumbs: ["users", "View"],
    },
  },
];

export default usersRoutes;
