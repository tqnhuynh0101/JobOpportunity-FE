import axios from "../../config/axios";
import headerContentAdmin from "@/components/header-content-admin";
import { useToast } from 'vue-toastification';
import { Modal } from 'usemodal-vue3';
import Loading from 'vue-loading-overlay';
const toast = useToast();

export default {
    name: "post-management",
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
            titlePage: "Quản Lý Bài Viết",
            totalPages: 0,
            listPost: [],
            currentPage: "",
            disableTotalButton: false,
            totalDisplayedPages: 3,
            currentPageInput: "",
            page: 1,
            isVisibleConfirmDelete: false,
            isVisibleConfirmApprove: false,
            postApproveId: null,
            postDeleteId: null,
            isLoading: false,
            currentPageInput: ""
        }
    },
    methods: {
        getData() {
            this.Loading = true;
            axios.get("/post/admin-post?size=20&page=" + (this.page - 1))
                .then((response) => {
                    if (response.data.status == "error") {
                        this.message = response.data.message;
                        this.isVisibleConfirmDelete = false;
                    } else if (response.data.status == "success") {
                        this.totalPages = response.data.result.totalPages;
                        this.listPost = response.data.result.content;
                        this.isVisibleConfirmDelete = false;
                    } else if (response.data.status == "not-found") {
                        this.message = response.data.message;
                        this.isVisibleConfirmDelete = false;
                    }
                    this.Loading = false;
                })
        },
        deletePost() {
            if(this.postDeleteId != null){
                axios.put("/post/delete/" + this.postDeleteId)
                .then((response) => {
                    if (response.data.status == "error") {
                        toast.error(response.data.message);
                        this.isVisibleConfirmDelete = false;
                    } else if (response.data.status == "success") {
                        toast.success(response.data.message)
                        this.isVisibleConfirmDelete = false;
                        this.getData();
                    }
                })
            }
            
        },
        approvePost() {
            if(this.postApproveId != null){
                axios.put("/post/approve/" + this.postApproveId)
                .then((response) => {
                    if (response.data.status == "error") {
                        toast.error(response.data.message);
                        this.isVisibleConfirmApprove = false;
                    } else if (response.data.status == "success") {
                        toast.success(response.data.message)
                        this.isVisibleConfirmApprove = false;
                        this.getData();
                    }
                })
            }
        },
        changePage(pageNumber) {
            if (pageNumber > this.page && this.page === this.totalPages) {
                return;
            }
            if (pageNumber < this.page && this.page === 1) {
                return;
            }
            this.page = pageNumber;
            this.currentPage = pageNumber;
            this.currentPageInput = this.currentPage.toString();
            this.getData();
        },
        updateCurrentPage() {
            const parsedValue = parseInt(this.currentPageInput);
            if (isNaN(parsedValue) || parsedValue <= 0) {
                this.currentPage = 1;
                this.currentPageInput = "";
            } else {
                this.currentPage = Math.max(Math.min(parsedValue, this.totalPages), 1);
                this.currentPageInput = this.currentPage.toString();
                this.page = this.currentPage;
                this.getData();
            }
        },
        confirmDetele(id) {
            this.postDeleteId = id;
            this.isVisibleConfirmDelete = true;
        },
        confirmApprove(id) {
            this.postApproveId = id;
            this.isVisibleConfirmApprove = true;
        },
        closeConfirmDelete() {
            this.postDeleteId = null
            this.isVisibleConfirmDelete = false;
        },
        closeConfirmApprove() {
            this.postApproveId = null
            this.isVisibleConfirmApprove = false;
        },
    },
    computed: {
        isLastPage() {
          return this.page === this.totalPages;
        },
        isFirstPage() {
          return this.page === 1;
        },
        displayedPages() {
            const startPage = Math.max(this.currentPage - Math.floor(this.totalDisplayedPages / 2), 1);
            const endPage = Math.min(startPage + this.totalDisplayedPages - 1, this.totalPages);
            return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
          },
      },
}
