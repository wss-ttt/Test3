// 订阅器模型
var Dep = {
  clientList: {},
  listen: function(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  trigger: function() {
    var key = Array.prototype.shift.call(arguments),
    fns = this.clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (var i = 0,fn; fn = fns[i++];) {
      fn.apply(this, arguments);
    }
  }
};
// 劫持方法
var dataHijack = function({
  data,
  tag,
  datakey,
  selector
}) {
  var value = '',
  el = document.querySelector(selector);
  // 数据劫持
  Object.defineProperty(data, datakey, {
    get: function() {
      return value;
    },
    set: function(newValue) {
      value = newValue;
      Dep.trigger(tag, newValue);
    }
  });
  // 绑定观察者
  Dep.listen(tag,
  function(text) {
    el.innerHTML = text;
  });
}