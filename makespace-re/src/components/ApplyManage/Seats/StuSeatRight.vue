<template>
  <!--桌子朝右的座位-->
  <div id="StuSeatRight">
    <!--<img class="Right" @click="position='2'" v-if="position==='1'" src="../../../assets/1.png"/>-->
    <img class="Right" v-if="position==='1'" src="../../../assets/2.png" ref="key" />
    <img class="Right" @click="changePosition" v-else-if="position==='2'"  style="color: yellow"  ref="key" src="../../../assets/3.png"/>
    <img class="Right" @click="changePosition" v-else-if="position==='3'" ref="key" src="../../../assets/5.png"/>
    <img class="Right" @click="changePosition" v-else-if="position==='4'" src="../../../assets/4.png"/>
  </div>
</template>

<script>
    export default {
        name: "StuSeatRight",
      data(){
          return{
            position:'2',
            seatNo:'',
            // theStyle:{
            //   transform:'scale(0)'
            // }
          }
      },
      props:["isSelected","seat","isSeatSelected","left"],
      mounted(){

          console.log(this.$props.isSelected);
        if(this.$props.isSelected==='false'){
          this.$data.position='1';
        }else if(this.$props.isSelected==='yes'){
          this.$data.position='4';
          // console.log('yes')
        }
        this.$data.seatNo=this.$props.seat;
        if(this.$props.left===true){
        }else{
          // this.$data.theStyle.transform='scale(-1)';
          this.$refs.key.style.transform='scale(-1)';
        }
        // console.log(this.$props.isSeatSelected);
      },
      // updated(){
      //     console.log('yes');
      //   if(this.$props.isSelected==='false'){
      //     this.$data.position='1';
      //   }else if(this.$props.isSelected==='yes'){
      //       this.$data.position='4';
      //     }else if(this.$props.isSelected==='true'){
      //     this.$data.position='2';
      //   }
      //}
      watch:{
        isSelected(oldVal,newVal){
          console.log(newVal);
          if(this.$props.isSelected==='yes') {
            this.$data.position = '4';
          }else if(this.$props.isSelected==='false'){
            this.$data.position='1'
          }else{
            this.$data.position='2';
          }
        }
      },
      methods:{
          changeStatus(){
            this.$emit('update:isSelected',newValue);
          },
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
.Right{
  /*-webkit-transform: scale(0);*/
  /*-moz-transform: scale(0);*/
  /*-ms-transform: scale(0);*/
  /*-o-transform: scale(0);*/
  /*transform: scale(0);*/
  width: 50px;
  height: 50px;
}
</style>
