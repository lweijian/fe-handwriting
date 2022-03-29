// 类继承实现
function Parent() {
    this.name='make'
}
Parent.prototype.isParent=function () {
    return true
}
function Child() {
    //继承实例
    Parent.call(this)
}
// 继承原型链
//子类的原型指向父类，子类的原型对象的原型是父类的原型对象
Child.__proto__=Parent
Child.prototype=Object.create(Parent.prototype)
Child.prototype.constructor=Child

const child=new Child()
console.log(child.constructor)
console.log(child.isParent())
console.log(child.name)
