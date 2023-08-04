import axios from "../../config/axios";
import headerContentAdmin from "@/components/header-content-admin";
import {useToast} from 'vue-toastification';
const toast = useToast();
import Loading from 'vue-loading-overlay';

export default {
    name : "skill-management",
    components: {
        headerContentAdmin,
        Loading
    },
    mounted(){
        this.getData();
    },
    data() {
        return {
            titlePage: "Quản Lý Kĩ Năng",
            listSkill: [],
            isLoading: false,
        }
    },
    methods: {
        getData(){
            this.isLoading = true;
            axios.get("/skill/get-all")
            .then((response)=>{
                if (response.data.status == "error") {
                    this.message = response.data.message;
                } else if (response.data.status == "success") {
                    this.listSkill = response.data.result;
                } else if (response.data.status == "not-found") {
                    this.message = response.data.message;
                }
                this.isLoading = false;
            })
        },
        deleteSkill(id){
            axios.delete("skill/delete/" + id)
            .then((response)=>{
                if (response.data.status == "error") {
                    toast.error(response.data.message) 
                } else if (response.data.status == "success") {
                    toast.success( response.data.message)
                    this.getData();
                }
            })
        },
        approveSkill(id){
            axios.put("skill/approve/" + id)
            .then((response)=>{
                if (response.data.status == "error") {
                    toast.error(response.data.message) 
                } else if (response.data.status == "success") {
                    toast.success( response.data.message)
                    this.getData();
                }
            })
        }
    }
}