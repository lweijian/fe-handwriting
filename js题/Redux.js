function createStore(reducer, initState, applyMiddleWare) {
    let state = initState ?? {}
    let listeners = []
    if (applyMiddleWare) {
        return applyMiddleWare(createStore)(reducer,initState)
    }
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(callback => {
            callback()
        })
    }
    function subscribe(callback) {
        listeners.push(callback)
    }
    function getState() {
        return state
    }
    return {
        dispatch,
        subscribe,
        getState
    }
}


 const applyMiddleWare = (...middleWares) => (oldCreateStore) => (reducer, initState) => {
    const store = oldCreateStore(reducer, initState)

    const chain = middleWares.map(middleWare => middleWare(store.getState()))
    let dispatch = chain.reduceRight(((pre, cur) => {
        return cur(pre)
    }), store.dispatch)
    return {
        dispatch,
        getState:store.getState,
        subscribe:store.subscribe
    }
}
function reducer(state, action) {
    switch (action.type) {
        case 'add':
            return {...state, count: state.count + 1}
        default:
            return {...state}
    }
}
const loggerMiddleWare = (state) => (next) => (action) => {
    console.log('dispatch前', state)
    next(action)
    console.log('dispatch后', state)
}
const catchMiddleWare = (state) => (next) => (action) => {
    try {
        console.log('捕获', state)
        next(action)
    } catch (e) {
        console.log(e)
    }
}

function combine(reducers) {
    return function combineReducers(state, action) {
        state = {...state}
        for (const key of Object.keys(reducers)) {
            state[key] = reducers[key](state[key], action)
        }
        return state
    }
}


function compose(...fns) {
    if (fns.length === 1) {
        return fns[0]
    }
    return fns.reduce((pre, cur) => (...args) => {
        return pre(cur(...args))
    })
}

let store = createStore(reducer, {count: 0}, applyMiddleWare(catchMiddleWare,loggerMiddleWare));
store.subscribe(() => {
    console.log(store.getState());
})
store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch({type: 'add'})
