let staarr={
    'a-b-c-d':1,
    'a-b-c-e':2,
    'a-b-f':3,
    'a-j':4
}

// let obj={
//     a:{
//         b:{
//             c:{
//                 d:1,
//                 e:2
//             },
//             f:3,
//         },
//         j:4
//     }
// }
//staarr转obj
let obj2=JSON.parse(JSON.stringify(staarr))


// function change(source,target={}) {
//     let stringKeys=Object.keys(source)
//     for (const stringKey of stringKeys) {
//         let objKeys=stringKey.split('-')
//         let temp=target
//         for (let i = 0; i <objKeys.length-1 ; i++) {
//             let key=objKeys[i]
//             if(!temp[key]){
//                 temp[key]={}
//             }
//             temp=temp[key]
//         }
//         let endKey=objKeys[objKeys.length-1];
//         temp[endKey]=source[stringKey]
//     }
//     return target
// }
//
//
// console.log(change(staarr))


