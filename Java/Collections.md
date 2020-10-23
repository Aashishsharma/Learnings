## Collections
A Collection is a group of individual objects represented as a single unit.  

**Java Collections vs Data Structures**  
A data structure is how the data is represented inside the storage in memory. A collection is how it can be accessed. Stress on the word "can".  
If you store data in a LinkedList and sort it, the performance will drop. The same algorithm if you use a ArrayList the performance will enhance. Just by changing the way its represented in memory will help various factors  
**Java Collections**  
![alt text](PNG/Collections.PNG "Title") 

### 1. Iterators
Iterators are used in Collection framework in Java to retrieve elements one by one.   
It is a universal iterator as we can apply it to any Collection object. By using Iterator, we can perform both read and remove operations  
```java
//syntax
// Here "c" is any Collection object. itr is of
// type Iterator interface and refers to "c"
Iterator itr = c.iterator();

//e.g.
import java.util.ArrayList; 
import java.util.Iterator; 
  
public class Test 
{ 
    public static void main(String[] args) 
    { 
        ArrayList<Integer> al = new ArrayList<Integer>(); 
        for (int i = 0; i < 10; i++) 
            al.add(i); 
        System.out.println(al); 
        Iterator itr = al.iterator(); 
          while (itr.hasNext()) 
        { 
            int i = (Integer)itr.next(); 
            System.out.print(i + " "); 
            if (i % 2 != 0) 
               itr.remove();  
        } 
        System.out.println();  
        System.out.println(al); 
    } 
} 
//o/p
//[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
//0 1 2 3 4 5 6 7 8 9 
//[0, 2, 4, 6, 8]
//Only forward direction iterating is possible.
//Replacement and addition of new element is not supported by Iterator.
```
We also have ListIterators which iterate only lists  
They have additional methods like previous, add and others  
Syntax same as iterator  
**Iterator vs forEach**  
1. If we have to modify collection, we can use Iterator.  
2. While using nested for loops it is better to use for-each loop, consider the below code for better understanding.  

## 2. Collections
Before Collection Framework(or before JDK 1.2) was introduced, the standard methods for grouping Java objects (or collections) were Arrays or Vectors or Hashtables. All of these collections had no common interface (to add/remove element, each of the above objs had different methods. Need to remember all).  
Thus collections framework provide below advanatages  
1. Consistent API
2. Reduces programming effort
3. Increases program speed and quality  
Increases performance by providing high-performance implementations of useful data structures and algorithms because in this case, the programmer need not think of the best implementation of a specific data structure  

## 3. Set
Set is an unordered collection of objects in which duplicate values cannot be stored.  
```java
//syntax
// Obj is the type of the object to be stored in Set
Set<Obj> set = new HashSet<Obj> ();
```
The set interface allows the users to perform the basic mathematical operation on the set like union, intersect and difference  
```java
// Java program to demonstrate the 
// union, intersection and difference 
// operations on the Set 
import java.util.*;  
public class SetExample  
{  
    public static void main(String args[])  
    {  
        Set<Integer> a = new HashSet<Integer>();  
        a.addAll(Arrays.asList(new Integer[] {1, 3, 2, 4, 8, 9, 0}));  
        Set<Integer> b = new HashSet<Integer>();  
        b.addAll(Arrays.asList(new Integer[] {1, 3, 7, 5, 4, 0, 7, 5}));  
        Set<Integer> union = new HashSet<Integer>(a);  
        union.addAll(b);  
        System.out.print("Union of the two Set");  
        System.out.println(union);  
        Set<Integer> intersection = new HashSet<Integer>(a);  
        intersection.retainAll(b);  
        System.out.print("Intersection of the two Set");  
        System.out.println(intersection);  
        Set<Integer> difference = new HashSet<Integer>(a);  
        difference.removeAll(b);  
        System.out.print("Difference of the two Set");  
        System.out.println(difference);  
    }  
}
// o/p
// Union of the two Set[0, 1, 2, 3, 4, 5, 7, 8, 9]
// Intersection of the two Set[0, 1, 3, 4]
// Difference of the two Set[2, 8, 9] 
```

Classes which implement the Set interface in Java Collections
1. HashSet
2. LinkedHashSet
3. TreeSet

