let payParams = {}
let payCallback = () => { }

const jsApiCall = function () {
  // alert('调用WeixinJSBridge.invoke!!!')
  WeixinJSBridge.invoke("getBrandWCPayRequest", payParams, function (res) {
    // console.log("==========================res.err_msg: ", res.err_msg)
    // alert(res.err_msg)
    WeixinJSBridge.log(res.err_msg)
    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠
    if (res.err_msg == "get_brand_wcpay_request:ok") {
      setTimeout(() => {
        payCallback(true)
      }, 2000)
    } else {
      setTimeout(() => {
        payCallback(true)
      }, 2000)
    }
  })
}

const pay = (params, callback) => {
  // 注入参数和回调
  payParams = JSON.parse(params)
  // alert(params)
  payCallback = callback

  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener("WeixinJSBridgeReady", jsApiCall, false)
    } else if (document.attachEvent) {
      document.attachEvent("WeixinJSBridgeReady", jsApiCall)
      document.attachEvent("onWeixinJSBridgeReady", jsApiCall)
    }
  } else {
    jsApiCall()
  }
}

export default pay
