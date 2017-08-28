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
            <UserForm @submit="createUser" @cancel="closeModals" :userData="userToAdd" />
        </el-dialog>

         <el-dialog 
            title="Edit User" 
            size="small" 
            :close-on-click-modal="false"
            :visible.sync="editModalVisible">
            <UserForm @submit="editUser" @cancel="closeModals" :userData="userToEdit" />
        </el-dialog> 

        <el-dialog 
            title="Delete User" 
            size="small" 
            :close-on-click-modal="false"
            :visible.sync="deleteModalVisible">
            <p>Are you sure you wish to delete user {{userToDelete.firstName}} {{userToDelete.lastName}}?</p>
            <p class="pull-right">
                <el-button type="success" @click="deleteUser">Confirm</el-button>
                <el-button @click="closeModals">Cancel</el-button>
            </p>
        </el-dialog> 

    </section>
</template>

<script>
import UserForm from '@/components/UserForm'
import { mapState, mapActions   } from 'vuex'
import { usersNamespace, usersSelector } from '../../store/namespaceHelpers'
import { actions } from '../../store/users'


export default {
    name: 'UsersListPage',
    data: function(){
        return {
            createModalVisible: false,
            userToAdd: {},
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
        ...mapState({
            users: state => usersSelector(state).list,
            loading: state => usersSelector(state).listRequest.isLoading,
        }),
    },
    beforeMount: function(){
        this.loadUsers();
    },
    methods:{
        loadUsers(){
            this.$store.dispatch(usersNamespace + actions.getUsers.name);
        },
        startCreate(){
            this.userToAdd = {};
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
        createUser(user){
            this.$store.dispatch(usersNamespace + actions.createUser.name, user)
                .then(res => { 
                    this.createModalVisible = false;
                    this.loadUsers();
                })
                .catch(err => console.log("create user error", err));
        },
        editUser(user){
            this.$store.dispatch(usersNamespace + actions.updateUser.name, user)
                .then(res => { 
                    this.editModalVisible = false;
                    this.loadUsers();
                })
                .catch(err => console.log("update user error", err));
        },
        deleteUser(){
            this.$store.dispatch(usersNamespace + actions.deleteUser.name, this.userToDelete.id)
                .then(res => { 
                    this.deleteModalVisible = false;
                    this.loadUsers();
                })
                .catch(err => console.log("delete user error", err));
        },
        closeModals(){
            this.createModalVisible = false;
            this.editModalVisible = false;
            this.deleteModalVisible = false;
        },
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
