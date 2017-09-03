<template>
    <section>
        <el-form :model="user" ref="dataForm" label-position="top" :rules="rules">

             <el-row :gutter="gutter">
                <el-col :span="12">
                    <el-form-item label="First Name" prop="firstName" required>
                        <el-input v-model="user.firstName" placeholder="First name" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Last Name" prop="lastName" required>
                        <el-input v-model="user.lastName" placeholder="Last name" />
                    </el-form-item>        
                </el-col>
            </el-row> 

            <el-row :gutter="gutter">
                <el-col :span="12">
                    <el-form-item label="Email" prop="email" required>
                        <el-input v-model="user.email" placeholder="Email" />
                    </el-form-item>        
                </el-col>
            </el-row>

            <p class="pull-right">
                <el-button type="success" @click="submit" :loading="loading">Save</el-button>
                <el-button @click="cancel">Cancel</el-button>
            </p>

        </el-form>
    </section>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'UserForm',
  props: {
      loading: VueTypes.bool,
      userData: VueTypes.object.def(VueTypes.shape({
          id: VueTypes.string,
          firstName: VueTypes.string,
          lastName: VueTypes.string,
          email: VueTypes.string,
      }).loose)
  },
  data: function(){
      return {
          gutter: 40,
          user: {
              id: this.userData.id || null,
              firstName: this.userData.firstName || '',
              lastName: this.userData.lastName || '',
              email: this.userData.email || ''
          },
          rules: {
              firstName: [ { required:true, message: 'First name is required' } ],
              lastName: [ { required:true, message: 'Last name is required' } ],
              email: [ 
                  { required:true, message: 'Email is required' },
                  { type:'email', message: 'Must be a valid email' },
                ],
          }
      }
  },
  methods: {
      submit(){
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const output = {...this.user};
            this.$emit('submit', output);
          } else {
            return false;
          }
        });
      },
      cancel(){
        this.$emit('cancel');
      }
  },
  watch: {
    userData: function(val, oldVal){
        this.$refs['dataForm'].resetFields();
        this.user = {
            id: val.id,
            firstName: val.firstName,
            lastName: val.lastName,
            email: val.email,
        }
    }
  }
}
</script>

