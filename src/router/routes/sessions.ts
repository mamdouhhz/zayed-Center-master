import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import List from "@/views/sessions/index.vue";
import Create from "@/views/sessions/create.vue";
// import Edit from "@/views/sessions/edit.vue";
// import View from "@/views/sessions/view.vue";

const sessionsRoutes: Array<RouteRecordRaw> = [
  {
    path: "/sessions-list",
    name: "sessions-list",
    component: List,
    meta: {
      pageTitle: "جدول الحضور",
      breadcrumbs: ["الحضور "],
    },
  },
  {
    path: "/sessions-create",
    name: "sessions-create",
    component: Create,
    meta: {
      pageTitle: "اضافة مريض",
      // breadcrumbs: ["sessions", "Create"],
    },
  },
  //   {
  //     path: "/sessions-edit/:id",
  //     name: "sessions-edit",
  //     component: Edit,
  //     meta: {
  //       pageTitle: "تعديل بيانات المريض",
  //       // breadcrumbs: ["sessions", "Edit"],
  //     },
  //   },
  //   {
  //     path: "/sessions-view/:id",
  //     name: "sessions-view",
  //     component: View,
  //     meta: {
  //       pageTitle: "عرض بيانات المريض",
  //       // breadcrumbs: ["sessions", "View"],
  //     },
  //   },
];

export default sessionsRoutes;
