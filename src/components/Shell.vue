<template>
    <section>
        <el-row>
            <el-col :sm="3">
                <nav class="mainNav">
                    <el-menu :router="true">
                        <el-menu-item index="home" :route="{ path: '/'}">Home</el-menu-item>
                        <el-menu-item index="users" :route="{ path: '/users' }">Users</el-menu-item>
                    </el-menu>
                </nav>
            </el-col>
            <el-col :sm="21">
                <div class="mainContent">
                    <router-view></router-view>
                </div>
            </el-col>
        </el-row>
    </section>
</template>


<script>
export default {
    name: 'Shell'
}
</script>

