import axios from "../../config/axios";
import {useToast} from 'vue-toastification';
import Loading from 'vue-loading-overlay';
const toast = useToast();

export default {
    name: "my-apply",
    data(){
        return{
            listApplyPost: []
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
        }
    }
}