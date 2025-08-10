<template>
  <section>
    <div id="kt_app_content_container" class="app-container container-fluid">
      <div class="card mb-5 mb-xl-10" id="kt_users_details_view">
        <div class="card-header cursor-pointer">
          <!--begin::Card title-->
          <div class="card-title m-0">
            <h3 class="fw-bold m-0">بيانات المستخدم</h3>
          </div>
          <!--end::Card title-->
          <div>
            <a
              href="#"
              class="btn btn-primary mt-3"
              data-kt-menu-trigger="click"
              data-kt-menu-attach="parent"
              data-kt-menu-placement="bottom-end"
            >
              عمليات
              <KTIcon icon-name="down" icon-class="fs-2 me-0" />
            </a>
            <div
              class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semobold py-4 w-100px fs-6"
              data-kt-menu="true"
            >
              <div class="menu-item px-5">
                <router-link
                  :to="{
                    name: 'users-edit',
                    params: { id: viewData.id },
                  }"
                  class="menu-link align-self-center"
                  >تعديل</router-link
                >
              </div>
              <div class="menu-item px-5">
                <a
                  @click="submitDelete()"
                  href="#"
                  class="menu-link align-self-center text-danger"
                >
                  مسح
                </a>
              </div>
            </div>
          </div>
        </div>

        <!--begin::Card body-->
        <div class="p-9">
          <!--begin::Row-->
          <div class="row mb-7">
            <div v-if="viewData" class="row">
              <!-- Info: Left col -->
              <div class="col-12">
                <div class="row">
                  <div class="mb-3 col-lg-6">
                    <!--username -->
                    <info-item
                      label="اسم المستخدم"
                      :data="viewData.username"
                      type="string"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- email -->
                    <info-item
                      label="البريد الالكتروني"
                      :data="viewData.email"
                      type="string"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- role -->
                    <info-item
                      label="الدور"
                      :data="viewData.role"
                      type="string"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- id -->
                    <info-item
                      label="المعرف"
                      :data="viewData._id"
                      type="string"
                    />
                  </div>
                  <div v-if="viewData.department" class="mb-3 col-lg-6">
                    <!-- id -->
                    <info-item
                      label="المعرف"
                      :data="viewData.department"
                      type="string"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end::Card body-->
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { useUsersStore } from "@/stores/users";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import InfoItem from "@/components/info-item.vue";
export default {
  components: {
    InfoItem,
  },
  setup() {
    const store = useUsersStore();
    const viewData = ref({});
    const router = useRouter();
    const submitDelete = async () => {
      const confirmed = await Swal.fire({
        text: "هل أنت متأكد أنك تريد حذف هذا المستخدم؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "تأكيد",
        cancelButtonText: "الغاء",
      });
      if (confirmed.isConfirmed) {
        try {
          await store.deleteItem(viewData.value._id).then(() => {
            router.push({ name: "users-list" });
            Swal.fire({
              text: "تم حذف المستخدم بنجاح",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-primary",
              },
            });
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            text: "حدث خطأ أثناء محاولة حذف المستخدم",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-primary",
            },
          });
        }
      }
    };
    onMounted(async () => {
      await store.fetchItem(router.currentRoute.value.params.id);
      viewData.value = store.itemData;
    });
    onUnmounted(() => {
      store.resetItemData();
    });

    return {
      viewData,
      submitDelete,
    };
  },
};
</script>