#### 1. HashSet
1. Implements Set Interface.
2. The underlying data structure for HashSet is Hashtable.
3. As it implements the Set Interface, duplicate values are not allowed.
4. Objects that you insert in HashSet are not guaranteed to be inserted in the same order. Objects are inserted based on their hash code.
5. NULL elements are allowed in HashSet.
```java
import java.util.*; 
class GFG{  
    public static void main(String[] args) 
    { 
        Set<String> h = new HashSet<String>(); 
        h.add("India"); 
        h.add("Australia"); 
        h.add("South Africa"); 
        h.add("India"); 
        System.out.println(h); 
        h.remove("Australia"); 
        System.out.println("Set after removing " + "Australia:" + h); 
        System.out.println("Iterating over set:"); 
        Iterator<String> i = h.iterator(); 
        while (i.hasNext()) 
            System.out.println(i.next()); 
    } 
}
// o/p
// [South Africa, Australia, India]
// Set after removing Australia:[South Africa, India]
// Iterating over set:
// South Africa
// India
```
Load Factor: The load factor is a measure of how full the HashSet is allowed to get before its capacity is automatically increased.  
**Load Factor = (No.of.Stored.elements.in.table)/(Size.of.Hash.Table)**  
If internal capacity is 16 and the load factor is 0.75 then the number of buckets will automatically get increased when the table has 12 elements in it.  
**Effect on performance:**  
A load factor of 0.75 provides very effective performance with respect to time and space complexity. If we increase the load factor value more than that then memory overhead will be reduced (because it will decrease internal rebuilding operation) but, it will affect the add and search operation in the hashtable.
```java
HashSet<E> hs = new HashSet<E>(int initialCapacity, float loadFactor);
```
Time Complexity of HashSet Operations: The underlying data structure for HashSet is hashtable. So amortize (average or usual case) time complexity for add, remove and look-up (contains method) operation of HashSet takes O(1) time.  

#### 2. LinkedHashSet
The LinkedHashSet is an ordered version of HashSet that maintains a doubly-linked List across all elements.  
When cycling through LinkedHashSet using an iterator, the elements will be returned in the order in which they were inserted.  
1. Contains unique elements only like HashSet. It extends the HashSet class and implements the Set interface.
2. Maintains insertion order.  
```java
LinkedHashSet<E> hs = new LinkedHashSet<E>(int capacity, int fillRatio)
```
When the number of elements exceeds the capacity of the hash set is multiplied with the fill ratio thus expanding the capacity of the LinkedHashSet.  
```java
// Java Program to illustrate the LinkedHashSet 
import java.util.LinkedHashSet;  
  
public class LinkedHashSetExample  
{   
    public static void main(String[] args)  
    {   
        LinkedHashSet<String> linkedset =  new LinkedHashSet<String>();    
        linkedset.add("A");   
        linkedset.add("B");   
        linkedset.add("C");   
        linkedset.add("D");  
        // This will not add new element as A already exists  
        linkedset.add("A");  
        linkedset.add("E");   
        System.out.println("Size of LinkedHashSet = " + linkedset.size());   
        System.out.println("Original LinkedHashSet:" + linkedset);   
        System.out.println("Removing D from LinkedHashSet: " + linkedset.remove("D"));   
        System.out.println("Trying to Remove Z which is not "+ "present: " + linkedset.remove("Z"));   
        System.out.println("Checking if A is present=" + linkedset.contains("A")); 
        System.out.println("Updated LinkedHashSet: " + linkedset);   
    	Iterator itr = hs.iterator(); 
        while (itr.hasNext()) 
            System.out.print(itr.next() + ", "); 
        System.out.println(); 
    }   
}
// Size of LinkedHashSet=5
// Original LinkedHashSet:[A, B, C, D, E]
// Removing D from LinkedHashSet: true
// Trying to Remove Z which is not present: false
// Checking if A is present=true
// Updated LinkedHashSet: [A, B, C, E]
// A, B, C, E
```

#### 3. TreeSet
TreeSet provides an implementation of the SortedSet Interface and SortedSet extends Set Interface. It behaves like simple set with the exception that it stores elements in sorted format  
1. TreeSet uses tree data structure for storage.
2. Objects are stored in sorted, ascending order. But we can iterate in descending order using method 
3. TreeSet.descendingIterator().
4. Access and retrieval times are very fast which make TreeSet an excellent choice for storage of large volume of data in sorted format.  
```java
import java.util.Iterator; 
import java.util.TreeSet; 
public class TreeSetExample 
{ 
    public static void main(String[] args) 
    { 
        TreeSet<Integer> ts = new TreeSet<Integer>(); 
        ts.add(10); 
        ts.add(61); 
        ts.add(87); 
        ts.add(39); 
        Iterator<Integer> iterator = ts.iterator(); 
        System.out.print("Tree set data: "); 
        // note that 87 being largest element, appears in 
        // the last. 
        while (iterator.hasNext()) 
            System.out.print(iterator.next() + " "); 
        System.out.println(); 
        // to check if treeset is empty or not. 
        if (ts.isEmpty()) 
            System.out.print("Tree Set is empty."); 
        else
            System.out.println("Tree Set size: " + ts.size()); 
        // To get the smallest element from the set 
        System.out.println("First data: " + ts.first()); 
        // To get the largest value from set 
        System.out.println("Last data: " + ts.last()); 
          // remove 61 from set. 
        if (ts.remove(61)) 
            System.out.println("Data is removed from tree set"); 
        else
            System.out.println("Data doesn't exist!"); 
          // Remove all 
        ts.clear(); 
        if (ts.isEmpty()) 
            System.out.print("Tree Set is empty."); 
        else
            System.out.println("Tree Set size: " + ts.size()); 
    } 
} 
// o/p
// Tree set data: 10 39 61 87 
// Tree Set size: 4
// First data: 10
// Last data: 87
// Data is removed from tree set
// Tree Set is empty.
```
TreeSet is basically an implementation of a self-balancing binary search tree like a Red-Black Tree. Therefore operations like add, remove, and search take O(log(N)) time.  
However, operations like printing N elements in the sorted order takes O(N) time.

