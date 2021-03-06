const state = {
    age: 18,
    name: 'amy',
    father: {
        age: 48,
        name: 'make',
        mother: {
            age: 72,
            name: 'Waki',
            father: {

            }
        }
    },
    mother: {
        name: 'mother'
    }
}

function immer(baseState, callback) {
    let proxies = new Map()
    let copies = new Map()
    let handler = {
        get(target, prop) {
            let proxy = proxies.get(target[prop])
            if(!proxy&&target[prop]!==null&&typeof target[prop]==='object'){
                proxy=createProxy(target[prop])
            }
            return proxy??target[prop]
        },
        set(target, prop, value) {
            let copy = {...target}
            copy[prop] = value
            copies.set(target, copy)
            return true;
        }
    }

    function hasChange(base) {
        if (!proxies.has(base)) return false
        if (copies.has(base)) return true
        for (const key of Object.keys(base)) {
            if (hasChange(base[key])) {
                return true
            }
        }
        return false
    }

    function finalizeArray(base) {
        if(!hasChange(base)){
            return base
        }
        if(copies.has(base)){
            return  copies.get(base)
        }
        let result={...base}
        copies.set(base,result)
        result.forEach((value, index) => {
            result[index] = finalize(base[index])
        })


    }
    function finalizeObject(base) {
        if(!hasChange(base)){
          return base
        }
        if(copies.has(base)){
            return  copies.get(base)
        }
        let result={...base}
        copies.set(base,result)
        for (const key of Object.keys(base)) {
           result[key]=finalize(base[key])
        }
        return result
    }


    function finalize(base) {
        if (isPlainObject(base)) return finalizeObject(base)
        if (Array.isArray(base)) return finalizeArray(base)
        return base
    }
    function createProxy(base) {
        if(base!==null&&typeof base==='object'){
            const proxy = new Proxy(base, handler)
            proxies.set(base,proxy)
            return proxy
        }
      return  base

    }

    const proxy= createProxy(baseState)
    callback(proxy)
    return finalize(baseState)
}

function isPlainObject(value) {
    if (value === null || typeof value !== "object") return false
    const proto = Object.getPrototypeOf(value)
    return proto === Object.prototype || proto === null
}


const copy = immer(state, (draft) => {
    draft.father.mother.name = 'father';
})
console.log(copy.father === state.father)//false
console.log(copy.mother === state.mother)//true
console.log(copy.father.mother === state.father.mother)//false
console.log(copy === state)//false
console.log(copy.father.mother.father === state.father.mother.father)//true

const state2={
    a: [],
    p: {
        x: 1
    }
}
const copy2 = immer(state2, (draft) => {
    draft.a.push(2);
})
console.log(state2.a === copy2.a )// false
console.log(state2.p === copy2.p )// true
