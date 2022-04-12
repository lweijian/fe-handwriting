let a = "9007199254740991";
let b = "1234567899999999999";

function MyAdd(a, b) {
    let maxLength = Math.max(a.length, b.length);
    // 用 0 去补齐长度
    a = a.padStart(maxLength , '0'); // "0009007199254740991"
    b = b.padStart(maxLength , '0');
    let carry = 0
    let result = ''
    let sum = 0
    for (let i = a.length-1; i >=0 ; i--) {
        sum = Number(a.charAt(i)) + Number(b.charAt(i)) + carry
        carry = 0
        if (sum >= 10) {
            sum = sum % 10
            carry += 1
        }
        result=sum+result
    }

    if (carry > 0) {
        result=carry+result
    }
    return  result

}


console.log(MyAdd(a, b));
