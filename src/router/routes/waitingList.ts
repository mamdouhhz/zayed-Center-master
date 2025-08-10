import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import List from "@/views/waitingList/index.vue";
import Create from "@/views/waitingList/create.vue";
import Edit from "@/views/waitingList/edit.vue";
import View from "@/views/waitingList/view.vue";

const waitingListRoutes: Array<RouteRecordRaw> = [
  {
    path: "/waitingList-list",
    name: "waitingList-list",
    component: List,
    meta: {
      pageTitle: "قائمة الانتظار",
      breadcrumbs: ["الانتظار "],
    },
  },
  {
    path: "/waitingList-create",
    name: "waitingList-create",
    component: Create,
    meta: {
      pageTitle: "اضافة مريض لقائمة الانتظار",
      // breadcrumbs: ["patients", "Create"],
    },
  },
  {
    path: "/waitingList-edit/:id",
    name: "waitingList-edit",
    component: Edit,
    meta: {
      pageTitle: "تعديل بيانات المريض في قائمة الانتظار",
      // breadcrumbs: ["patients", "Edit"],
    },
  },
  {
    path: "/waitingList-view/:id",
    name: "waitingList-view",
    component: View,
    meta: {
      pageTitle: "عرض بيانات المريض في قائمة الانتظار",
      // breadcrumbs: ["patients", "View"],
    },
  },
];

export default waitingListRoutes;
