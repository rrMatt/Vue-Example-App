<template>
    <section>
        <header>
            <h2>Users</h2>
            <p>
                <el-button type="primary" @click="startCreate()">
                    <i class="fa fa-plus" aria-hidden="true"></i> Create
                </el-button>
                <span class="pull-right">Total users {{userCount}}</span>
            </p>
        </header>
        <el-table :data="users" strip border v-loading.body="loading">
            <el-table-column
                prop="firstName"
                label="First Name">
            </el-table-column>
            <el-table-column
                prop="lastName"
                label="Last Name">
            </el-table-column>
            <el-table-column
                prop="email"
                label="Email">
            </el-table-column>
            <el-table-column label="Actions">
                <template scope="scope">
                    <el-button-group>
                        <el-button size="small" @click="startEdit(scope.row)">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </el-button>
                        <el-button size="small" type="danger" @click="startDelete(scope.row)">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog 
            title="Create User" 
            size="small" 
            :close-on-click-modal="false"
            :visible.sync="createModalVisible">
            <UserForm @submit="createUser" @cancel="closeModals" :loading="isCreating" />
        </el-dialog>

         <el-dialog 
            title="Edit User" 
            size="small" 
            :close-on-click-modal="false"
            :visible.sync="editModalVisible">
            <UserForm @submit="editUser" @cancel="closeModals" :userData="userToEdit" :loading="isUpdating" />
        </el-dialog> 

        <el-dialog 
            title="Delete User" 
            size="small" 
            :close-on-click-modal="false"
            :visible.sync="deleteModalVisible">
            <p>Are you sure you wish to delete user {{userToDelete.firstName}} {{userToDelete.lastName}}?</p>
            <p class="pull-right">
                <el-button type="success" @click="deleteUser(userToDelete.id)" :loading="isDeleting">Confirm</el-button>
                <el-button @click="closeModals">Cancel</el-button>
            </p>
        </el-dialog> 

    </section>
</template>

<script>
import UserForm from '@/components/UserForm'
import { mapState, mapActions   } from 'vuex'
import { usersNamespace } from '../../store/namespaces'
import { actions } from '../../store/users'


export default {
    name: 'UsersListPage',
    data: function(){
        return {
            createModalVisible: false,
            editModalVisible: false,
            userToEdit: {},
            deleteModalVisible: false,
            userToDelete: {}
        }
    },
    computed:{
        userCount: function(){
            return this.users.length;
        },
        ...mapState(usersNamespace, {
            users: state =>state.list,
            loading: state => state.listRequest.isLoading,
            isCreating: state => state.createRequest.isLoading,
            isUpdating: state => state.updateRequest.isLoading,
            isDeleting: state => state.deleteRequest.isLoading,
        }),

        changeStatus: function(){
            const { isDeleting, isCreating, isUpdating } = this;
            return { isCreating, isUpdating, isDeleting }
        }
    },
    beforeMount: function(){
        this.loadUsers();
    },
    methods:{

        ...mapActions(usersNamespace, {
            loadUsers: actions.getUsers.name,
            createUser: actions.createUser.name,
            editUser: actions.updateUser.name,
            deleteUser: actions.deleteUser.name,
        }),

        startCreate(){
            this.createModalVisible = true;
        },
        startEdit(user){
            this.userToEdit = user;
            this.editModalVisible = true;
        },
        startDelete(user){
            this.userToDelete = user;
            this.deleteModalVisible = true;
        },

        closeModals(){
            this.createModalVisible = false;
            this.editModalVisible = false;
            this.deleteModalVisible = false;
        },

    },

    watch:{
        changeStatus: function(val, oldVal){
            const needsReload = function(next,prev){
                return prev === true && next === false;
            }.bind(this);
            if(needsReload(val.isCreating, oldVal.isCreating) || needsReload(val.isUpdating, oldVal.isUpdating) || needsReload(val.isDeleting, oldVal.isDeleting)){
                this.closeModals();
                this.loadUsers();
            }
        }
    },
    components:{
        UserForm
    }
}
</script>

<style lang="scss" scoped>
    header span {
        padding-right: 10px;
    }
</style>
