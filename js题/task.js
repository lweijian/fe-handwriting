const task = [{
    pre: null,
    id: '1',
    name: 'task1',
    needTime: 3
}, {
    pre: '1',
    id: '2',
    name: 'task2',
    needTime: 3
}, {
    pre: '1',
    id: '3',
    name: 'task3',
    needTime: 5
}, {
        pre: null,
        id: '4',
        name: 'task4',
        needTime: 3
}
]


// 转换为
const compute=[
    {
        pre: null,
        id: '1',
        name: 'task1',
        children:[
            {
                pre: '1',
                id: '2',
                name: 'task2',
                needTime: 3,
                children:[
                    {
                        pre:'3',
                        id:'5',
                        name:'task4',
                        needTime:5
                    }
                ]
            },
            {
                pre: '1',
                id: '3',
                name: 'task3',
                needTime: 4,
            }
        ],
        needTime: 3
    },
    {
        pre: null,
        id: '4',
        name: 'task4',
        needTime: 3
    }
]

function convert(allTask) {
    let result=[]
    let map=new Map()
    for (const task of allTask) {
        map.set(task.id,task)
    }
    for (const task of allTask){
        if(!task.pre){
            result.push(task)
        }else {
            const preTask=map.get(task.pre)
            preTask.children = Array.isArray(preTask.children)?[...preTask.children,task]:[task]
        }
    }

    return result
}

//遍历，计算一块的总时间
function computed(arr) {
    if(!arr) return 0
    let maxTime=0
    for (const obj of arr) {
        maxTime=Math.max(maxTime,computed(obj.children)+obj.needTime)
    }
    return  maxTime
}

console.log(computed(convert(task)));

