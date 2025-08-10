export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}
const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "الصفحة الرئيسية",
        route: "/dashboard",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      // {
      //   heading: "ExternalUser",
      //   route: "/ExternalUser-list",
      //   keenthemesIcon: "element-11",
      //   bootstrapIcon: "bi-app-indicator",
      // },
      {
        heading: "قائمة المستخدمين",
        route: "/users-list",
        keenthemesIcon: "user",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "قائمة المرضى",
        route: "/patients-list",
        keenthemesIcon: "virus",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        sectionTitle: "الجداول",
        route: "/sessions",
        keenthemesIcon: "calendar-search",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "جدول الحضور",
            route: "/sessions-list",
          },
          {
            heading: "اضافة جدول حضور",
            route: "/sessions-create",
          },
        ],
      },
      {
        heading: "قائمة الانتظار",
        route: "/waitingList-list",
        keenthemesIcon: "calendar-add",
        bootstrapIcon: "bi-app-indicator",
      },
    ],
  },
];

export default MainMenuConfig;
