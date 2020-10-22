class Goods {
  //new 实例化的时候自动调用
  constructor() {
    Goods.list();
  }
  // 获取商品列表的信息
  static list() {
    // 发送ajax请求，返回数据，拼接到页面中
    axios.get('http://localhost/day27/cart/server/server.php?fn=lst').then(res => {
      // console.log(res);
      // console.log(JSON.parse(res));
      let {
        data,
        meta
      } = JSON.parse(res);
      let str = '';
      if (meta.status == 200) { //服务器状态码为200则是请求成功
        //console.log(data); //返回的是数组
        data.forEach(ele => {
          let {
            goodsName,
            id,
            goodsImg,
            price
          } = ele;
          str += `<div class="box"><img src="${goodsImg}" alt="">
          <p>${goodsName}</p><span class="goods_item_price" data-price-id="100004222715" style="">¥${price}</span>
          <a href="javascript:;" id="InitCartUrl" class="btn-special1 btn-lg" onclick="Goods.addCart(${id},1)">加入购物车</a>
          </div>`;
        });
        //获取节点插入到页面
        let content = document.querySelector('#cont')
        content.innerHTML = str;
      };
    });
  }
  //****************添加购物车方法
  static addCart(id, num) {
    /************* ********* 购物车逻辑***********
     1.判断购物车cart这个键是否存在，没有则添加，
     2.如果cart存在，判断购物车里 是否有商品
     2-1.有商品就加数量
     2-2.没有商品就添加 */

    //获取本地存储对象里的值
    let cartGoods = localStorage.getItem('cart');
    // 判断购物车cart这个键是否存在，没有则添加，
    if (cartGoods) { //存在
      //将获取的字符串转化为对象
      cartGoods = JSON.parse(cartGoods);
      // console.log(cartGoods);
      for (var attr in cartGoods) {
        if (attr == id) {
          num += cartGoods[id];
        }
      }
      //两个作用，商品id不存就新增，存在就让数量更新重新赋值；
      cartGoods[id] = num;
      localStorage.setItem('cart', JSON.stringify(cartGoods));
    } else {
      let param = {
        [id]: num
      };
      localStorage.setItem('cart', JSON.stringify(param));
    }
  }
}
new Goods();