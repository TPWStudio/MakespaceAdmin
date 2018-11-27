<template>
  <!--桌子朝左的座位-->
  <div id="StuSeat">
    <!--<img class="left" @click="position='2'" v-if="position==='1'" src="../../../assets/1.png"/>-->
    <img class="left" v-if="position==='1'" src="../../../assets/2.png"/>
    <img class="left" @click="position='3'" v-else-if="position==='2'" src="../../../assets/3.png"/>
    <!--<img class="left" @click="position='5'" v-else-if="position==='4'" src="../../../assets/4.png"/>-->
    <img class="left" @click="position='2'" v-else src="../../../assets/5.png"/>
  </div>
</template>

<script>
    export default {
        name: "StuSeat",
      data(){
          return{
            position:'2',
            seatNo:'',
          }
      },
      props:["isSelected","seat","isSeatSelected"],
      mounted(){
        if(this.$props.isSelected===true)
        {
          this.$data.position='1'
        }
      },
      methods:{
        changePosition(){
          let data = {
            status: true,
            seatInfo: this.$data.seatNo
          };
          console.log(this.$props.isSeatSelected);
          if(this.$props.isSeatSelected===true) {
            if(this.$data.position==='3'){
              this.$data.position='2';
              data.status=false;
              this.$emit('changeStatus',data);
            }
          }else{

            if (this.$data.position === '3') {
              data.status = false;
              this.$data.position = '2';
            } else{
              this.$data.position = '3';
            }

            this.$emit('changeStatus', data);
          }
        }
      }
    }
</script>

<style scoped>
.left{
  width: 50px;
  height: 50px;
}
</style>
