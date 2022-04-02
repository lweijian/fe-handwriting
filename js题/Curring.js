export function curring() {

    let _args = Array.prototype.slice.call(arguments, 1);
    let fn = arguments[0];
    let inner = function () {
        _args.push(...arguments)
        return inner
    }
    inner.toString = function () {
        return fn(..._args);
    }
    return inner;
}
