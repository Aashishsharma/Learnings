
 //* Definition for singly-linked list.
  function ListNode(val, next) {
      this.val = (val===undefined ? 0 : val)
      this.next = (next===undefined ? null : next)
 }

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {

    let startPtr = head.next;
    let preVtr = head;

    while(startPtr) {
        if(startPtr.val !== startPtr.next?.val) {
            startPtr = startPtr.next;
            continue
        } else {
            preVtr.next = startPtr;
            preVtr = startPtr;
            startPtr = startPtr.next
        }


    }
    return head
    
};

let ll = new ListNode(4, null)
let ll2 = new ListNode(4, ll)
let ll3 = new ListNode(2, ll2)
let ll4 = new ListNode(1, ll3)


console.log(deleteDuplicates(ll4))