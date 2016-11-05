
const util = require( '../../utils/util.js' );

Page( {
  data: {

    /**
     * 页面配置
     */
    winWidth: 0,
    winHeight: 0,

    // tab切换
    currentTab: 0,

    task : [],


    // loading
    hidden: true,


  },

  /**
   * 页面初始化
   * options 为页面跳转所带来的参数
   */
  onShow: function( options ) {
    var that = this;

    /**
     * 获取系统信息
     */
    wx.getSystemInfo( {

      success: function( res ) {
        that.setData( {
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

    wx.getStorage({
      key: 'todoList',
      success: function(res) {
        that.setData({
          task : res.data
        })


        // unfinish = res.data
        // finish = res.data
        // console.log(unfinish)
        // var i = 0
        // var j = 0
        // var undata = []
        // var data = []
        // for(var index in res.data){
        //   if(!res.data[index].complete){
        //
        //     undata[i] = []
        //     undata[i] = res.data[index]
        //     that.setData({
        //       unfinish : undata
        //     })
        //     i++;
        //   }else{
        //     data[j] = []
        //     data[j] = res.data[index]
        //     that.setData({
        //       finish : data
        //     })
        //     j++
        //   }
        //
        // }

      }
    });


    /**
     * 显示 loading
     */
    that.setData( {
      hidden: false
    });



  },



  /**
   * 滑动切换tab
   */
  bindChange: function( e ) {

    var that = this;
    that.setData( { currentTab: e.detail.current });

  },
  /**
   * 点击tab切换
   */
  swichNav: function( e ) {

    var that = this;

    if( this.data.currentTab === e.target.dataset.current ) {
      return false;
    } else {
      that.setData( {
        currentTab: e.target.dataset.current
      })
    }


  },

  completeTask : function(e){
    var that = this

    var id = e.detail.value[0]


    var todo = wx.getStorageSync('todoList') || new Object()
    var todoList = [];
    for(var index in todo){
      todoList[index] = new Object();
      if(todo[index].id!=id){
        todoList[index].complete = todo[index].complete
      }else{
        todoList[index].complete = true
      }
      todoList[index].task = todo[index].task
      todoList[index].id = todo[index].id
      todoList[index].time = todo[index].time

    }
    wx.setStorageSync('todoList', todoList)

    that.setData({
      task : todoList
    })

  },


  uncompleteTask : function(e){
    var that = this

    var id = e.target.dataset.tid


    var todo = wx.getStorageSync('todoList') || new Object()
    var todoList = [];
    for(var index in todo){
      todoList[index] = new Object();
      if(todo[index].id!=id){
        todoList[index].complete = todo[index].complete
      }else{
        todoList[index].complete = false
      }
      todoList[index].task = todo[index].task
      todoList[index].id = todo[index].id
      todoList[index].time = todo[index].time

    }
    wx.setStorageSync('todoList', todoList)

    that.setData({
      task : todoList
    })
  }

})