## 4. List
The List interface provides a way to store the ordered collection.  
Since List preserves the insertion order, it allows positional access and insertion of elements  

Classes which implement the List Interface
1. ArrayList
2. Vector
3. Stack
4. LinkedList
4. 

#### 1. ArrayList
It provides us with dynamic arrays in Java. Though, it may be slower than standard arrays but can be helpful in programs where lots of manipulation in the array is needed.  
In Java, "normal" arrays are fixed-size. You have to give them a size and can't expand them or contract them. To change the size, you have to make a new array and copy the data you want - which is inefficient and a pain for you.  
```java
import java.util.*; 
public class GFG { 
    public static void main(String args[]) 
    { 
        ArrayList<String> al = new ArrayList<>(); 
        al.add("Geeks"); 
        al.add("Geeks"); 
        al.add(1, "For"); 
        System.out.println("Initial ArrayList " + al); 
        al.remove(1); 
        System.out.println("After the Index Removal " + al); 
        al.remove("Geeks"); 
        System.out.println("After the Object Removal " + al);
        Iterator<String> iter  = al.iterator(); 
        while (iter.hasNext()) { 
            System.out.print(iter.next() + " "); 
        }
    } 
} 
//Initial ArrayList [Geeks, For, Geeks]
//After the Index Removal [Geeks, Geeks]
//After the Object Removal [Geeks]
// Geeks
```

#### 2. Vector
1. Vector implements a dynamic array that means it can grow or shrink as required. Like an array, it contains components that can be accessed using an integer index
2. They are very similar to ArrayList but Vector is synchronized and has some legacy method that the collection framework does not contain.  
3. As it is synchronized, it gives a poor performance in adding, searching, delete and update of its elements.  
Implementation code - see ArrayList, replace ArrayList with Vector name  

#### 3. Stack
Stack class that models and implements a Stack data structure. The class is based on the basic principle of last-in-first-out. In addition to the basic push and pop operations, the class provides three more functions of empty, search, and peek. The class can also be said to extend Vector and treats the class as a stack with the five mentioned functions  
```java
import java.io.*; 
import java.util.*; 
class StackDemo { 
    public static void main(String[] args) 
    { 
        Stack<String> stack1 = new Stack<String>(); 
        stack1.push(4); 
        stack1.push("All"); 
        stack1.push("Geeks");
        // Displaying the Stack 
        System.out.println("Initial Stack: " + stack); 
        // Fetching top element of the Stack 
        // this does not remove top element
        System.out.println("The element at the top of the"+ " stack is: " + stack.peek());
        // Removing elements using pop() method 
        System.out.println("Popped element: "+ stack.pop());
```
Please note that the Stack class in Java is a legacy class and inherits from Vector in Java. It is a thread-safe class and hence involves overhead when we do not need thread safety. It is recommended to use ArrayDeque for stack implementation as it is more efficient in a single-threaded environment.  

#### 4. Linkedlist
1. Implementation of the LinkedList data structure which is a linear data structure
2. elements are not stored in contiguous locations and every element is a separate object with a data part and address part. 
3. The elements are linked using pointers and addresses. 
4. In case of insertions and deletions, they are preferred over the arrays. 
5. It also has few disadvantages like the nodes cannot be accessed directly instead we need to start from the head and follow through the link to reach to a node we wish to access.
```java
import java.util.*; 
public class Test { 
    public static void main(String args[]) 
    { 
        LinkedList<String> ll = new LinkedList<String>(); 
        ll.add("A"); 
        ll.add("B"); 
        ll.addLast("C"); 
        ll.addFirst("D"); 
        ll.add(2, "E"); 
        System.out.println(ll);   
        ll.remove("B"); 
        ll.remove(3); 
        ll.removeFirst(); 
        ll.removeLast(); 
        System.out.println(ll); 
        Iterator<String> iter  = ll.iterator(); 
        while (iter.hasNext()) { 
            System.out.print(iter.next() + " "); 
        }
    } 
} 
//o/p
//[D, A, E, B, C]
//[A]
// A
```
Find doubly Linked list class in Java