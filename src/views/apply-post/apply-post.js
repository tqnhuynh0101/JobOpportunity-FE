import axios from "../../config/axios";
import headerContentAdmin from "@/components/header-content-admin";
import cvDetail from "@/views/cv-detail/cv-detail.vue";
import { Modal } from "usemodal-vue3";
import postDetail from "@/views/post-details/post-detail.vue";
import Loading from 'vue-loading-overlay';
import { useToast } from 'vue-toastification';

const toast = useToast();

export default {
    name: "apply-post",
    components: {
        headerContentAdmin,
        Modal,
        Loading,
        postDetail,
        cvDetail
    },
    mounted(){
        this.getData();
    },
    data() {
        return {
            titlePage: "Quản Lý Ứng Viên",
            listApplyPost: [],
            isLoading: false,
            isVisibleConfirmRefuse: false,
            isVisibleConfirm: false,
            message:"",
            date:"",
            type:"",
            id:"",
            isVisibleViewCv: false,
            uuid: null,
            isVisibleViewPost: null,
            isVisibleViewPost: false,
        }
    },
    methods: {
        getData() {
            this.isLoading = true;
            axios.get("/apply-post/get-by-poster")
           .then((response) => {
            if (response.data.status == "error") {
                this.message = response.data.message;
            } else if (response.data.status == "success") {
                this.listApplyPost = response.data.result;
            } else if (response.data.status == "not-found") {
                this.message = response.data.message;
            }
            this.isLoading = false;
        })
        },
        openCv(uuid) {
            this.isVisibleViewCv = true;
            this.uuid = uuid;
        },
        closeViewCv() {
            this.isVisibleViewCv = false;
        },
        closeViewPost() {
            this.isVisibleViewPost = false;
        },
      
        openPostDetail(idView) {
            this.isVisibleViewPost = true;
            this.idView = idView;
        },
        confirmApply(){
            axios.post("/apply-post/confirm?id="+ this.id+"&type="+this.type+"&message="+this.message+"&date="+ this.date)
           .then((response) => {
            if (response.data.status == "error") {
                toast.error(response.data.message);
            } else if (response.data.status == "success") {
                toast.success(response.data.message)
                this.getData();
            }
        })
        },
        closeComfirmRefuse(){
            this.isVisibleConfirmRefuse = false;
        },
        closeComfirm(){
            this.isVisibleConfirm = false;
        },
        ConfirmRefuse(id){
            this.id = id;
            this.isVisibleConfirmRefuse = true;
        },
        Refuse(){
            this.type ="1";
            this.confirmApply()
            this.type = "";
            this.id = "";
            this.isVisibleConfirmRefuse = false;
        },
        ConfirmAgree(id){
            this.id = id;
            this.isVisibleConfirm = true;
        },
        Confirm(){
            this.type = "2";
            this.confirmApply()
            this.type = "";
            this.id =""
            this.isVisibleConfirm = false;
        }

    }
}
