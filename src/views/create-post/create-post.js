import axios from "../../config/axios";
import headerContentAdmin from "@/components/header-content-admin";
import { useToast } from 'vue-toastification';
import {Modal} from 'usemodal-vue3';
import { flat } from "@/assets/fontawesome-free-6.4.0-web/js/v4-shims";

import Loading from 'vue-loading-overlay';
const toast = useToast();
var regex_number = /^[1-9]$/;

export default {
  components: {
    headerContentAdmin,
    Modal,
    Loading
  },
  mounted() {
    this.checkButton();
    this.getBaseSkill();
    this.getProvince();
  },
  data() {
    return {
      titlePage: "Tạo Bài Đăng",
      title: "",
      content: "",
      quantity: 1,
      ageMax: "",
      ageMin: "",
      gender: 0,
      experience: 1,
      type: "PART_TIME",
      format: "OFFLINE",
      position: "",
      requirements: "",
      benafit: "",
      duty: "",
      salary: false,
      salaryCheck: false,
      salaryMax: 0,
      salaryMin: 0,
      unit: "USD",
      company: "",
      tel: "",
      email: "",
      isValid: false,
      message: "",
      messageMaxAge: "",
      messageMinAge: "",
      messageTitle: "",
      messageContent: "",
      messageQuantity: "",
      messageExperience: "",
      messagePosition: "",
      messageRequirements: "",
      messageBenafit: "",
      messageDuty: "",
      messageSalaryMax: "",
      messageSalaryMin: "",
      messageCompany: "",
      messageTel: "",
      messageEmail: "",
      image: null,
      previewSrc: null,
      listSkill: [],
      newSkill: null,
      listBaseSkill: [],
      skillSelect: null,
      listProvince: [],
      selectedProvince: null,
      listDistrict: [],
      selectedDistrict: null,
      selectedWard: null,
      listWard: [],
      address: null,
      isVisibleConfirmSave: false,
      isLoading: false,
      expiredDate: null,
    };
  },
  methods: {
    getBaseSkill() {
      this.isLoading = true;
      axios.get("skill/base-skill")
        .then((response) => {
          if (response.data.status == "error") {
            this.message = response.data.message;
          } else if (response.data.status == "success") {
            this.listBaseSkill = response.data.result;
          } else if (response.data.status == "not-found") {
            this.message = response.data.message;
          }
          this.isLoading = false;
        })
    },
    addSkill() {
      this.isLoading = true;
      if(this.skillSelect) {
        this.skillSelect = this.skillSelect.trim();
      }
      if(this.newSkill) {
        this.newSkill = this.newSkill.trim();
      }
      if(this.skillSelect || this.newSkill) {
        if (!this.listSkill.includes(this.skillSelect)) {
          this.listSkill.push(this.skillSelect);
        } else {
          toast.error("Kỹ năng đã tồn tại!");
        }
        this.skillSelect = null;
        this.newSkill = null;
      }
      this.isLoading = false;
    },
    addNewDataSkill() {
      this.isLoading = true;
      if(this.skillSelect) {
        this.skillSelect = this.skillSelect.trim();
      }
      if(this.newSkill) {
        this.newSkill = this.newSkill.trim();
      }
      if(this.skillSelect || this.newSkill) {
        if (!this.listSkill.includes(this.newSkill)) {
          this.listSkill.push(this.newSkill);
        } else {
          toast.error("Kỹ năng đã tồn tại!");
        }
        this.newSkill = null;        
      }
      this.isLoading = false;
      
    },
    deleteSkill(index) {
      this.listSkill.splice(index, 1);
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
            this.message = response.data.message;
          } else if (response.data.status == "success") {
            this.listDistrict = response.data.result;
          } else if (response.data.status == "not-found") {
            this.message = response.data.message;
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
            this.message = response.data.message;
          } else if (response.data.status == "success") {
            this.listWard = response.data.result;
          } else if (response.data.status == "not-found") {
            this.message = response.data.message;
            this.listWard = [];
          }
          this.isLoading = false;
        });
    },
    save() {
      if(this.title.length <3){
        this.messageTel = "Vui lòng không để trống trường này và giá trị phải trên 3 kí tự !"
        toast.warning("Vui lòng không để trống trường này và giá trị phải trên 3 kí tự !")
        return;
      }
      if(this.content.length < 3){
        this.messageContent = "Vui lòng nội dung trên 3 kí tự và không được để trống trường này !"
        toast.warning("Vui lòng nội dung trên 3 kí tự và không được để trống trường này !")
        return;
      }
      if(!this.validateNumber(quantity)){
          this.messageQuantity = "Vui lòng nhập kiểu số vào trường này!"
          toast.warning("Vui lòng nhập kiểu số vào trường này!")
          return;
      }
      // if(!this.isBiggerThan(quantity, 0)){
      //     this.messageQuantity = "Nhập số chưa hợp lệ"
      //     toast.warning("Nhập số chưa hợp lệ")
      //     return;
      // }
      
      if(!this.validateNumber(experience)){
        this.messageExperience = "Vui lòng nhập kiểu số cho trường này !"
        toast.warning("Vui lòng nhập kiểu số cho trường này !")
        return;
      }
      // if(!this.isBiggerThan(experience, 0)){
      //   this.messageQuantity = "Nhập số chưa hợp lệ"
      //   toast.warning("Nhập số chưa hợp lệ")
      //   return;
      // }
      if(!this.validateNumber(ageMax)){
        this.messageMaxAge = "Vui lòng nhập kiểu số cho trường này !"
        toast.warning("Vui lòng nhập kiểu số cho trường này !")
        return;
      }
      // if(!this.isBiggerThan(ageMax, 0)){
      //   this.messageQuantity = "Nhập số chưa hợp lệ"
      //   toast.warning("Nhập số chưa hợp lệ")
      //   return;
      // }
      if(!this.validateNumber(ageMin)){
        this.messageMinAge = "Vui lòng nhập kiểu số cho trường này !"
        toast.warning("Vui lòng nhập kiểu số cho trường này !")
        return;
      }
      // if(!this.isBiggerThan(ageMin, 0)){
      //   this.messageQuantity = "Nhập số chưa hợp lệ"
      //   toast.warning("Nhập số chưa hợp lệ")
      //   return;
      // }
      if(this.ageMax <= this.ageMin){
        this.messageMaxAge = "Tuổi lớn nhất phải lớn hơn tuổi nhỏ nhất. Vui lòng nhập lại !"
        toast.warning("Tuổi lớn nhất phải lớn hơn tuổi nhỏ nhất. Vui lòng nhập lại !")
        return;
      }
      if (this.position.length < 3){
        this.messagePosition = "Vui lòng nhập nội dung trường này trên 3 kí tự !"
        toast.warning("Vui lòng nhập nội dung trường này trên 3 kí tự !")
        return;
      }
      if (this.requirements.length < 3){
        this.messageRequirements = "Vui lòng nhập nội dung trường này trên 3 kí tự !"
        toast.warning("Vui lòng nhập nội dung trường này trên 3 kí tự ! ")
        return;
      }
      if(this.benafit.length < 3){
        this.messageBenafit = "Vui lòng nhập nội dung trường này trên 3 kí tự !"
        toast.warning("Vui lòng nhập nội dung trường này trên 3 kí tự !")
        return
      }
      if(this.duty.length < 3){
        this.messageDuty = "Vui lòng nhập nội dung trường này trên 3 kí tự !"
        toast.warning("Vui lòng nhập nội dung trường này trên 3 kí tự !")
        return
      }
      if(!this.validateNumber(salaMax)){
        this.messageSalaryMax = "Vui lòng nhập giá trị số cho trường này !"
        toast.warning("Vui lòng nhập giá trị số cho trường này !")
        return;
      }
      // if(!this.isBiggerThan(salaMax, 0)){
      //   this.messageQuantity = "Nhập số chưa hợp lệ"
      //   toast.warning("Nhập số chưa hợp lệ")
      //   return;
      // }
      if(!this.validateNumber(salaMin)){
        this.messageSalaryMin = " Vui lòng nhập giá trị số cho trường này!"
        toast.warning("Vui lòng nhập giá trị số cho trường này")
        return;
      }
      // if(!this.isBiggerThan(salaMin, 0)){
      //   this.messageQuantity = "Nhập số chưa hợp lệ"
      //   toast.warning("Nhập số chưa hợp lệ")
      //   return;
      // }
      if(this.salaMax <= this.salaMin){
        this.messageMaxAge = "Lương lớn nhất phải lớn hơn Lương nhỏ nhất. Vui lòng nhập lại !"
        toast.warning("Lương lớn nhất phải lớn hơn Lương nhỏ nhất. Vui lòng nhập lại !")
        return;
      }
      // if(this.salaryMax <= this.salaryMin){
      //   console.log(this.salaryMax)
      //   console.log(this.salaryMin)

      //   this.messageSalaryMax = "Lương tối đa phải lớn hơn lương tối thiểu. Vui lòng nhập lại !"
      //   toast.warning("Lương tối đa phải lớn hơn lương tối thiểu. Vui lòng nhập lại !")
      //   return;
      // }
      if(this.salary == "false"){
        this.salaryMax = 0;
        this.salaryMin = 0;
      }
      if(this.company.length < 3){
        this.messageCompany = "Vui lòng nhập nội dung trường này trên 3 kí tự !"
        toast.warning("Vui lòng nhập nội dung trường này trên 3 kí tự !")
        return
      }
      if (!this.ValidateEmail()) {
        this.messageEmail = "Vui lòng nhập đúng định dạng của email!";
        toast.warning("Vui lòng nhập đúng định dạng của email!")
        return;
      }
      if (!this.ValidateTel()) {
        this.messageTel = "Vui lòng nhập đúng định dạng của phone!";
        toast.warning("Vui lòng nhập đúng định dạng của phone!")
        return;
      }
      // if(this.salary =='true') {
      //   this.salaryMax = 0;
      //   this.salaryMin = 0;
      // }
      const formData = new FormData();
      formData.append('file', this.image);
      formData.append('post', JSON.stringify({
        "title": this.title,
        "content": this.content,
        "quantity": this.quantity,
        "ageMax": this.ageMax,
        "ageMin": this.ageMin,
        "gender": this.gender,
        "experience": this.experience,
        "type": this.type,
        "format": this.format,
        "position": this.position,
        "requirement": this.requirements,
        "benafit": this.benafit,
        "duty": this.duty,
        "salary": this.salary,
        "salaryMin": this.salaryMin,
        "salaryMax": this.salaryMax,
        "unit": this.unit,
        "company": this.company,
        "tel": this.tel,
        "email": this.email,
        "skillPostList": this.listSkill,
        "provinceId": this.selectedProvince,
        "districtId": this.selectedDistrict,
        "wardId": this.selectedWard,
        "address": this.address,
        "expiredDate": this.convertToYYYYMMDD(this.expiredDate)
      }));
      this.isLoading = true;
      axios.post('post/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          if (response.data.status == "error") {
            toast.error(response.data.message);
            this.isVisibleConfirmSave = false;
          } else if (response.data.status == "success") {
            toast.success(response.data.message);
            this.isVisibleConfirmSave = false;
          }
          this.isLoading = false;
        })
        .catch(error => {

        });
    },
    ValidateEmail() {
      var regix =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (regix.test(this.email)) {
        return true;
      }
      return false;
    },
    previewImage(event) {
      const file = event.target.files[0];
      this.image = file;
      const reader = new FileReader();

      reader.onload = () => {
        this.previewSrc = reader.result;
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    confirmSave() {
      this.isVisibleConfirmSave = true;
    },
    closeConfirm() {
      this.isVisibleConfirmSave = false;
    },

      ValidateTel() {
        var regix = /^0([3|5|7|8|9])([0-9]){8}$/;

        if (regix.test(this.tel)) {
          return true;
        }
        return false;
      },
      isBiggerThan(input, digit){
        return input > digit 
      },
      
      validateNumber(result) {
        if (isNaN(result) || !this.isBiggerThan(result,0)) {
          return true;
        } else {
          return false;
        }
      },
      

      // đang bị bug ngay chỗ button này
      checkButton() {
        if (
          this.title.length >= 3 &&
          this.content.length >= 3 &&
          this.validateNumber(this.quantity) &&
          this.validateNumber(this.experience) &&
          this.ageMax > this.ageMin &&
          this.validateNumber(this.ageMax) &&
          this.validateNumber(this.ageMin) &&
          this.requirements.length >= 3 &&
          this.benafit.length >= 3 &&
          this.duty.length >= 3 &&
          this.position.length >= 3 &&
          ((this.validateNumber(this.salaryMax) && this.validateNumber(this.salaryMin)) || this.salary === 'false') &&
          this.salaryMax > this.salaryMin &&
          this.company.length >= 3 &&
          this.ValidateEmail() &&
          this.ValidateTel() &&
          this.skillSelect !== null &&
          this.selectedWard !== null
        ) {
          this.isValid = true;
        } else {
          this.isValid = false;
        }
      },
      convertToYYYYMMDD(inputString) {
        // Xóa tất cả các dấu gạch ngang khỏi chuỗi
        const cleanedString = inputString.replace(/-/g, '');
      
        return cleanedString;
      }
      

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
    title(newValue, oldValue){
          if(newValue.length == 0){
            this.messageTitle = "Vui lòng không để trống trường này !"
          }else if(newValue.length <3){
            this.messageTitle = "Vui lòng nhập tên tiêu đề trên 3 kí tự !"
          }else{
            this.messageTitle=""
          }
          this.checkButton();
        },

        content(newValue, oldValue){
          if(newValue.length == 0){
            this.messageContent = "Vui lòng không để trống trường này !"
          }else if(newValue.length < 3){
            this.messageContent = "Vui lòng nội dung trên 3 kí tự !"
          }else{
            this.messageContent = ""
          }
          this.checkButton();
        },

        quantity(newValue, oldValue){
          if(newValue.length == 0){
            this.messageQuantity = "Vui lòng không để trống trường này !"
          }else if(this.validateNumber(newValue)){
            this.messageQuantity = "Vui lòng nhập số hợp lệ! !"
          }else
            this.messageQuantity = ""
          this.checkButton();
        },

        experience(newValue, oldValue){
          if(newValue.length == 0){
            this.messageExperience = "Vui lòng không để trống trường này !"
          }else if(this.validateNumber(newValue)){
            this.messageExperience = "Vui lòng nhập số hợp lệ!"
          }else{
            this.messageExperience = ""
          }
          this.checkButton();
        },

        ageMax(newValue, oldValue){
          if(newValue.length == 0){
            this.messageMaxAge = "Vui lòng không để trống trường này !"
          }else if(newValue > 60 || newValue < 18){
            this.messageMaxAge = "Độ tuổi lớn nhất phải nhỏ hơn 60 và lớn hơn 18!"
          }else if(this.ageMax <= this.ageMin){
            this.messageMaxAge = "Tuổi lớn nhất phải lớn hơn tuổi nhỏ nhất. Vui lòng nhập lại "
          } else if(this.validateNumber(newValue)){
            this.messageMaxAge = "Vui lòng nhập số hợp lệ!"
          }else{
            this.messageMaxAge = ""
          }
          this.checkButton();
        },

        ageMin(newValue, oldValue){
          if(newValue.length == 0){
            this.messageMinAge = "Vui lòng không để trống trường này !"
          }else if(newValue <18 || newValue > 60){
            this.messageMinAge = "Độ tuổi nhỏ nhất phải lớn hơn 18 và nhỏ hơn 60!"
          }else if(this.ageMax <= this.ageMin){
            this.messageMinAge = "Tuổi lớn nhất phải lớn hơn tuổi nhỏ nhất. Vui lòng nhập lại "
          } else if(this.validateNumber(newValue)){
            this.messageMinAge = "Vui lòng nhập số hợp lệ!"
          }else{
            this.messageMinAge = ""
          }
          this.checkButton();
        },

        requirements(newValue, oldValue){
          if(newValue.length == 0){
            this.messageRequirements = "Vui lòng không để trống trường này !"
          }else if (newValue.length < 3){
            this.messageRequirements = "Vui lòng nhập nội dung trường này trên 3 kí tự !"
          }else{
            this.messageRequirements = ""
          }
          this.checkButton();
        },

        position(newValue, oldValue){
          if(newValue.length == 0){
            this.messagePosition = "Vui lòng không để trống trường này !"
          }else if (newValue.length < 3){
            this.messagePosition = "Vui lòng nhập nội dung trường này trên 3 kí tự !"
          }else{
            this.messagePosition = ""
          }
          this.checkButton();
        },

        benafit(newValue, oldValue){
          if(newValue.length == 0){
            this.messageBenafit = "Vui lòng không để trống trường này !"
          }else if(newValue.length < 3){
            this.messageBenafit = "Vui lòng nhập nội dung trường này trên 3 kí tự !"
          }else{
            this.messageBenafit = ""
          }
          this.checkButton();
        },

        duty(newValue, oldValue){
          if(newValue.length == 0){
            this.messageDuty = "Vui lòng không để trống trường này !"
          }else if(newValue.length < 3){
            this.messageDuty = "Vui lòng nhập nội dung trường này trên 3 kí tự !"
          }else{
            this.messageDuty = ""
          }
          this.checkButton();
        },

        salary(newValue, oldValue) {
          if(newValue == 'true') {
            this.salaryCheck = false;
          } else {
            this.salaryCheck = true;
          }
          this.checkButton();
        },

        salaryMax(newValue, oldValue){
            if(newValue.length == 0){
              this.messageSalaryMax = "Vui lòng không để trống trường này"
            }else if(newValue <= this.salaryMin){
              console.log(1111111)
              this.messageSalaryMax = "Lương lớn nhất phải lớn hơn Lương nhỏ nhất. Vui lòng nhập lại "
            }else if(this.validateNumber(newValue)){
              this.messageSalaryMax = "Vui lòng nhập số hợp lệ!"
            }else{
              this.messageSalaryMax = ""
            }
            this.checkButton();
        },

        salaryMin(newValue, oldValue){
            if(newValue.length == 0){
              this.messageSalaryMin = "Vui lòng không để trống trường này"
            }else if(this.salaryMax <= this.salaryMin){
              this.messageSalaryMin = "Lương lớn nhất phải lớn hơn Lương nhỏ nhất. Vui lòng nhập lại "
            }else if(this.validateNumber(newValue)){
              this.messageSalaryMin = "Vui lòng nhập số hợp lệ!"
            }else{
              this.messageSalaryMin = ""
            }
            this.checkButton();
        },

        company(newValue, oldValue){
          if(newValue.length == 0){
            this.messageCompany = "Vui lòng không để trống !"
          }else if (newValue.length < 3){
            this.messageCompany = "Vui lòng nhập giá trị trên 3 kí tự !"
          }else{
            this.messageCompany = ""
          }
          this.checkButton();
        },

        tel(newValue, oldValue){
          if(newValue.length == 0){
            this.messageTel ="Vui lòng không để trống !"
          }else if(!this.ValidateTel()){
            this.messageTel = "Vui lòng nhập đúng định dạng của số điện thoại!";
          }else{
            this.messageTel= "";
          }
          this.checkButton();
        },

        email(newValue, oldValue) {
          if(newValue.length == 0){
            this.messageEmail ="Vui lòng không để trống !"
          }else if(!this.ValidateEmail()){
            this.messageEmail = "Vui lòng nhập đúng định dạng của email!";
          }else{
            this.messageEmail= "";
          }
          this.checkButton();
        },
  }

};