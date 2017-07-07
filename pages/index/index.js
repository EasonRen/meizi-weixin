var Util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meiziData: [],
    currentPage: 0
  },

  onItemClick: function (event) {
    var targetUrl = "/pages/detail/detail";
    if (event.currentTarget.dataset.url != null)
      targetUrl = targetUrl + "?url=" + event.currentTarget.dataset.url;

    wx.navigateTo({
      url: targetUrl
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    requestData(that, this.data.currentPage + 1);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    requestData(this, this.data.currentPage + 1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})

var meiziCache = [];

function requestData(that, targetPage) {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  });
  wx.request({
    url: Util.MeiZiApi + targetPage,
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      if (res.data.results == null || res.data.results.length <= 0) {
        return;
      }

      res.data.results.forEach(function (ele, index) {
        ele.publishedAt = ele.publishedAt.split("T")[0];
        meiziCache.push(ele);
      });

      that.setData({
        meiziData: meiziCache,
        currentPage: targetPage
      });

      wx.hideToast();
    }
  });
}