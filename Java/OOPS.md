## OOPS
Object-Oriented Programming or OOPs refers to languages that uses objects in programming.  
The main aim of OOP is to bind together the data and the functions that operate on them so that no other part of the code can access this data except that function.  

## OOPs Concepts:
1. Polymorphism
2. Inheritance
3. Encapsulation
4. Abstraction
5. Class
6. Object

### 1. Polymorphism
same method name, diff. signature
```java
public class Sum { 
      public int sum(int x, int y)  { 
        return (x + y); 
    	} 
    
       public int sum(int x, int y, int z) { 
        return (x + y + z); 
      } 
    public static void main(String args[]) 
    { 
        Sum s = new Sum(); 
        System.out.println(s.sum(10, 20)); 
        System.out.println(s.sum(10, 20, 30)); 
    } 
} 
```
Polymorphism in Java are mainly of 2 types:  
1. Overloading - above e.g. is overloading
2. Overriding  
Overriding is a feature that allows a subclass or child class to provide a specific implementation of a method that is already provided by one of its super-classes or parent classes. When a method in a subclass has the same name, same parameters or signature, and same return type(or sub-type) as a method in its super-class, then the method in the subclass is said to override the method in the super-class.  
```java
class Parent { 
    void show() 
    { 
        System.out.println("Parent's show()"); 
    } 
} 
class Child extends Parent { 
    //@Override
    void show() 
    { 
        System.out.println("Child's show()"); 
    } 
}  
class Main { 
    public static void main(String[] args) 
    { 
        Parent obj1 = new Parent(); 
        obj1.show(); 
        Parent obj2 = new Child(); 
        obj2.show(); 
    } 
} 
// o/p
//Parent's show()
//Child's show()
//Final, Static, Private methods can not be overridden
```

**Method overriding is one of the way by which java achieve Run Time Polymorphism**  
**Run time Ploymorphism**  
When an overridden method is called through a superclass reference, Java determines which version(superclass/subclasses) of that method is to be executed based upon the type of the object being referred to at the time the call occurs. Thus, this determination is made at run time.  
```java
class A 
{ 
    void m1() 
    { 
        System.out.println("Inside A's m1 method"); 
    } 
}   
class B extends A 
{ 
    void m1() 
    { 
        System.out.println("Inside B's m1 method"); 
    } 
} 
class C extends A 
{ 
    void m1() 
    { 
        System.out.println("Inside C's m1 method"); 
    } 
} 
class Dispatch 
{ 
    public static void main(String args[]) 
    { 
        A a = new A(); 
        B b = new B(); 
        C c = new C(); 
        A ref; 
        ref = a; 
        ref.m1(); 
        ref = b; 
        ref.m1(); 
        ref = c; 
        ref.m1(); 
    } 
} 
//O/P
//Inside A's m1 method
//Inside B's m1 method
//Inside C's m1 method
```
### 2. Inheritance
It is the mechanism in java by which one class is allow to inherit the features(fields and methods) of another class.  
```java
//syntax
class derived-class extends base-class  
{  
   //methods and fields  
} 
```
**Types of Inheritance**  
1. Single Inheritance
2. Multilevel Inheritance
3. Hierarchical Inheritance 
4. Multiple Inheritance (Through Interfaces)  
Java does not support multiple inheritance with classes. In java, we can achieve multiple inheritance only through Interfaces  
But Why not supported?  
Diamond problem. Java won't understand which parent's methos to inherit if both Parents have same method.  
In C++ we have scope resolution operator to specifiy from which parent to inherit, besides Java can use interfaces to achieve this, so why to add multiple inheritance  
5. Hybrid Inheritance(Through Interfaces)  
It is a mix of two or more of the above types of inheritance.  

### 3. Encapsulation (Data hiding)
It is the mechanism that binds together code and the data it manipulates.  
It is a protective shield that prevents the data from being accessed by the code outside this shield.  
As in encapsulation, the data in a class is hidden from other classes using the data hiding concept which is achieved by making the members or methods of class as private  

### 4. Abstraction
Data Abstraction is the property by virtue of which only the essential details are displayed to the user.The trivial or the non-essentials units are not displayed to the user  
In java, abstraction is achieved by interfaces and abstract classes. We can achieve 100% abstraction using interfaces.  
E.g. Shape is an abstract class, Triange, Swuare are it's subclasses  

