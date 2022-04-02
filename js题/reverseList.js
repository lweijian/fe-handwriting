//递归翻转链表
export function reverseList(head) {

    if (!head.next){
        return head
    }

    let lastNode=reverseList(head.next);

    lastNode.next=head;
    head.next=null;
    return  head

}
