// pages/index/login.js
const util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loginData: {
            account: '',
            token: ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    loginClickAction: function() {

        var that = this
        wx.getStorage({
            key: 'loginSetting',
            success: function(res) {
                var data = {
                    token: that.randomWord(false, 32)
                }
                util.updateStorageInfo({
                    key: "loginSetting",
                    newData: data,
                    success(res) {
                        console.log(res)
                    },
                    fail(res) {
                        console.log(res)
                    },
                    complete(res) {
                        console.log(res)
                    }
                })
            },
            fail: function(res) {
                var loginData = {
                    account: '123456',
                    token: 'Tqk6J8EQU8V1J5tCvTBHIMM1MMjHc3qN'
                }
                wx.setStorage({
                    key: 'loginSetting',
                    data: loginData
                })
            }
        })

    },

    /*
     ** randomWord 产生任意长度随机字母数字组合
     ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
     ** xuanfeng 2014-08-28
     ** 函数原文链接 https://www.cnblogs.com/makan/p/4850071.html
     */

    randomWord: function(randomFlag, min, max) {
        var str = "",
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        // 随机产生
        if (randomFlag) {
            range = Math.round(Math.random() * (max - min)) + min;
        }
        for (var i = 0; i < range; i++) {
            var pos = Math.round(Math.random() * (arr.length - 1));
            str += arr[pos];
        }
        return str;
    }



})