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
          accountId : null
        }
    },
    
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (to.params.id) {
                vm.accountId = to.params.id;
            }
            else {
                this.$router.push({name: 'ForgetPassword'})
            }
        });
    },
    components: {
        Loading
    },
    methods: {
        importOtp(){
            this.Loading = true
            console.log(this.accountId)
            axios.put("account/check-otp?otp="+this.otp+"&id="+this.accountId)
            .then((respone) => {
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
