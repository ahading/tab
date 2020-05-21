var that;
class Tab {
    constructor(id) {
        //获取元素
        that = this;
        this.main = document.querySelector(id);
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.add = this.main.querySelector('.tabadd');
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        this.fsection = this.main.querySelector('.tabscon');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.init();

    }
    init() {
        this.updateNode();
        //init初始化操作让相关的元素绑定事件
        this.add.onclick = this.addTab;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick=this.editTab;
        }
    }
    //1、切换功能
    toggleTab() {
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
    //清除
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    //我们动态添加元素，需要从新获取对应的元素
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
    }
    //2、添加功能
    addTab() {
        that.clearClass();
        // (1)创建li元素和section元素
        var li = ' <li class="liactive" ><span>新选项卡</span><i>X</i></li>';
        var section = '<section class="conactive">新内容区</setion>';
        //(2)把这两个元素追加到相应的父元素里面
        that.ul.insertAdjacentHTMl('beforeend', li);
        that.fsection.insertAdjacentHTMl('beforeend', section);
        that.init();
    }
    //3、删除功能
    removeTab(e) {
        e.stopPropagation();//阻止冒泡，防止触发li的切换点击事件
        var index = this.parentNode.index;
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        //当我们删除的不是选中状态的元素时，原来的选中状态保持不变
        if (document.querySelector('.liactive')) return;
        //当我们删除 了选中状态的生活，让它前一个li处于选中状态
        index--;
        that.lis[index] && that.lis[index].click();//手动调用我们的点击事件
    }
    //4、修改功能
    editTab() {
        //双击禁止选定文字
        var str = this.innerHTML;
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text" value="' + str + '"/>';
        var input = this.children[0];
        input.select();//文本框里面的文字处于选中状态
        //当鼠标离开文本框就把文本框的值给span
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        }
        // 按回车键也饿可以把文本框里的值给span
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        }
    }
}
new Tab('#tab');