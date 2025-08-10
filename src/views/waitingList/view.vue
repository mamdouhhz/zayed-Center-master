<template>
  <section>
    <div id="kt_app_content_container" class="app-container container-fluid">
      <div class="card mb-5 mb-xl-10" id="kt_waitingList_details_view">
        <div class="card-header cursor-pointer">
          <!--begin::Card title-->
          <div class="card-title m-0">
            <h3 class="fw-bold m-0">بيانات المريض</h3>
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
                    name: 'waitingList-edit',
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
                      label="اسم المريض"
                      :data="viewData.name"
                      type="string"
                    />
                  </div>

                  <div class="mb-3 col-lg-6">
                    <!-- email -->
                    <info-item
                      label="العمر"
                      :data="viewData.age"
                      type="string"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- role -->
                    <info-item
                      label="تاريخ الميلاد"
                      :data="viewData.birthday"
                      type="date"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- id -->
                    <info-item
                      label="الرقم القومي"
                      :data="viewData.nationalId"
                      type="string"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- id -->
                    <info-item
                      label="الفئة"
                      :data="viewData.degree"
                      type="string"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- id -->
                    <info-item
                      label="الرتبة"
                      :data="viewData.rank"
                      type="string"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- id -->
                    <info-item
                      label="اسم الاب"
                      :data="viewData.fatherName"
                      type="string"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- id -->
                    <info-item
                      label="الرقم القومي للاب"
                      :data="viewData.fatherId"
                      type="string"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- id -->
                    <info-item
                      label="اسم الام"
                      :data="viewData.motherName"
                      type="string"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- id -->
                    <info-item
                      label="الرقم القومي للام"
                      :data="viewData.motherId"
                      type="string"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- id -->
                    <info-item
                      label="العنوان"
                      :data="viewData.address"
                      type="string"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- id -->
                    <info-item
                      label="الهاتف"
                      :data="viewData.phone"
                      type="string"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- id -->
                    <info-item
                      label="رقم الواتساب"
                      :data="viewData.whatsapp"
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
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useWaitingListStore } from "@/stores/waitingList";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import InfoItem from "@/components/info-item.vue";

const store = useWaitingListStore();
const router = useRouter();
const viewData = ref({});

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
        router.push({ name: "waitingList-list" });
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
          cancelButton: "btn fw-semobold btn-light-primary",
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
</script>

<style scoped>
/* Add your CSS styling here */
.table-container {
  overflow-x: auto; /* Enable horizontal scrolling */
  max-width: 100%; /* Adjust the max-width as needed */
  font-size: 15px;
}

.table-responsive {
  overflow: auto; /* Ensure table content scrolls */
}

.table {
  width: max-content; /* Set table width to max-content for horizontal scrolling */
  background-color: transparent;
  width: 100%; /* Set table width to 100% */
  border-collapse: collapse; /* Collapse border spacing */
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #ebedf2;
  white-space: wrap; /* Prevent text wrapping */
  text-align: center;
  height: 65px;
}
.table td {
  width: 100px;
}

.user-icon {
  color: green;
}

.submitted-name {
  margin-bottom: 5px; /* Adjust the margin to separate the name from the bin icon */
}

.bin-icon {
  color: red;
}

.bin-icon-container {
  text-align: center;
}

/* Increase font size of button and dropdown text */
.el-button,
.el-dropdown-item {
  font-size: 16px;
  padding: 20px;
}

/* Your existing CSS styles for .table, .table th, .table td, etc. */
</style>
