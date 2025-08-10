<template>
    <div class="card">
        <div class="card-body">
            <Datatable
                :header="tableHeader"
                modelName="externalUser"
                :data="ListData"
                :items-per-page="params.take"
                :items-per-page-dropdown-enabled="false"
                @page-change="handlePageChange"
                :total="params.totalElements"
                :total-pages="params.totalPages"
                :currentPage="params.page"
                @on-search="handleSearch"
                @exportReport="exportReport"
                :searchable="true"
                @on-page-size-change="onPageSizeChange"
            >
                <template v-slot:email="{ row: data }">
                    <info-item-table class="badge" :data="data.email" type="email"/>
                </template>
                <template v-slot:fullName="{ row: data }">
                    <info-item-table class="badge" :data="data.fullName" type="string"/>
                </template>
                <template v-slot:provider="{ row: data }">
                    <info-item-table class="badge" :data="data.provider" type="string"/>
                </template>
                <template v-slot:externalUseruser="{ row: data }">
                    <info-item-table class="badge" :data="data.externalUseruser" type="hasOne" displayName="email" />
                </template>
                <template v-slot:owner="{ row: data }">
                    <info-item-table class="badge" :data="data.owner" type="hasOne" displayName="email" />
                </template>
                <template v-slot:businessUnit="{ row: data }">
                    <info-item-table class="badge" :data="data.businessUnit" type="hasOne" displayName="code" />
                </template>

                <template v-slot:actions="{ row: data, index }">
                    <div class="me-0">
                        <button
                            class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                            :id="'dropdownButton-' + data.id"
                            data-kt-menu-trigger="click"
                            data-kt-menu-placement="bottom-end"
                            data-kt-menu-flip="top-end"
                        >
                            <i class="bi bi-three-dots fs-3"></i>
                        </button>
                        <div
                            :id="'dropdownMenu-' + data.id"
                            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semobold py-4 w-100px fs-6"
                            data-kt-menu="true"
                        >
                            <div class="menu-item px-3">
                                <router-link  class="menu-link px-3" :to="{ name: 'externalUser-view', params: { id: data.id } }" >
                                    View
                                </router-link>
                            </div>
                            <div class="menu-item px-3">
                                <router-link class="menu-link px-3" :to="{ name: 'externalUser-edit',params: { id: data.id }}" >
                                    Edit
                                </router-link>
                            </div>
                            <div class="menu-item px-3">
                                <a
                                    @click="submitDelete(data.id)"
                                    class="menu-link px-3"
                                >
                                    Delete
                                </a>
                            </div>
                        </div>
                    </div>
                </template>
            </Datatable>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

/* Locale Components */
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import InfoItemTable from "@/components/info-item-table.vue";

/* Providers */
import {tableHeader} from '@/providers/externalUser';

/* Store */
import { useExternalUserStore } from '@/stores/externalUser';
import { storeToRefs } from "pinia";

const store = useExternalUserStore();
const { ListData, params } = storeToRefs(store);

const submitDelete = async (id) => {
  const confirmed = await Swal.fire({
    text: "Are you sure you want to delete this BusinessUnit?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (confirmed.isConfirmed) {
    await store.deleteItem(id).then(() => {
      Swal.fire({
        text: "Deleted Successfully!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn fw-semobold btn-light-primary",
        },
      });
      store.fetchItems();
    });
  }
};

const onPageSizeChange = (size) => {
  store.params.take = size;
  store.params.page = 1;
  store.fetchList();
};
const handlePageChange = (page) => {
  store.params.page = page;
  store.fetchItems();
};
const exportReport = () => {
  store.exportReport();
};
const handleSearch = (filters) => {
  store.params.filter = filters;
  store.fetchList();
};

onMounted(() => {
  store.fetchList();
});
onUnmounted(() => {
  store.resetItems();
});
</script>
