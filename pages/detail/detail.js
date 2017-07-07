Page({
  data: {
    url: "",
    toastHidden: true,
    modalHidden: true,
    hidden: false,
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
      hidden: true,
      url: options.url
    });
  },

  onToastChanged: function (event) {
    this.setData({
      toastHidden: true,
      hidden: true
    });
  },

  onLongClick: function () {
    this.setData({
      modalHidden: false
    });
  },

  onSaveClick: function (event) {
    var mUrl = "";
    if (event.currentTarget.dataset.url != null)
      mUrl = event.currentTarget.dataset.url;

    saveImage(this, mUrl);
  },

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
    hidden: false,
    loadingText: "下载中..."
  });
  wx.downloadFile({
    url: mUrl,
    type: 'image',
    success: function (res) {
      that.setData({
        toastHidden: false,
        hidden: true,
        toastText: "图片保存成功"
      });
    },
    fail: function (res) {
      that.setData({
        toastHidden: false,
        hidden: true,
        toastText: "保存失败，请稍后再试"
      });
    },
    complete: function (res) {
    }
  })
}