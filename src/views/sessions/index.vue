<template>
  <div class="mb-5">
    <el-date-picker
      v-model="selectedDate"
      type="date"
      :disabled-date="disableFutureAndPastDates"
      placeholder="اختار تاريخ الجلسات"
      @change="() => getTimetable(selectedDate)"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
    ></el-date-picker>
  </div>

  <div v-if="selectedDate" class="table-container">
    <div class="table-responsive">
      <button class="el-button mb-5" @click="openModal">اضافة حضور مريض</button>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>اسم المريض</th>
            <th v-for="header in tableHeader" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody v-if="tableData && tableData.length">
          <tr v-for="patient in patients" :key="patient.name">
            <td>{{ patient.name }}</td>
            <template v-for="(header, index) in tableHeader" :key="index">
              <template v-if="getDepartment(patient.name, header)">
                <td :colspan="getColspan(patient.name, header)">
                  <el-dropdown
                    trigger="click"
                    @command="handleStatusChange($event, patient.name, header)"
                  >
                    <el-button
                      :style="{
                        backgroundColor: getButtonColor(patient.name, header),
                      }"
                      class="no-hover"
                      size="large"
                    >
                      <span style="color: white">{{
                        getDepartment(patient.name, header) === "منتسوري"
                          ? "مـــنــتــســوري"
                          : getDepartment(patient.name, header)
                      }}</span>
                    </el-button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item command="حاضر"
                          ><span>حاضر</span></el-dropdown-item
                        >
                        <el-dropdown-item command="غائب"
                          ><span>غائب</span></el-dropdown-item
                        >
                        <el-dropdown-item command="غير محدد"
                          ><span>غير محدد</span></el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </td>
                <!-- Skip the remaining slots that fall under the colspan -->
                <template v-for="i in getColspan(patient.name, header) - 1">
                  <td v-if="false"></td>
                </template>
              </template>
              <td v-else-if="!isCoveredByColspan(patient.name, header)"></td>
            </template>
          </tr>
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
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  ElDatePicker,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElButton,
} from "element-plus";
import { useSessionsStore } from "@/stores/sessions";
import { storeToRefs } from "pinia";

//components
import DynamicCreateForm from "@/components/Form/DynamicCreateForm.vue";
import { formData, formFields } from "@/providers/sessions";

interface Patient {
  _id: string;
  name: string;
  serial: number;
}

interface Session {
  _id: string;
  patient: Patient;
  department: string;
  from: string;
  to: string;
  status?: string;
}

const store = useSessionsStore();
const { currentTimetable } = storeToRefs(store);
const selectedDate = ref<string | null>(null);
const tableData = ref<Session[]>([]);
const dialogVisible = ref(false);

const tableHeader = ref([
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "01:00",
  "01:15",
  "01:30",
  "01:45",
]);
const uniquePatients = computed(() => {
  const names = new Set();
  return tableData.value
    .filter((session) => {
      if (!names.has(session.patient.name)) {
        names.add(session.patient.name);
        return true;
      }
      return false;
    })
    .map((session) => session.patient);
});
const handleSubmit = async (data: { patient: any }) => {
  try {
    await store.addPresentPatient(data.patient);
    await getTimetable(selectedDate.value as string);
    dialogVisible.value = false;
  } catch (error) {
    console.error(error);
    dialogVisible.value = false;
  }
};

const patients = computed(() => {
  const patientsMap = {};
  tableData.value.forEach((session) => {
    const name = session.patient.name;
    if (!patientsMap[name]) {
      patientsMap[name] = { name, sessions: {} };
    }

    const colspan = session.department === "منتسوري" ? 3 : 2;
    console.log("🚀 ~ tableData.value.forEach ~ session:", session);

    patientsMap[name].sessions[session.from] = {
      department: session.department,
      status: session.status || "غير محدد",
      colspan: colspan, // Ensure colspan is at least 1
    };
  });
  return Object.values(patientsMap);
});

