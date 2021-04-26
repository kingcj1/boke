<template>
    <div class="top" >
        <img :src="logo" alt="">
        <h2>{{tetl}}</h2>
    </div>
</template>

<script>
    export default {
        props:{
            logo:{
                
            },
            tetl:{
                type:String,
                default:'标题'
            }
        }
    }
</script>

<style lang="less" scoped>
.top{
    height: 50px;
    border-right: 1px solid #dcdee2;
    img,h2{
        display: inline-block;
        height: auto;
        vertical-align: middle;
    }
    img{
        width: 50px;
    }
}
</style>