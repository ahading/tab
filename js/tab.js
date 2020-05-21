let that
class Tab {
  constructor(id) {
    that = this
    // 获取元素
    this.main = document.getElementById('tab')
    //获取li的父元素
    this.ul = this.main.querySelector('.firstnav ul:first-child')
    // 获取section的父元素
    this.fSection = this.main.querySelector('.tabscon')
    this.add = this.main.querySelector('.tabadd')
    this.remove = this.main.querySelectorAll('i')
    this.init()
  }
  init() {
    this.updateNode()
    // init 初始化操作让相关的元素绑定事件
    this.add.onclick = this.addTab
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i
      this.lis[i].onclick = this.togggleTab
      this.remove[i].onclick = this.removeTab
      this.spans[i].ondblclick = this.editTab
      this.sections[i].ondblclick = this.editTab
    }

  }
  //我们动态添加元素，需要从新获取对应的元素
  updateNode() {
    this.lis = this.main.querySelectorAll('li')
    this.sections = this.main.querySelectorAll('section')
    this.remove = this.main.querySelectorAll('i')
    this.spans = this.main.querySelectorAll('span')
  }
  //切换功能
  togggleTab() {
    that.clearClass()
    this.className = 'liactive'
    that.sections[this.index].className = 'conactive'

  }
  clearClass() {
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].className = ''
      this.sections[i].className = ''
    }
  }
  //添加功能
  addTab() {
    //创建li元素和section元素
    that.clearClass()
    let li = ' <li class="liactive" ><span>新选项卡</span><i>X</i></li>'
    let section = '<section class="conactive">新内容区</setion>'
    that.ul.insertAdjacentHTML('beforeend', li)
    that.fSection.insertAdjacentHTML('beforeend', section)
    that.init()
  }
  //删除功能
  removeTab(e) {
    e.stopPropagation();//阻止冒泡，
    let index = this.parentNode.index
    //根据索引号删除对应的li 和section
    that.lis[index].remove()
    that.sections[index].remove()
    that.init()
    //当我们删除的不是选中状态的元素时，原来的选中状态保持不变
    if (document.querySelector('.liactive')) return
    //当我们删除 了选中状态的生活，让它前一个li处于选中状态
    index--
    //手动调用click事件，不需要鼠标触发
    that.li[index] && that.lis[index].click()
  }
  // 修改功能
  editTab() {
    let str = this.innerHTML
    //双击禁止选定文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
    this.innerHTML = '<input type="text" value="' + str + '"/>'
    let input = this.children[0]
    //文本框里面的文字处于选中状态
    input.select()
    //当鼠标离开文本框就把文本框的值给span
    input.onblur = function () {
      this.parentNode.innerHTML = input.value

    }
    // 按回车键也饿可以把文本框里的值给span
    input.onkeyup = function (e) {
      if (e.keyCode === 13) {
        this.blur()
      }
    }
  }
}
let tab = new Tab('#tab')