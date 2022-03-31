//深拷贝
const typeMap = {
    object: '[object Object]',
    date: '[object Date]',
    array: '[object Array]',
    regexp: '[object RegExp]',
    set: '[object Set]',
    map: '[object Map]',
}

function getType(target) {
    return Object.prototype.toString.call(target)
}

function setTypeHandler(target, map) {
    let set = new Set()
    if (map.has(target)) {
        return map.get(target)
    }
    map.set(target,set)
    for (const setItem of target) {
        set.add(cloneDeep(setItem, map))
    }
    return set
}

function mapTypeHandler(target, map) {
    let retMap = new Map()
    if (map.has(target)) {
        return map.get(target)
    }
    map.set(target,retMap)

    for (const [key, value] of target) {
        retMap.set(cloneDeep(key,map), cloneDeep(value, map))
    }
    return retMap
}

function symbolTypeHandler(target) {
    Symbol(target.description)
}

function functionTypeHandler(target, thisArgs) {
    return function (...args) {
        return Reflect.apply(target, thisArgs, args)
    }
}

function arrayTypeHandler(target,map) {
    let res=[]
    if (map.has(target)) {
        return map.get(target)
    }
    map.set(target,res)

    for (const item of target) {
        res.push(cloneDeep(item, map))
    }
    return res
}
function objectTypeHandler(target,map) {
    let res={}
    if (map.has(target)) {
        return map.get(target)
    }
    map.set(target,res)

    for (const key of Object.keys(target)) {
        res[key] = cloneDeep(target[key], map)
    }
    return  res
}
function cloneDeep(target, map = new WeakMap()) {
    let tag = getType(target);

    switch (typeof target) {
        case "bigint":
        case "boolean":
        case "string":
        case "undefined":
        case "number":
            return target;
        case "function":
            return functionTypeHandler(target, this)
        case "symbol":
          return   symbolTypeHandler(target)
    }

    switch (tag){
        case typeMap.set:
            return setTypeHandler(target, map);
        case typeMap.map:
            return mapTypeHandler(target, map);
        case typeMap.date:
            return new target.constructor(target);
        case typeMap.regexp:
            return new target.constructor(target.source, target.flags);
        case typeMap.array:
            return arrayTypeHandler(target,map);
        case typeMap.object:
            return objectTypeHandler(target,map)
    }
}

//test1
// var object = {
//     'foo': { 'b': { 'c': { 'd': {} } } },
//     'bar': {}
// };
//
// object.foo.b.c.d = object;
// object.bar.b = object.foo.b;
//
// var actual = cloneDeep(object);
// console.log(actual.bar.b === actual.foo.b && actual === actual.foo.b.c.d && actual !== object)//true


//test2
// const data2 = {
//     obj: {},
//     arr: [],
//     reg: /reg/g,
//     date: new Date('2019'),
//     person: new Person('xxx'),
//     set: new Set([{foo: 'set'}]),
//     map: new Map([[{key: 'map'}, {value: 'map'}]])
// }
//
// function Person(name) {
//     this.name = name
// }
//
// const dataClone2 = cloneDeep(data2)
//
//
// // 比较引用地址
// console.log(data2.obj === dataClone2.obj)                 // false
// console.log(data2.arr === dataClone2.arr)                 // false
// console.log(data2.reg === dataClone2.reg)                 // false
// console.log(data2.date === dataClone2.date)               // false
// console.log(data2.func === dataClone2.func)               // true
// console.log([...data2.set][0] === [...dataClone2.set][0]) // false
// console.log([...data2.map.keys()][0] === [...dataClone2.map.keys()][0])     // false
// console.log([...data2.map.values()][0] === [...dataClone2.map.values()][0]) // false


//test3 -------------------------------
// const symbol = Symbol('sym')
//
// const data = {
//     obj: {},
//     arr: [],
//     reg: /reg/g,
//     date: new Date('2019'),
//     person: new Person('xxx'),
//     [symbol]: 'symbol',
//     set: new Set([{foo: 'set'}]),
//     map: new Map([[{key: 'map'}, {value: 'map'}]])
// }
//
// function Person(name) {
//     this.name = name
// }
//
//
//
// const temp = {}
// const data1 = {
//     a: temp,
//     b: temp,
// }
//
// const obj = {}
// obj.obj = obj
//
// const arr = []
// arr[0] = arr
//
// const set = new Set()
// set.add(set)
//
// const map = new Map()
// map.set(map, map)
//
//
// // 验证循环引用
// console.log('obj:\n', cloneDeep(obj))
// console.log('arr:\n', cloneDeep(arr))
// console.log('set:\n', cloneDeep(set))
// console.log('map:\n', cloneDeep(map))
