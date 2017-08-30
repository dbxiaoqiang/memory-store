import * as _ from 'lodash'
import stringify from 'json-stringify-safe'

/**
 * 一个非常简单的内存容器，可以存储key、Value Pair类型的数据，Key可以为字符串或者为数字
 */
class MemoryStore {
    constructor() {
        this._memstore = {}
    }
    /**
     * 把内容中的Key对应的Value转换为数组
     * @param {*} cb 把Value转换为其他值的回调函数
     */
    async map(cb) {
        if (!_.isFunction(cb)) throw new Error('请输入函数类型的参数')
        let self = this
        return new Promise((resolve, reject) => {
            setImmediate(() => {
                try {
                    let result, mappingArr = new Array()
                    _.forEach(self._memstore, (v, k) => {
                        result = cb(v, k)
                        if (!_.isUndefined(result)) mappingArr.push(result)
                    })
                    resolve(mappingArr)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
    /**
     * 保存某一个Key对应的Value Value的默认值为undefined
     * @param {*} key 键值
     * @param {*} value 数据
     */
    set(key, value = undefined) {
        if (!checkKey(key)) throw new Error('Key的类型 只能为字符或者数字')
        this._memstore[key] = value
        return this
    }
    /**
     * 取得某一个键值对应的数据
     * @param {*} key 需要指定的键值
     */
    get(key) {
        if (!checkKey(key)) throw new Error('Key的类型 只能为字符或者数字')
        return this._memstore[key]
    }
    /**
     * 删除某一个键值对应的数据
     * @param {*} key 
     */
    delete(key) {
        if (!checkKey(key)) throw new Error('Key的类型 只能为字符或者数字')
        delete this._memstore[key]
        return this
    }
    /**
     * 清空内存中保留的所有键值对
     */
    flush() {
        this._memstore = {}
        return this
    }
    /**
     * 深复制一份键值对数据
     */
    clone() {
        return JSON.parse(stringify(this._memstore))
    }
}
/**
 * 检查Key值是否正确 Key可以为不为空的字符串和数字
 * @param {*} key 键值
 */
function checkKey(key) {
    return (_.isString(key) && key) || _.isNumber(key)
}
let memoryStore = new MemoryStore()
export { memoryStore }