// Updated functions to handle 15-minute intervals
function getDepartment(patientName, timeSlot) {
  const patient = patients.value.find((p) => p.name === patientName);

  return patient && patient.sessions[timeSlot]
    ? patient.sessions[timeSlot].department
    : "";
}
function getColspan(patientName, timeSlot) {
  const patient = patients.value.find((p) => p.name === patientName);
  console.log(patient?.sessions[timeSlot]?.colspan);

  return patient && patient.sessions[timeSlot]
    ? patient.sessions[timeSlot].colspan
    : 1;
}

function isCoveredByColspan(patientName, timeSlot) {
  const patient = patients.value.find((p) => p.name === patientName);
  if (!patient) return false;
  const sessionTimes = Object.keys(patient.sessions);
  for (const startTime of sessionTimes) {
    const session = patient.sessions[startTime];
    const startTimeIndex = tableHeader.value.indexOf(startTime);
    const endTimeIndex = startTimeIndex + session.colspan - 1;
    const timeSlotIndex = tableHeader.value.indexOf(timeSlot);
    if (timeSlotIndex > startTimeIndex && timeSlotIndex <= endTimeIndex) {
      return true;
    }
  }
  return false;
}

function openModal() {
  dialogVisible.value = true;
}

function getStatus(patientName, timeSlot) {
  const patient = patients.value.find((p) => p.name === patientName);
  return patient && patient.sessions[timeSlot]
    ? patient.sessions[timeSlot].status
    : "غير محدد";
}
function getButtonColor(patientName: string, timeSlot: string): string {
  const status = getStatus(patientName, timeSlot);
  switch (status) {
    case "حضر":
    case "حاضر":
      return "green";
    case "غائب":
    case "لم يحضر":
      return "red";
    default:
      return "grey";
  }
}

async function handleStatusChange(
  status: string,
  patientName: string,
  timeSlot: string
) {
  const patient = patients.value.find((p) => p.name === patientName);
  if (patient) {
    console.log("🚀 ~ patient:", patient);
    // patient.statuses[timeSlot] = status;
    // Update the tableData with the new status
    const session = tableData.value.find(
      (session) =>
        session.patient.name === patientName && session.from === timeSlot // Adjusted for start time only
    );
    if (session) {
      session.status = status;
      await store.updateSession(session);
      await getTimetable(selectedDate.value as string);
    }
  }
}

// Computed property to disable future and past dates
const disableFutureAndPastDates = computed(() => {
  return (date: Date) => {
    const today = new Date();
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(today.getDate() - 5);
    return date < fiveDaysAgo || date > today;
  };
});

const getTimetable = async (date: string) => {
  await store.getTimeTable(date);
  tableData.value = store.currentTimetable as unknown as Session[];
  console.log("🚀 ~ getTimetable ~ tableData.value:", tableData.value);
};
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
  border-right: 1px solid #ebedf2; /* Add right border */
  white-space: wrap; /* Prevent text wrapping */
  text-align: center;
  height: 65px;
}
.table th:last-child,
.table td:last-child {
  border-right: 1px solid #ebedf2; /* Ensure right border for the last column */
}
.table td {
  width: 120px; /* Adjust slot width */
  padding: 10px; /* Increase padding */
  text-align: center; /* Center align text */
  font-size: 14px; /* Adjust font size */
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
  font-size: 18px;
  padding: 25px;
}
.el-select {
  width: 100%;
}
.el-form-item__label {
  text-align: right !important;
}
.el-date-editor.el-input,
.el-date-editor.el-input__wrapper {
  width: 100%;
}
.el-input-number {
  width: 100%;
}
``
/* No hover or focus effect on the button */
.no-hover {
  color: inherit !important;
}
.no-hover:hover,
.no-hover:focus,
.no-hover:active {
  color: inherit !important;
}
</style>
