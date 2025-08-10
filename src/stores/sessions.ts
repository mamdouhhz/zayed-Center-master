import { defineStore } from "pinia";
import { ref, computed } from "vue";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { reinitializeComponents } from "@/core/plugins/keenthemes";
import { useRouter } from "vue-router";

export const useSessionsStore = defineStore("sessions", () => {
  /* Router Config */
  const { push } = useRouter();

  const ListData = ref([]);
  const departmentSpecialists = ref([]);
  const itemData = ref(null);
  const department = ref("");
  const specialist = ref("");
  const currentTimetable = ref([]);

  const params = ref({
    page: 1,
    take: 10,
    totalPages: 0,
    totalElements: 0,
    filter: "",
    sort: "",
    department: "",
    specialist: "",
  });

  /* Reset To Default Values */
  function resetItems() {
    ListData.value = [];
    params.value = {
      page: 1,
      take: 10,
      totalPages: 0,
      totalElements: 0,
      filter: "",
      sort: "",
      department: params.value.department,
      specialist: params.value.specialist,
    };
  }

  async function fetchList() {
    try {
      const { data } = await ApiService.query("sessions", {
        params: {
          department: params.value.department,
          specialist: params.value.specialist,
        },
      });
      ListData.value = data.data.results;
      // params.value.totalPages = data.metadata.totalPages;
      // params.value.totalElements = data.metadata.totalElements;
      // params.value.page = page;
      // params.value.take = data.result;

      reinitializeComponents();
    } catch (error) {
      console.error(error);
    }
  }

  async function getDepartmentSpecialists() {
    try {
      const { data } = await ApiService.query("users", {
        params: {
          department: params.value.department,
        },
      });
      departmentSpecialists.value = data.data.results;

      // params.value.totalPages = data.metadata.totalPages;
      // params.value.totalElements = data.metadata.totalElements;
      // params.value.page = page;
      // params.value.take = data.result;

      reinitializeComponents();
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchItem(id: any) {
    try {
      const { data: responseData } = await ApiService.query(
        `sessions/${id}`,
        {}
      );
      itemData.value = responseData.data.patient;
    } catch (error) {
      console.error(error);
    }
  }

  async function create(payload: any) {
    try {
      const response = await ApiService.post("sessions", payload);
      Swal.fire({
        text: "تم تحديد موعد بنجاح ",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok",
        heightAuto: false,
        customClass: { confirmButton: "btn fw-semobold btn-light-primary" },
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function update(payload: any): Promise<any> {
    try {
      const response = await ApiService.update(
        `sessions/${payload._id}`,
        payload
      );
      Swal.fire({
        text: "تم تحديث المستخدم بنجاح",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: { confirmButton: "btn fw-semobold btn-light-primary" },
      });
      push(`/sessions-view/${response.data.data.patient._id}`);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  function resetItemData() {
    itemData.value = null;
  }

  async function deleteItem(id: any) {
    try {
      return await ApiService.delete(`sessions/${id}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async function getTimeTable(date: string) {
    try {
      const { data } = await ApiService.query(`timetables`, {
        params: {
          date: date,
        },
      });

      currentTimetable.value = data.data.timetable.sessions;

      return data.data.timetable.sessions;
    } catch (error) {
      console.error(error);
    }
  }
  async function addPresentPatient(id: any) {
    try {
      const response = await ApiService.post(`timetables/${id}`, {});
      Swal.fire({
        text: "تم تسجيل الحضور بنجاح",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: { confirmButton: "btn fw-semobold btn-light-primary" },
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async function updateSession(payload: any): Promise<any> {
    try {
      const response = await ApiService.update(
        `timetables/session-status/${payload._id}`,
        payload
      );
      console.log("🚀 ~ update ~ response:", response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Return the properties and functions to be used in the component
  return {
    /* List Table */
    ListData,
    departmentSpecialists,
    params,
    currentTimetable,
    /* View Item */
    itemData,
    department,
    specialist,

    /* Func */
    fetchList,
    resetItems,

    fetchItem,

    create,
    update,
    resetItemData,
    deleteItem,
    getTimeTable,
    addPresentPatient,
    updateSession,
    getDepartmentSpecialists,
  };
});
