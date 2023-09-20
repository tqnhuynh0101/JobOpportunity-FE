import axios from "../../config/axios";
import { VAutocomplete } from 'vuetify/lib/components/VAutocomplete';
import post from "../post/post.vue";
import Loading from 'vue-loading-overlay';

export default {
    name: "home",
    components: {
        VAutocomplete,
        post,
        Loading
    },
    mounted() {
        this.getAllPost();
        this.getProvince();
    },
    data() {
        return {
            listPost: [],
            totalPages: 0,
            page: 0,
            message: "",
            messageProvinces: "",
            listProvince: [],
            selectedProvince: null,
            messageDistrict: "",
            listDistrict: [],
            selectedDistrict: null,
            selectedWard: null,
            messageWard: "",
            listWard: [],
            messageNotFound: "",
            isLoading: false,
            listPostSearch: [],
            search: null,
        };

    },
    methods: {
        getAllPost() {
            this.isLoading = true;
            axios.get("post/get-20-newest-posts")
                .then((response) => {
                    if (response.data.status == "error") {
                        this.message = response.data.message;
                    } else if (response.data.status == "success") {
                        this.listPost = response.data.result;
                    } else if (response.data.status == "not-found") {
                        this.message = response.data.message;
                    }
                    this.isLoading = false;
                })
        },
        getAllPostByAddress() {
            this.isLoading = true;
            axios.get("post/search?"+"search=" + this.search + "&provinceId=" + this.selectedProvince + "&districtId=" + this.selectedDistrict + "&wardId=" + this.selectedWard)
              .then((response) => {
                this.listPost = [];
                if (response.data.status == "error") {
                  this.message = response.data.message;
                } else if (response.data.status == "success") {
                  this.messageNotFound = "";
                  this.listPost = response.data.result;
                } else if (response.data.status == "not-found") {
                  this.messageNotFound = response.data.message;
                }
                this.isLoading = false;
              });
        },
        
    getProvince() {
        this.isLoading = true;
        axios.get("provinces/get-all")
          .then((response) => {
            if (response.data.status == "error") {
              this.messageProvinces = response.data.message;
            } else if (response.data.status == "success") {
              this.listProvince = response.data.result;
            } else if (response.data.status == "not-found") {
              this.messageProvinces = response.data.message;
            }
            this.isLoading = false;
          });
      },
      getDistrict(provinceCode) {
        this.isLoading = true;
        axios.get("districts/get-by-province-code/" + provinceCode)
          .then((response) => {
            if (response.data.status == "error") {
              this.messageWard = response.data.message;
            } else if (response.data.status == "success") {
              this.listDistrict = response.data.result;
            } else if (response.data.status == "not-found") {
              this.messageWard = response.data.message;
              this.listDistrict = [];
            }
            this.isLoading = false;
          });
      },
      getWard(districtCode) {
        this.isLoading = true;
        axios.get("wards/get-by-district-code/" + districtCode)
          .then((response) => {
            if (response.data.status == "error") {
              this.messageWard = response.data.message;
            } else if (response.data.status == "success") {
              this.listWard = response.data.result;
            } else if (response.data.status == "not-found") {
              this.messageWard = response.data.message;
              this.listWard = [];
            }
            this.isLoading = false;
          });
      },
    },
    watch: {
        selectedProvince(newValue, oldValue) {
          this.getDistrict(newValue);
          this.selectedDistrict = null;
          this.selectedWard = null;
        },
        selectedDistrict(newValue, oldValue) {
          this.getWard(newValue);
          this.selectedWard = null;
        },
      }
}
