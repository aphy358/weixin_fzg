<!-- 组件说明 -->
<template>
	<div class="select-nationality">
		<div class="nav-back" @click="hideNationality">
			<i class="iconfont icon-left-thin"></i>
		</div>
		<div class="nationality-title">选择国籍</div>
		
		<mt-search v-model="countryValue" @input="searchCountry" :show="true">
			<mt-cell v-for="(item, index) in nationalityList" :key="'_country' + index" :title="item.title" :id="item.id" @click.native="selectNationality(item.id, item.title)">
			</mt-cell>
		</mt-search>
	</div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  
  export default {
    name: 'nationality',
    
    data() {
      return {
        countryValue: '',
        nationalityList: [
          {
            id: 70007,
            title: '中国'
          }
        ]
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
      },
      selectNationality(id, title){
        let params = {
          suppId: 231,
          countryId: id
        };
        this.$api.orderWrite.syncProperMarket(params).then(res => {
          if (res.inProperMarket){
            MessageBox.alert('当前价格，不适于该国籍客人，请联系捷旅客服后下单，电话33397777');
          }else{
            this.$emit('selectNationality', title);
            this.$emit('hideNationality');
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
		position: relative;
		/*position: absolute;*/
		/*padding-top: 0.4rem;*/
		
		.nationality-title{
			width: 100%;
			height: 0.4rem;
			line-height: 0.4rem;
			color: #ffffff;
			background-color: #ff7625;
			text-align: center;
			font-size: 0.14rem;
			/*position: fixed;*/
			/*left: 0;*/
			/*top: 0;*/
			/*z-index: 10000;*/
		}
		
		.nav-back {
			position: absolute;
			width: 0.40rem;
			height: 0.36rem;
			line-height: 0.36rem;
			left: 0;
			top: 0.02rem;
			text-align: center;
			font-size: 0.23rem;
			font-weight: bold;
			color: white;
			z-index: 1001;
			/*z-index: 10001;*/
			transform: translate3d(0, 0, 0) scale(1);
			cursor: pointer;
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