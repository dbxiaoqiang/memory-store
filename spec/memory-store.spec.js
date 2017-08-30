const store = require('../com/memory-store.js').memoryStore
describe('test memory store', () => {
    it('interface test', done => {
        expect(store._memstore).not.toBe(undefined)
        done()
    })
    it('set function test', done => {
        let key = 'test', value = 0
        store.set(key, value)
        key = 0, value = 1
        store.set(key, value)
        let result = store.set(key)
        expect(store.get(key)).toBe(undefined)
        expect(result).toEqual(store)
        key = undefined, err = undefined
        try {
            store.set(key, value)
        } catch (e) {
            err = e
        }
        expect(err).not.toBe(undefined)
        key = true, err = undefined
        try {
            store.set(key, value)
        } catch (e) {
            err = e
        }
        expect(err).not.toBe(undefined)
        done()
    })
    it('set function test', done => {
        let key = 'test'
        let ret = store.get(key)
        expect(ret).toBe(0)
        key = 0
        store.set(key, 1)
        ret = store.get(key)
        expect(ret).toBe(1)
        key = undefined, err = undefined
        try {
            store.set(key, value)
        } catch (e) {
            err = e
        }
        expect(err).not.toBe(undefined)
        key = true, err = undefined
        try {
            store.set(key, value)
        } catch (e) {
            err = e
        }
        expect(err).not.toBe(undefined)
        done()
    })
    it('test delete function', done => {
        let key = 'test'
        let ret = store.delete(key)
        expect(ret).toEqual(store)
        ret = store.get(key)
        expect(ret).toBe(undefined)
        key = undefined, err = undefined
        try {
            store.set(key, value)
        } catch (e) {
            err = e
        }
        expect(err).not.toBe(undefined)
        key = true, err = undefined
        try {
            store.set(key, value)
        } catch (e) {
            err = e
        }
        expect(err).not.toBe(undefined)
        done()
    })
    it('test clone function', done => {
        let key1 = 0, key2 = 1, value1 = 'a', value2 = 'b'
        store.set(key1, value1)
        store.set(key2, value2)
        let ret = store.clone()
        expect(ret).not.toEqual(store)
        expect(ret[key1]).toEqual(value1)
        expect(ret[key2]).toEqual(value2)
        done()
    })
    it('test map function', done => {
        let key1 = 0, key2 = 1, value1 = 'a', value2 = 'b'
        store.set(key1, value1)
        store.set(key2, value2)
        let ret = store.map((v, k) => {
            if (k == key1 || k == key2) return v + '1'
        }).then(result => {
            expect(result instanceof Array).toBe(true)
            expect(result.length).toBe(2)
            expect(result[0]).toBe('a1')
            expect(result[1]).toBe('b1')
            return store.map()
        }).catch(error => {
            expect(error).not.toBe(undefined)
            done()
        })
    })
    it('test flush function', done => {
        let ret = store.flush()
        expect(ret).toEqual(store)
        ret = store.map(v=>'test').then(result=>{
            expect(result instanceof Array).toBe(true)
            expect(result.length).toBe(0)
            done()
        })
    })
})