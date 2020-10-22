class Cart {
  //静态方法声明在class类中
  static selectAll;
  static checkOne;
  constructor() {
    Cart.selectAll = document.querySelectorAll('.check-all'); //要放全选绑定事件方法之前
    Cart.checkOne = document.getElementsByClassName('check-one');
    Cart.Glist();
    Cart.checkAll();

  }
  /******商品列表****/
  static Glist() {
    // 1.获取商品的id ，然后发送ajax请求通过id找到对应商品的数据
    let goodsId = localStorage.getItem('cart');
    // console.log(goodsId);
    //后台需要goodsid以字符串形式穿递 str = '1,3,4,6';
    goodsId = JSON.parse(goodsId);
    let goodsIdStr = '';
    for (var id in goodsId) {
      // console.log(id);
      goodsIdStr += id + ',';
    }
    // console.log(goodsIdStr);
    // 2 发送ajax请求,获取数据
    axios.post('http://localhost/day27/cart/server/cart.php?fn=lst', 'goodsId=' + goodsIdStr).then(res => {
      // console.log(res);
      let {
        meta,
        data
      } = JSON.parse(res);
      // console.log(data);
      //判断请求状态是否响应成功
      if (meta.status == 200) {
        let html = '';
        data.forEach(ele => {
          let {
            id,
            goodsName,
            price,
            goodsImg,
          } = ele;
          html += `<tr>
          <td class="checkbox" >
            <input class="check-one check" onclick="Cart.oneSele()" type="checkbox" />
        </td >
          <td class="goods">
            <img src="${goodsImg}" alt="" />
            <span>${goodsName}</span>
          </td>
          <td class="price">${price}</td>
          <td class="count">
            <span class="reduce"></span>
            <input class="count-input" type="text" value="${goodsId[id]}" />
            <span class="add" onclick="Cart.addGoodsNum(this,${id})">+</span>
          </td>
          <td class="subtotal">${(goodsId[id] * price).toFixed(2)}</td>
          <td class="operation">
            <span class="delete" onclick = "Cart.delGoods(this,${id})">删除</span>
          </td>
      </tr >`;
          // console.log(goodsId[id]);
        });
        // 追加到tbody中
        let tbodyObj = document.querySelector('tbody');
        tbodyObj.innerHTML = html;
      }
    });
  }
  /* ****全选的实现****** */
  // 给全选绑定事件
  static checkAll() {
    Cart.selectAll = document.getElementsByClassName('check-all');
    // console.log(Cart.selectAll);
    // console.log(Cart.selectAll[0].checked);
    // 给全选绑定事件
    Cart.selectAll[0].addEventListener('click', Cart.allEvent);
    Cart.selectAll[1].addEventListener('click', Cart.allEvent);
    // Cart.checkOne = document.getElementsByClassName('check-one');
    // console.log(Cart.checkOne);
  }
  /* ********全选事件方法******* */
  static allEvent() {
    // console.log(this);
    //获取当前点击选项框的状态值
    let checkValue = this.checked;
    // console.log(checkValue);
    // 让全选框跟随他的状态
    Cart.selectAll[0].checked = checkValue;
    Cart.selectAll[1].checked = checkValue;
    // console.log(Cart.checkOne);
    // console.log(Array.from(Cart.checkOne));
    Array.from(Cart.checkOne).forEach(elem => {
      elem.checked = checkValue;
    });

    //统计商品数量和价格
    Cart.goodsCount();
  }
  /* ********单选事件方法******* */
  static oneSele() {
    // console.log(Cart.checkOne);
    // 获取一下商品种类的数量
    let goodsIdLen = Cart.checkOne.length;
    // console.log(goodsIdLen);
    //统计时时选中状态的个数
    let count = 0;
    Array.from(Cart.checkOne).forEach(elem => {
      if (elem.checked) count++;
    });
    //判断选中的个数是否和  商品种类个数相等（也就是判断商品种类是不是全选中）
    // 变量选中状态
    let checkState = null;
    if (goodsIdLen == count) {
      checkState = true;
    } else {
      checkState = false;
    }
    Cart.selectAll[0].checked = checkState;
    Cart.selectAll[1].checked = checkState;

    //统计商品数量和价格
    Cart.goodsCount();
  }
  /* ******数量和价格的统计 */
  static goodsCount() {
    // 统计商品数量
    let count = 0;
    let price = 0;
    // 1 统计【选中】的单选按钮对应的商品数量
    Array.from(Cart.checkOne).forEach(ele => {
      if (ele.checked) {
        //通过当前选中框的tr节点，找到当前选中框的td节点
        let trObj = ele.parentNode.parentNode;
        // console.log(trObj);
        //获取到的数据是字符串  减0转化成数字类型
        let goodsNum = trObj.getElementsByClassName('count-input')[0].value - 0;
        // console.log(goodsNum);
        count += goodsNum;
        // console.log(count);
        // 获取商品小计
        let xj = trObj.getElementsByClassName('subtotal')[0].innerHTML - 0;
        // console.log(xj);
        price += xj;
      }
    })
    // 放到已选商品和合计
    let totalObj = document.getElementById('selectedTotal');
    let priceObj = document.getElementById('priceTotal');
    totalObj.innerHTML = count;
    priceObj.innerHTML = price.toFixed(2);
  }

  /***点击加号商品数量的改变****/
  static addGoodsNum(that, id) {
    // console.log(that);//上传个this，此时that指向当前节点


    // 获取原有的数量
    let numObj = that.previousElementSibling.value - 0;
    // console.log(numObj);
    numObj++;
    that.previousElementSibling.value = numObj;
    // 更新local中商品数量
    let newLocalNum = JSON.parse(localStorage.getItem('cart'));
    // console.log(newLocalNum);
    newLocalNum[id] = numObj;
    localStorage.setItem('cart', JSON.stringify(newLocalNum))
    // 更新数量和总计
    Cart.goodsCount();
    // 更新小计
    let trObj = that.parentNode.parentNode;
    //获取价格:单价
    let newPrice = trObj.getElementsByClassName('price')[0].innerHTML;
    // console.log(newPrice);
    // 计算新的小计
    trObj.getElementsByClassName('subtotal')[0].innerHTML = (numObj * newPrice).toFixed(2)
  }
  /***删除的实现**/
  static delGoods(that, id) {
    // 1.删除tr
    that.parentNode.parentNode.remove();
    // 2.也删除localStorage中数据并，更新localStorage
    let cartGoods = JSON.parse(localStorage.getItem('cart'));
    delete cartGoods[id];
    localStorage.setItem('cart', JSON.stringify(cartGoods));
    // 更新数量和总计
    Cart.goodsCount();
  }
}
new Cart();