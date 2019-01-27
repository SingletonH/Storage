const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

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

module.exports = {
    formatTime: formatTime,
    updateStorageInfo
}