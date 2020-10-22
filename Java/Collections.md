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
#### 1. HashSet
