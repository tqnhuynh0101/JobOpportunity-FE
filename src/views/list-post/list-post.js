import axios from "../../config/axios";
import { VAutocomplete } from 'vuetify/lib/components/VAutocomplete';
import VuejsPaginate from 'vuejs-paginate';
import post from "../post/post.vue";
import Loading from 'vue-loading-overlay';
export default {
  name: "list-post",
  components: {
    VAutocomplete,
    VuejsPaginate,
    post,
    Loading
  },
  mounted() {
    this.getAllPost();
    this.getProvince();
    this.currentPage = 1;
    this.currentPageInput = this.currentPage.toString();
  },
  data() {
    return {
      listPost: [],
      totalPages: 0,
      // pageNumber: 0,
      page: 1,
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
      disableTotalButton: false,
      currentPage: "",
      totalDisplayedPages: 3,
      search: null,
      currentPageInput: "",
      isLoading: false,
    };
  },
  methods: {
    getAllPost() {
      this.isLoading = true;
      axios.get("post/get-all?size=10&page=" + this.page)
        .then((response) => {
          if (response.data.status == "error") {
            this.message = response.data.message;
          } else if (response.data.status == "success") {
            this.totalPages = response.data.result.totalPages;
            this.listPost = response.data.result.content;
          } else if (response.data.status == "not-found") {
            this.message = response.data.message;
          }
          this.isLoading = false;
        });
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

    changePage(pageNumber) {
      if (pageNumber > this.page && this.page === this.totalPages) {
        return;
      }
      if (pageNumber < this.page && this.page === 0) {
        return;
      }
      this.page = pageNumber;
      this.currentPage = pageNumber;
      this.currentPageInput = this.currentPage.toString();
      this.getAllPost();
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
        this.getAllPost();
      }
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
};
