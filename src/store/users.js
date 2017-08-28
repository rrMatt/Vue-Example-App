import axios from 'axios'
// NOTE: function.name is not compatible in IE - need a polyfill

export const state = {
    list: [],
    listRequest:{
        isLoading: false
    },
    createRequest:{
        isLoading: false
    },
    updateRequest:{
        isLoading: false
    },
    deleteRequest:{
        isLoading: false
    }
}

export const mutations = {
    setUserList(state, value){
        state.list = value;
        state.listRequest.isLoading = false;
    },
    setUserListLoading(state, value){
        state.listRequest.isLoading = !!value;
    },
    setCreateLoading(state, value){
        state.createRequest.isLoading = !!value;
    },
    setUpdateLoading(state, value){
        state.updateRequest.isLoading = !!value;
    },
    setDeleteLoading(state, value){
        state.deleteRequest.isLoading = !!value;
    }
}


export const actions = {
    getUsers({ commit }){
        commit(mutations.setUserListLoading.name, true);
        return new Promise(function(resolve, reject){
            axios.get('/api/users')
                .then(response => setTimeout(() => {
                    commit(mutations.setUserList.name, response.data);
                    resolve();
                }, 1000))
                .catch(error => { 
                    commit(mutations.setUserListLoading.name, false);
                    reject();
                });
        });
    },
    createUser({commit}, user){
        commit(mutations.setCreateLoading.name, true);
        return new Promise(function(resolve, reject){
            axios.post('/api/users', user)
                .then(res => { 
                    commit(mutations.setCreateLoading.name, false);
                    resolve();
                })
                .catch(err => {
                    commit(mutations.setCreateLoading.name, false);
                    reject();
                });
        });
    },
    updateUser({commit}, user){
        commit(mutations.setUpdateLoading.name, true);
        return new Promise(function(resolve, reject){
            axios.put(`/api/users/${user.id}`, user)
                .then(res => { 
                    commit(mutations.setUpdateLoading.name, false);
                    resolve();
                })
                .catch(err => {
                    commit(mutations.setUpdateLoading.name, false);
                    reject();
                });
        });
    },
    deleteUser({commit}, userId){
        commit(mutations.setDeleteLoading.name, true);
        return new Promise(function(resolve, reject){
            axios.delete(`/api/users/${userId}`)
                .then(res => { 
                    commit(mutations.setDeleteLoading.name, false);
                    resolve();
                })
                .catch(err => {
                    commit(mutations.setDeleteLoading.name, false);
                    reject();
                });
        });
    }
}


const usersModule = {
    namespaced: true,
    state: state,
    mutations,
    actions,
};

export default usersModule;