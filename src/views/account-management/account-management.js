import axios from "../../config/axios";
import headerContentAdmin from "@/components/header-content-admin";
import { useToast } from 'vue-toastification';
import { Modal } from 'usemodal-vue3';
import Loading from 'vue-loading-overlay';
const toast = useToast();

export default {
    name: "account",
    components: {
        headerContentAdmin,
        Modal,
        Loading
    },
    mounted() {
        this.getData();
        this.currentPage = 1;
        this.currentPageInput = this.currentPage.toString();
    },
    data() {
        return {
            titlePage: "Quản Lý Tài Khoản",
            totalPages: 0,
            listAccount: [],
            currentPage: "",
            disableTotalButton: false,
            totalDisplayedPages: 3,
            currentPageInput: "",
            page: 1,
            isVisibleConfirmDelete: false,
            postApproveId: null,
            postDeleteId: null,
            isLoading: false,
            usernameDelete: null,
            idDelete: null,
            isVisibleDealDetail: false,
            listDealDetail:[]
        }
    },
    methods: {
        getData() {
            this.isLoading = true;
            axios.get("/account/management?size=20&page=" + (this.page - 1))
                .then((response) => {
                    if (response.data.status == "error") {
                        this.message = response.data.message;
                        this.isVisibleConfirmDelete = false;
                    } else if (response.data.status == "success") {
                        this.totalPages = response.data.result.totalPages;
                        this.listAccount = response.data.result;
                        this.isVisibleConfirmDelete = false;
                    } else if (response.data.status == "not-found") {
                        this.message = response.data.message;
                        this.isVisibleConfirmDelete = false;
                    }
                    this.isLoading = false;
                })
        },
        deleteAccount() {
            this.isLoading = true;
            axios.delete("account/delete/" + this.idDelete)
                .then((response) => {
                    if (response.data.status == "error") {
                        toast.error(response.data.message)
                    } else if (response.data.status == "success") {
                        toast.success(response.data.message)
                        this.getData();
                    }
                    this.closeConfirmDelete();
                    this.isLoading = false;
                })
        },
        confirmDelete(id, name) {
            this.isVisibleConfirmDelete = true;
            this.idDelete = id;
            this.usernameDelete = name;
        },
        closeConfirmDelete() {
            this.isVisibleConfirmDelete = false;
            this.idDelete = null;
            this.usernameDelete = null;
        },
        dealDetail(id){
            console.log(id)
            axios.get("payment/deal-detail/"+ id)
            .then((response) => {
                if (response.data.status == "error") {
                    toast.error(response.data.message)
                } else if (response.data.status == "success") {
                    this.listDealDetail = response.data.result
                    this.isVisibleDealDetail = true
                }
            })
        },
        closeDealDetail(){
            this.isVisibleDealDetail = false
        }
    }
}