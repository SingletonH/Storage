### 前言
1、近期项目开发中接触到微信小程序，其中有部分业务需要用到数据本地存储，而微信的官方文档中并没用提供直接更新`Storage`的`API`。
2、通过`wx.setStorage(Object object)`可以达到覆盖原有数据达到更新的目的，但是在只修改某个对象中某个属性的值中使用这个`API`总感觉有点蹩脚。
3、下面笔者简单封装了一个方法用来修改`Storage`，若是有人知道更好的方法或者我的写法有问题还望不吝赐教。

### 问题描述
小程序首次登录时需要输入账号密码，首次登录成功后将账号与`token`保存本地。下次启动小程序验证`token`是否过期，未过期直接登录，若过期则重新获取`token`并修改之前保存本地`token`

### 常规写法
![原有Storage](https://upload-images.jianshu.io/upload_images/6695792-bcde166fd274f0fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
1、根据`key`"loginSetting"取出所有登录信息
2、获取新的`token`构建新的“loginSetting”
3、调用`setStorage(Object object)`保存

### 封装更新API
```
/**
 * 更新本地缓存数据
 * key: 本地缓存中指定的 key
 * newData: 需要更新的内容
 * 
 */
const updateStorageInfo = param => {
    var key = param.key
    var newData = param.newData

    var tempData = {}

    wx.getStorage({
        key: key,
        success(res) {

            var storage = res.data
            for (var prop in storage) {

                for (var pr in newData) {
                    if (prop == pr) {
                        storage[prop] = newData[pr]
                    }
                }
            }

            tempData = storage
            wx.setStorage({
                key: key,
                data: tempData,
                success(res) {
                    param.success(res)
                },
                fail(res) {
                    param.fail(res)
                }
            })
        },
        fail(res) {
            param.fail(res)
        },
        complete(res) {
            param.complete(res)
        }
    })


}
```
### 使用updateStorageInfo API
```
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
```
#### 使用详解
1、原有`loginSetting`对象中有`account`，`token`属性，如果只需更改`token`属性。则只需构建需要更改内容的`json`对象，与更改的`key`。需要更改哪些数据则构建相应`json`即可。
2、如果更改了一个不存在的`key`则会进入`fail callback`
#### 实现原理
1、实现思路还是需要根据`key`将整个对象取出，构建新对象再保存一次。之前相当于你要修改一个对象中的一个值，需要提供这个对象的标识，然后根据这个标识在本地存储中找到这个对象，接着把你需要改变的值与前面找到的数据进行合并，再保存。
2、根据`key`去本地查找对象与就对象和新对象匹配的逻辑类似，这也正是我们可以偷懒的地方。
