
<template>
    <section>
        <div
            id="kt_app_content_container"
            class="app-container container-fluid"
        >
            <div
                class="card mb-5 mb-xl-10"
                id="kt_externalUser_details_view"
            >
                <div class="card-header cursor-pointer">
                    <!--begin::Card title-->
                    <div class="card-title m-0">
                        <h3 class="fw-bold m-0">externalUser Details</h3>
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
                            Actions
                            <KTIcon icon-name="down" icon-class="fs-2 me-0" />
                        </a>
                        <div
                            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semobold py-4 w-100px fs-6"
                            data-kt-menu="true"
                        >
                            <div class="menu-item px-5">
                                <router-link
                                    :to="{
                                        name: 'externalUser-edit',
                                        params: { id: viewData.id },
                                    }"
                                    class="menu-link align-self-center"
                                    >Edit</router-link
                                >
                            </div>
                            <div class="menu-item px-5">
                                <a
                                    @click="submitDelete()"
                                    href="#"
                                    class="menu-link align-self-center text-danger"
                                >
                                    Delete
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
                                        <!-- email -->
                                        <info-item
                                            label="Email"
                                            :data="viewData.email"
                                            type="email"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- fullName -->
                                        <info-item
                                            label="FullName"
                                            :data="viewData.fullName"
                                            type="string"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- provider -->
                                        <info-item
                                            label="Provider"
                                            :data="viewData.provider"
                                            type="string"
                                        />
                                    </div>
                                    <!-- externalUseruser -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            label="ExternalUseruser"
                                            :data="viewData.externalUseruser"
                                            type="hasOne"
                                            displayName="email"
                                        />
                                    </div>
                                    <!-- owner -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            label="Owner"
                                            :data="viewData.owner"
                                            type="hasOne"
                                            displayName="email"
                                        />
                                    </div>
                                    <!-- businessUnit -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            label="BusinessUnit"
                                            :data="viewData.businessUnit"
                                            type="hasOne"
                                            displayName="code"
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
import { ref, onMounted, onUnmounted } from 'vue';
import { useExternalUserStore } from '@/stores/externalUser';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import InfoItem from '@/components/info-item.vue';
export default {
    components: {
        InfoItem,
    },
    setup() {
        const externalUserEntity = useExternalUserStore();
        const viewData = ref({});
        const router = useRouter();
        const submitDelete = async () => {
            const confirmed = await Swal.fire({
                text: 'Are you sure you want to delete this externalUser?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
            });
            if (confirmed.isConfirmed) {
                try {
                    await externalUserEntity
                        .deleteItem(viewData.value.id)
                        .then(() => {
                            router.push({ name: 'externalUser-list' });
                            Swal.fire({
                                text: 'Deleted Successfully!',
                                icon: 'success',
                                buttonsStyling: false,
                                confirmButtonText: 'Ok, got it!',
                                heightAuto: false,
                                customClass: {
                                    confirmButton:
                                        'btn fw-semobold btn-light-primary',
                                },
                            });
                        });
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        text: 'An error occurred while deleting the externalUserEntity',
                        icon: 'error',
                        buttonsStyling: false,
                        confirmButtonText: 'Ok, got it!',
                        heightAuto: false,
                        customClass: {
                            confirmButton: 'btn fw-semobold btn-light-primary',
                        },
                    });
                }
            }
        };
        onMounted(async () => {
            await externalUserEntity.fetchItem(router.currentRoute.value.params.id);
            viewData.value = externalUserEntity.itemData;
        });
        onUnmounted(() => {
            externalUserEntity.resetItemData();
        });

        return {
            viewData,
            submitDelete,
        };
    },
};
</script>

