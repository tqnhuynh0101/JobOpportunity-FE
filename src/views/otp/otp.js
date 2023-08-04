import axios from "../../config/axios";
import {useToast} from 'vue-toastification';
const toast = useToast();
import Loading from 'vue-loading-overlay';


export default {
    name: "otp",
    mounted() {
       
    },
    data() {
        return {
          otp: '',
          accountId :'33'
        }
    },
    components: {
        Loading
    },
    methods: {
        importOtp(){
            this.Loading = true
            axios.put("account/check-otp",{
                accountId : this.accountId,
                otp : this.otp
            }).then((respone) => {
                if(respone.data.status === "error"){
                    toast.error(respone.data.message)
                }else if (respone.data.status === "success"){
                    toast.success(respone.data.message)
                    this.$router.push({name: 'Login'})
                } this.Loading = false;
            })
            
        }
    },
   
  };
