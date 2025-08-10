import { defineStore } from "pinia";
import { ref, computed } from "vue";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { reinitializeComponents } from "@/core/plugins/keenthemes";
import {useRouter} from "vue-router";

export const useExternalUserStore = defineStore("externalUser", () => {
  /* Router Config */
  const { push } = useRouter();

  const ListData = ref([]);
  const itemData = ref(null);


  const params = ref({
    page: 1,
    take: 10,
    totalPages: 0,
    totalElements: 0,
    filter: "",
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
    };
  }

  async function fetchList() {
    try {
      params.value.with = "externalUseruser,owner,businessUnit";
      params.value.with = params.value.with.endsWith(",") ? params.value.with.slice(0, -1) : params.value.with;
      const { data, page, size, totalPages, totalElements } = await ApiService.query("externalUser", {
        params: {
          page: params.value.page,
          take: params.value.take,
          ...(params.value.with && { with: params.value.with }),
          ...(params.value.filter && { filter: params.value.filter }),
        },
      });
      ListData.value = data.content;
      params.value.totalPages = totalPages;
      params.value.totalElements = totalElements;
      params.value.page = page;
      params.value.take = size;

      reinitializeComponents();
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchItem(id: any) {
    try {
      let filter= "externalUseruser,owner,businessUnit"
      filter = filter.endsWith(",") ? filter.slice(0, -1) : filter;
      const { data: responseData } = await ApiService.query(`externalUser/${id}`, {
        params: {with:filter},
      });
      itemData.value = responseData;
    } catch (error) {
      console.error(error);
    }
  }

  async function exportReport() {
    try {
      const { data: responseData } = await ApiService.query("externalUser/export", {
        params: {},
      });
      const link = responseData?.link ?? "";
      if (link) {
        window.open(link, "_blank")?.focus();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function create(payload: any) {
    try {
      const response = await ApiService.post("externalUser", payload);
      Swal.fire({
        text: "externalUser Created Successfully ",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok",
        heightAuto: false,
        customClass: { confirmButton: "btn fw-semobold btn-light-primary" },
      });
      push(`/externalUser-view/${response.data.id}`);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function update(payload: { id: any }) {
    try {
      const response = await ApiService.update(
        `externalUser/${payload.id}`,
        payload
      );
      Swal.fire({
        text: "externalUser Updated Successfully ",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: { confirmButton: "btn fw-semobold btn-light-primary" },
      });
      push(`/externalUser-view/${response.data.id}`);
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
      return await ApiService.delete(`externalUser/${id}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Return the properties and functions to be used in the component
  return {
    /* List Table */
    ListData,
    params,
    /* View Item */
    itemData,

    /* Func */
    fetchList,
    resetItems,

    fetchItem,

    exportReport,
    create,
    update,
    resetItemData,
    deleteItem,
  };
});
