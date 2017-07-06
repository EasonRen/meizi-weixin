Page({
  data: {
    url: "",
    toastHidden: true,
    modalHidden: true,
    toastText: "数据异常",
    loadingText: "加载中..."
  },

  onLoad: function (options) {
    if (options == null || options.url == null) {
      this.setData({
        toastHidden: false
      });
      return;
    }

    this.setData({
      toastHidden: true,
      url: options.url
    });
  },
  //Toast信息改变
  onToastChanged: function (event) {
    this.setData({
      toastHidden: true
    });
  },
  // 长按
  onlongclick: function () {
    this.setData({
      modalHidden: false
    });
  },
  // 保存
  onSaveClick: function (event) {
    var mUrl = "";
    if (event.currentTarget.dataset.url != null)
      mUrl = event.currentTarget.dataset.url;

    saveImage(this, mUrl);
  },
  // 取消
  onCancelClick: function (event) {
    this.setData({
      modalHidden: true
    });
  },
})

function saveImage(that, mUrl) {
  that.setData({
    toastHidden: true,
    modalHidden: true,
    loadingText: "下载中..."
  });
  wx.downloadFile({
    url: mUrl,
    type: 'image',
    success: function (res) {
      that.setData({
        toastHidden: false,
        toastText: "恭喜你，图片保存成功"
      });
    },
    fail: function (res) {
      console.log("download fail");
      that.setData({
        toastHidden: false,
        toastText: "保存失败，请稍后再试"
      });
    },
    complete: function (res) {
      console.log("download complete");
    }
  })
}