<!-- 组件说明 -->
<template>
	<div class="select-nationality">
		<div class="nav-back" @click="hideNationality">
			<i class="iconfont icon-left-thin"></i>
		</div>
		<mt-header title="选择国籍"></mt-header>
		
		<mt-search v-model="countryValue" @input="searchCountry">
			<mt-cell
					v-for="item in nationalityList"
					:title="item.title"
					:value="item.id">
			</mt-cell>
		</mt-search>
	</div>
</template>

<script>
  
  export default {
    name: 'nationality',
    
    data() {
      return {
        countryValue: '',
        nationalityList: []
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {},
    
    methods: {
      hideNationality(){
        this.$emit('hideNationality');
      },
      searchCountry(){
        this.$api.orderWrite.syncCountrySuggest({key: this.countryValue}).then(res => {
          if(res.list && res.list.length > 0){
            for (let i = 0; i < res.list.length; i++) {
              let item = res.list[i];
              this.$set(this.nationalityList, i, {id: item.countryid, title: item.name.split('-')[1]})
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
	.select-nationality{
		width: 100%;
		/*height: 100%;*/
		
		.nav-back {
			position: absolute;
			width: 0.40rem;
			height: 0.36rem;
			left: 0;
			top: 0.02rem;
			text-align: center;
			font-size: 0.23rem;
			font-weight: bold;
			color: white;
			z-index: 1001;
			transform: translate3d(0, 0, 0) scale(1);
		}
		
		.mint-search{
		}
	}
</style>

<style lang="scss">
	.select-nationality{
		
		.mint-search-list{
			top: 0.5rem;
			
			.mint-cell{
				display: block;
				width: 100%;
			}
		}
		
	}
</style>