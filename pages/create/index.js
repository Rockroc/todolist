//input.js
Page({
    data: {
        focus: true,
        inputValue: ''
    },
    createTask : function(){
        var todoList = wx.getStorageSync('todoList') || []
        var num=0;
        for(num in todoList){
            num++
        }

        var id="";
        for(var i=0;i<8;i++)
        {
            id+=Math.floor(Math.random()*10);
        }

        todoList[num] = new Object();
        todoList[num].task = this.data.inputValue
        todoList[num].complete = false
        todoList[num].id = id
        todoList[num].time = Date.now()
        // todoList.unshift(this.data.inputValue)
        wx.setStorageSync('todoList', todoList)

        // wx.showToast({
        //     title: '成功',
        //     icon: 'success',
        //     duration: 2000,
        //
        // }),
        wx.redirectTo({
            url: '../index/index'
        })


    },

    bindInputValue : function(e){
        this.setData({
            inputValue: e.detail.value
        })
    }
})