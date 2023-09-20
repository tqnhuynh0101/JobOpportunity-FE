<template>
    <div>
      <Loading :active="isLoading" :color="'#40B883'" :height="70" :width="70" backgroundColor="rgba(192,192,192,1)"
               :is-full-page="true" />
        <modal :visible="isVisibleConfirmDelete" width="600px" title="XÁC NHẬN XOÁ" :cancelButton="{
                            text: 'Trở lại',
                            onclick: closeConfirmDelete,
                        }" :okButton="{
                            text: 'Đồng ý',
                            onclick: deleteAccount,
                        }" zIndex="2000" :closable="false">
                            <div>
                                Bạn có chắc chắn muốn xóa {{ usernameDelete }} không ?
                            </div>
                        </modal>
                        <modal :visible="isVisibleDealDetail" width="600px" title="LỊCH SỬ GIAO DỊCH" :cancelButton="{
                            text: 'Trở lại',
                            onclick: closeDealDetail,
                        }" :okButton="{
                            text: 'Đồng ý',
                            onclick: closeDealDetail,
                        }" zIndex="2000" :closable="false">
                            <div>
                                <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Họ Tên</th>
                        <th scope="col">Thời gian</th>
                        <th scope="col">Số tiền</th>
                    </tr>
                </thead>
                <tbody style="vertical-align: middle;">
                    <tr v-for="detail in listDealDetail">
                        <td>{{ detail.createBy }}</td>
                        <td>{{ detail.createTime}}</td>
                        <td>{{ detail.amount }}</td>
                    </tr>
                </tbody>
            </table>
                            </div>
                        </modal>                
        <header-content-admin :title="titlePage"></header-content-admin>
        <div class="checkout wow fadeInUp" data-wow-delay="0.1s" style="overflow-y: auto; padding-top: 90px">

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Họ Tên</th>
                        <th scope="col">Tuổi</th>
                        <th scope="col">Giới Tính</th>
                        <th scope="col">Số Điện Thoại</th>
                        <th scope="col">Email</th>
                        <th scope="col">Tên Đăng Nhập</th>
                        <th scope="col">ROLE</th>
                        <th scope="col">Thao Tác</th>
                        <th scope="col">Xem giao dịch</th>
                    </tr>
                </thead>
                <tbody style="vertical-align: middle;">
                    <tr v-for="(account,index) in listAccount" v-bind:key="account.username" :class="{}">
                        <td scope="row">{{ index + 1 }}</td>
                        <td>{{ account.name }}</td>
                        <td>{{ account.age }}</td>
                        <td>{{ account.gender ? 'Nữ' : 'Nam' }}</td>
                        <td>{{ account.tel }}</td>
                        <td>{{ account.email }}</td>
                        <td>{{ account.username }}</td>
                        <td>{{ account.authority }}</td>
                        <td class="d-flex">
                            <button class="btn-delete" @click="confirmDelete(account.id, account.name)">
                                <icon icon="trash" style="height=1em" class="svgIcon"></icon>
                                <span class="tooltip">Xoá</span>
                            </button>
                            
                        </td>
                        <td><button class="btn-confirm" type="button" style="margin-left: 15px;" v-if="account.authority === 'ROLE_SEEKER'" @click="dealDetail(account.id)">
                                 <icon icon="fa-solid fa-pen-to-square" style="color: #23be25;">
                                    <span class="tooltip">Xem giao dịch</span></icon>
                            </button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script src="./account-management.js"></script>