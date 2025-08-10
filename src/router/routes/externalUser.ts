
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import List from "@/views/ExternalUser/index.vue"
import Create from "@/views/ExternalUser/create.vue"
import Edit from "@/views/ExternalUser/edit.vue"
import View from "@/views/ExternalUser/view.vue"


const ExternalUserRoutes: Array<RouteRecordRaw> = [
  {
    path: "/externalUser-list",
    name: "externalUser-list",
    component: List,
    meta: {
      pageTitle: "ExternalUser List",
      breadcrumbs: ["ExternalUser"],
    },
  },
  {
    path: "/externalUser-create",
    name: "externalUser-create",
    component: Create,
    meta: {
      pageTitle: "Create ExternalUser",
      breadcrumbs: ["ExternalUser", "Create"],
    },
  },
  {
    path: "/externalUser-edit/:id",
    name: "externalUser-edit",
    component: Edit,
    meta: {
      pageTitle: "Edit ExternalUser",
      breadcrumbs: ["ExternalUser", "Edit"],
    },
  },
  {
    path: "/externalUser-view/:id",
    name: "externalUser-view",
    component: View,
    meta: {
      pageTitle: "View ExternalUser",
      breadcrumbs: ["ExternalUser", "View"],
    },
  },
];

export default ExternalUserRoutes;

