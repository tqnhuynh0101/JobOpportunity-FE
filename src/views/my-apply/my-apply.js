import axios from "../../config/axios";
import {useToast} from 'vue-toastification';
import postDetail from "@/views/post-details/post-detail.vue";
import cvDetail from "@/views/cv-detail/cv-detail.vue";
import { Modal } from "usemodal-vue3";


const toast = useToast();

export default {
    name: "my-apply",
    components: {        
        postDetail,
        Modal,
        cvDetail
    },
    data(){
        return{
            listApplyPost: [],
            isVisibleViewPost: null,
            isVisibleViewPost: false,
            isVisibleViewCv: false,
            uuid: null,
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData(){
            axios.get("/apply-post/get-my-apply-post")
            .then((response) => {
                if (response.data.status == "error") {
                    this.message = response.data.message;
                } else if (response.data.status == "success") {
                    this.listApplyPost = response.data.result;
                }
            })
        },
        deleteApply(id){
            axios.put("/apply-post/delete-apply-post/"+ id)
            .then((response) => {
                if (response.data.status == "error") {
                    toast.error( response.data.message);
                } else if (response.data.status == "success") {
                    toast.success( response.data.message);
                    this.getData();
                }
            })
        },
        closeViewPost() {
            this.isVisibleViewPost = false;
        },
      
        openPostDetail(idView) {
            this.isVisibleViewPost = true;
            this.idView = idView;
        },
        openCv(uuid) {
            this.isVisibleViewCv = true;
            this.uuid = uuid;
        },
        closeViewCv() {
            this.isVisibleViewCv = false;
        },
    }
}