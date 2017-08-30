import * as _ from 'lodash'
import stringify from 'json-stringify-safe'

class MemoryStore {
    constructor() {
        this._memstore = {}
    }
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
    set(key, value = undefined) {
        if (!checkKey(key)) throw new Error('Key的类型 只能为字符或者数字')
        this._memstore[key] = value
        return this
    }
    get(key) {
        if (!checkKey(key)) throw new Error('Key的类型 只能为字符或者数字')
        return this._memstore[key]
    }
    delete(key) {
        if (!checkKey(key)) throw new Error('Key的类型 只能为字符或者数字')
        delete this._memstore[key]
        return this
    }
    flush() {
        this._memstore = {}
        return this
    }
    clone() {
        return JSON.parse(stringify(this._memstore))
    }
}
function checkKey(key) {
    return (_.isString(key) && key) || _.isNumber(key)
}
let memoryStore = new MemoryStore()
export { memoryStore }