// instanceOf
function instanceOf(source,target) {
   const  targetProtoType=target.prototype
   let proto=source.__proto__
   while (proto!==null){
      if(proto===targetProtoType){
         return  true
      }else {
         proto=proto.__proto__
      }

   }
   return false;
}
class Class extends Array{

}

console.log(instanceOf(new Class(), Array));
