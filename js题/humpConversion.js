//驼峰转换 例如 get-element-by-id 转为 getElementById
export function humpConversion(str) {
    let newStrArr = str.split("-");
    for (let i = 1; i < newStrArr.length; i++) {
        let word = newStrArr[i];
        newStrArr[i] = word.charAt(0).toLocaleUpperCase() + word.slice(1, word.length);
    }
    return newStrArr.join("");
}
