<template>
  <section>
      <header>
        <h2>Vue example</h2>
        <img class="logo" src="../../assets/logo.png" />
      </header>
      <p>This is an example Vue component</p>
      <p>
        <span>Current Count = {{counter}}</span>
        <el-button @click="increment">
            <i class="fa fa-plus" aria-hidden="true"></i>
        </el-button>
        <el-button @click="decrement">
            <i class="fa fa-minus" aria-hidden="true"></i>
        </el-button>
      </p>
      <p v-if="hasHitTarget">You've hit the target of {{target}}</p>
  </section>
</template>

<script>
export default {
    name:'DefaultPage',
    data: function(){
        return {
            counter: 0,
            target: 3
        }
    },
    computed:{
        hasHitTarget: function(){
            return this.counter >= this.target;
        }
    },
    methods: {
        increment(){
            this.counter++;
        },
        decrement(){
            if(this.counter){
                this.counter--;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    header{
        position: relative;
    }
    .logo {
        position: absolute;
        top: 0;
        right: 0;
    }
</style>