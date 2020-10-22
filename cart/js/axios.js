let axios = {
  get(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('get', url);
      // 监听
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.responseText);
          }
        }
      }
      xhr.send();
    });
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('post', url);
      // 所有的post请求,必须设置参数的编码方式
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      //监听
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.responseText);
          }
        }
      }
      xhr.send(data);
    });

  }

}