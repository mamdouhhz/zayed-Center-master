<template>
  <div>
    <div>
      <el-select
        @change="selectDepartment"
        v-model="selectedDepartment"
        placeholder="اختر القسم"
      >
        <el-option
          v-for="department in departments"
          :key="department"
          :label="department"
          :value="department"
        ></el-option>
      </el-select>
    </div>
    <div style="margin-top: 10px" v-if="departmentSpecialists.length">
      <el-select
        @change="selectSpecialist"
        v-model="selectedSpecialist"
        placeholder="اختر الاخصائي"
      >
        <el-option
          v-for="specialist in departmentSpecialists"
          :key="specialist._id"
          :label="specialist.username"
          :value="specialist._id"
        ></el-option>
      </el-select>
    </div>

    <div v-if="selectedSpecialist" class="table-container mt-10">
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th></th>
              <template v-for="header in tableHeader" :key="header">
                <th>{{ header }}</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <template v-for="day in weekDays" :key="day">
              <tr>
                <td>{{ day }}</td>
                <template v-for="timeSlot in tableHeader" :key="timeSlot">
                  <td>
                    <template v-if="hasAppointment(day, timeSlot)">
                      <div
                        v-for="appointment in getAppointments(day, timeSlot)"
                        :key="appointment._id"
                      >
                        {{ appointment.patient.name }}
                        <div>
                          <i
                            @click="
                              confirmRemoveName(day, timeSlot, appointment._id)
                            "
                            class="fas fa-trash-alt bin-icon"
                            style="cursor: pointer"
                          ></i>
                        </div>
                      </div>
                      <template v-if="canAddMoreAppointments(day, timeSlot)">
                        <i
                          @click="openModal(day, timeSlot)"
                          class="fas fa-user user-icon"
                          style="cursor: pointer"
                        ></i>
                      </template>
                    </template>
                    <template v-else>
                      <i
                        @click="openModal(day, timeSlot)"
                        class="fas fa-user user-icon"
                        style="cursor: pointer"
                      ></i>
                    </template>
                  </td>
                </template>
              </tr>
            </template>
          </tbody>
        </table>
        <el-dialog
          v-if="dialogVisible"
          center
          width="500"
          v-model="dialogVisible"
        >
          <el-form @submit.native.prevent="">
            <el-form-item>
              <DynamicCreateForm
                :formFields="formFields"
                :formData="formData"
                :reset="false"
                @submit="handleSubmit"
              ></DynamicCreateForm>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import Swal from "sweetalert2";
/* Store */
import { useSessionsStore } from "@/stores/sessions";
import { storeToRefs } from "pinia";
const store = useSessionsStore();
const { ListData, params, departmentSpecialists } = storeToRefs(store);
//components
import DynamicCreateForm from "@/components/Form/DynamicCreateForm.vue";
import { formData, formFields } from "@/providers/sessions";

const weekDays = ref([
  "السبت",
  "الاحد",
  "الاثنين",
  "الثلاثاء",
  "الاربعاء",
  "الخميس",
]);
const departments = ref([
  "تكامل حسي",
  "عمود فقري",
  "علاج وظيفي",
  "تنمية مهارات",
  "عيادة الاسنان",
  "علاج طبيعي",
  "منعكسات",
  "تعديل سلوك",
  "صعوبات تعلم",
  "اورال موتور",
  "تخاطب",
  "منتسوري",
]);

const selectedDepartment = ref("");
const selectedSpecialist = ref("");

const dialogVisible = ref(false);
const currentAppointment = ref({
  day: "",
  from: "",
  to: "",
  department: "",
  patient: "",
  specialist: "",
});

const tableHeader = ref([
  "09:00 - 09:30",
  "09:30 - 10:00",
  "10:00 - 10:30",
  "10:30 - 11:00",
  "11:00 - 11:30",
  "11:30 - 12:00",
  "12:00 - 12:30",
  "12:30 - 01:00",
  "01:00 - 01:30",
  "01:30 - 02:00",
]);

watch(selectedDepartment, (newDepartment) => {
  if (newDepartment === "منتسوري") {
    tableHeader.value = [
      "09:00 - 09:45",
      "09:45 - 10:30",
      "10:30 - 11:15",
      "11:15 - 12:00",
      "12:00 - 12:45",
      "12:45 - 01:30",
    ];
  } else {
    tableHeader.value = [
      "09:00 - 09:30",
      "09:30 - 10:00",
      "10:00 - 10:30",
      "10:30 - 11:00",
      "11:00 - 11:30",
      "11:30 - 12:00",
      "12:00 - 12:30",
      "12:30 - 01:00",
      "01:00 - 01:30",
      "01:30 - 02:00",
    ];
  }
});

const maxSessionsPerSlot = computed(() => {
  switch (selectedDepartment.value) {
    case "علاج طبيعي":
      return 5;
    default:
      return 1; // Default to 1 session per slot if no specific department rule
  }
});

function openModal(day, timeslot) {
  dialogVisible.value = true;
  const [startTime, endTime] = timeslot.split(" - ");
  currentAppointment.value.from = startTime;
  currentAppointment.value.to = endTime;
  currentAppointment.value.day = day;
  currentAppointment.value.department = selectedDepartment.value;
}

function confirmRemoveName(day, timeSlot, appointmentId) {
  Swal.fire({
    title: "هل انت متأكد ؟",
    text: "هل تريد حذف هذة الجلسة ؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "متأكد",
    cancelButtonText: "الغاء",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await store.deleteItem(appointmentId);
      await store.fetchList();
      Swal.fire("تم المسح !", "تم مسح الجلسة", "success");
    }
  });
}

const selectDepartment = async () => {
  selectedSpecialist.value = "";
  store.params.take = 999999;
  store.department = selectedDepartment.value;
  params.value.department = selectedDepartment.value;
  await store.getDepartmentSpecialists();
};
const selectSpecialist = async () => {
  store.params.take = 999999;
  params.value.specialist = selectedSpecialist.value;
  store.specialist = selectedSpecialist.value;
  await store.fetchList();
};

const hasAppointment = (day, timeSlot) => {
  return ListData.value.some(
    (appointment) =>
      appointment.day === day &&
      appointment.from === timeSlot.split(" - ")[0] &&
      appointment.to === timeSlot.split(" - ")[1]
  );
};

const getAppointments = (day, timeSlot) => {
  return ListData.value.filter(
    (appointment) =>
      appointment.day === day &&
      appointment.from === timeSlot.split(" - ")[0] &&
      appointment.to === timeSlot.split(" - ")[1]
  );
};

const canAddMoreAppointments = (day, timeSlot) => {
  const appointmentsCount = getAppointments(day, timeSlot).length;
  return appointmentsCount < maxSessionsPerSlot.value;
};

const handleSubmit = async (data) => {
  currentAppointment.value.patient = data.patient;
  currentAppointment.value.specialist = selectedSpecialist.value;
  await store.create(currentAppointment.value);
  await store.fetchList();
  dialogVisible.value = false;
};

// Fetch list on component mount
onMounted(() => {
  if (store.department) {
    selectedDepartment.value = store.department;
  }
});
</script>

<style scoped>
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

.user-icon {
  color: green;
}

.submitted-name {
  margin-bottom: 5px; /* Adjust the margin to separate the name from the bin icon */
}

.bin-icon {
  color: red;
}
ب .bin-icon-container {
  text-align: center;
}

/* Increase font size of button and dropdown text */
.el-button,
.el-dropdown-item {
  font-size: 16px;
  padding: 20px;
}
</style>
س
