<template>
  <div id="home">
    <button @click="test">test</button>
      <div id="cart-app" class="container">
    <div class="row">
      <div class="col-md-8">
        <h1 class="page-header">VUEJS 實戰 - <small>5倍商城</small></h1>
        <div class="item" v-for="(item,index) in keywordSearch"
        :key='index'
        v-show='index<10'
        >
          <h2>{{item.name}}</h2>
          <img class="item-img img-responsive" :src="item.picture" :alt="item.imageType">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <p class="item-price ">$ {{item.price}} </p>
          <a class="btn btn-primary "  onclick="return false" href="# " @click="addToCart(item)">放入購物車 <span class="glyphicon glyphicon-chevron-right "></span></a>
        </div>
        <hr>
        <!--Pager -->
        <ul class="pagination">
          <li>
            <a href="#"  onclick="return false" aria-label="Previous" @click="addPageNow(-1,page)">
              <span aria-hidden="true" >&laquo;</span>
            </a>
          </li>
          <li >
              <a href="#" 
                :class="{actived:val.active}"
                onclick="return false" 
                v-for="(val,page) in pageNum"
                :key="page"
                @click="pageBackgroundChange(val,page);changePage(page,val)">{{page+1}}
            </a>
          </li>
          <li>
            <a href="#"  onclick="return false" aria-label="Next" @click="addPageNow(1,page)">
              
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- Blog Sidebar Widgets Column -->
      <div class="col-md-4 ">
        <div class="well ">
          <h4>商品搜尋</h4>
          <div class="input-group ">
            <input type="text" class="form-control" v-model="keyword">
            <span class="input-group-btn">
                <button class="btn btn-default"><span class="glyphicon glyphicon-search "></span></button>
            </span>
          </div>
          <!-- /.input-group -->
        </div>
      <hr>
        <div class="well cart">
          <h4>購物車</h4>
          <ul class="itemsInCart ">
            <li v-for="(cartItem,num) in cartItems"
              :key="cartItem.name">
              <div class="cart-item" >
                <div  class="cart-title">{{cartItem.name}}</div> <span class="price">${{cartItem.price}}</span> x
                <span class="count" >{{cartItem.quantity}}</span>
                <div class="handler">
                  <a href="#"  class="cart-btn plus" @click="addQuantity(cartItem,1,num)">+</a>
                  <a href="#"  class="cart-btn minus" @click="addQuantity(cartItem,-1,num)">-</a>
                </div>
              </div>
            </li>
          </ul>
          <hr>
          <p>小計： <span>${{totalMoney}}</span></p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
const datas = require('../static/pros-list.json')
export default {
  data(){
    return{
      commerceData:'',
      newCommerceData:[],
      recoverNewCommerceData:[],
      keyword:'',
      cartItems:[],
      total:0,
      page:[],
      pageNow:0,
      dataDisplay:1,
      flag:true,
      flagFirstPage:true,
      anotherData:'',
    }
  },
  methods:{
    addToCart(item){
      if(!item.quantity){
      this.$set(item,'quantity',1)
      }
      if(this.cartItems.map(a=>a.id).indexOf(item.id) !== -1){
        return item.quantity++
      }else{
      this.cartItems.push(item)
      }
    },
    addQuantity(cartItem,way,num){
        if(way>0){
          cartItem.quantity++
        }else{
          cartItem.quantity--
        }
      if(cartItem.quantity == 0){
        this.cartItems.splice(num,1)
      }
    },
    test(){
    },
    changePage(page,val){
      this.newCommerceData = this.recoverNewCommerceData.slice()
        this.pageNow = page*10
        this.anotherData.splice(0,this.pageNow)
    },
    addPageNow(way){
      var pageIndexBefore = this.page.map(a=>a.active).indexOf(true)
      console.log(pageIndexBefore)
      console.log(this.pageNow)
      console.log(this.anotherData.length)
      let pageIndex;

      if(way>0 && pageIndexBefore <9 ) {
        pageIndex = pageIndexBefore+1
        this.pageNow = this.pageNow+10 //切資料
      }
      else if(way < 0 &&  pageIndexBefore > 0){
        pageIndex = pageIndexBefore-1
        this.pageNow = this.pageNow-10
      } else{
        pageIndex = pageIndexBefore
      }
      

        setTimeout(()=>{
          this.page[pageIndexBefore].active = false
          this.page[pageIndex].active = true
        },50)
      console.log('addPageNow')
      //
    },
    pageBackgroundChange(val,page){
        this.page.forEach(a=>{
          a.active = false
        })
      clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          this.page[page].active = true  //val 失效???
        },10)
    }
  },
  mounted(){
    const vm = this
    vm.axios.get('http://localhost:3000/')
    .then(res=>this.commerceData = res.data)
  
  },
  computed: {
    keywordSearch(){
      this.anotherData = this.commerceData.slice()
      if(!this.keyword && this.flag){
        this.flag = false
        this.recoverNewCommerceData = this.commerceData.slice()
        this.newCommerceData = this.commerceData.slice()
        return this.newCommerceData
      }
      this.newCommerceData = []
      this.anotherData.splice(0,this.pageNow)//
      console.log(this.pageNow)
        this.anotherData.forEach(item=>{
        if(item.name.indexOf(this.keyword)!== -1 && this.keyword !== ' '){
          this.newCommerceData.push(item)
        }
      })

      // this.recoverNewCommerceData = this.newCommerceData.slice()//切完 還是用未切割前的資料作搜尋，搜尋的到，然後又切掉 在search 的時候  pageNow 要歸零才對
      return this.newCommerceData
    },
    totalMoney(){
      this.total= 0;
      this.cartItems.forEach(item=>{
        this.total += item.price*item.quantity
      })
      return this.total
    },
    pageNum(){
        let pageNum = Math.ceil(this.commerceData.length/10)//當作長度的地方不能被切，但是搜尋要是以被切過的部分
        this.page = []
        var i;
        for(i=0;i<pageNum;i++){
          this.page.push({active:null})
        }
        if(this.flagFirstPage && this.page != ''){
          this.page[0].active = true
          this.flagFirstPage = false
        }
        return this.page
    },
  },
}
console.log('change() => pageNum => keyWorld')

// BUG 待解決，搜尋時長度若跟著減，若先點選page 切割後，資料變少，但是搜尋還是會搜尋完整的data，然後再切到page所在的資料數量，造成搜尋後跳頁面，但卻沒有顯示該筆資料的問題
// 響應順序太過複雜，解決不了問題
// 無法控制響應，用了很多setTimeout 解決順序問題，感覺不太對。

// pageNow 切割的筆數 anotherData完整的資料，用於keyword Search 用 
</script>