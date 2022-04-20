var calculate = function(s='') {
    s = s.trim() // 去除字符串两端空格
    let stack = [] // 定义一个栈
    let preSign = '+' // 默认一个前置位是“+”
    let num = 0 // 默认最开始的数加0
    for (let i = 0; i < s.length; i++) {
        // 是数字并且不为空时
        if (!isNaN(s[i]) && s[i] !== ' ') {
            num = num * 10 + Number(s[i])
        }
        // 符号或者走到末尾时
        if (isNaN(s[i]) || i == s.length - 1) {
            switch (preSign) {
                case '+':
                    stack.push(num)
                    break;
                case '-':
                    stack.push(-num)
                    break;
                case '*':
                    stack.push(stack.pop() * num)
                    break;
                case '/':
                    stack.push(stack.pop() / num | 0)
                    break;
                default:
                    break;
            }
            preSign = s[i]
            num = 0
        }
    }
    return stack.reduce((a, b) => a + b)
};
calculate('1+2*3')
