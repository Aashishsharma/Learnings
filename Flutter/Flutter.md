# Flutter

<https://github.com/iamshaunjp/flutter-beginners-tutorial>

Mobile UI framework for creating android + IOS apps  
Dart is used as a programing lang. for creating apps in flutter

## Dart

Similar to java, statically typed (string can't be addigned to int vars)

```dart
// main func - same as C lang. - required and it is an entyr point
void main() {
    int age = 30;
    String name = 'Ashish';
    bool isMale = true;
    dynamic dn = 'ABC'; // special keyword to assign any type of val to the var (similar to dynamically types langs)
    dn = 123;
    // we shouldn't use dynamic, since it can cause runtime errors in future
    for (int i=0; i<5; i++) {
        print('Hello world')
    }
    String name2 = getName();
    int age2 = getAge();

    // Arrays in dart
    List names = ['abc', 'pqr'];
    name.add('xyz');
    names.remove('abc');

    print(names);

    // in above list var, we have not specified the data type, thus
    names.add(30) // works, but it should not in staticlly typed langs so 

    List<String> names3 = ['abc', 'pqr'] // now names.add(intVal) fails

    // classes
    User userOne = new User('Test', 30);
    print(userOne.name) // O/p - Test
}

// normal func
String getName() {
    return 'Ashish'
}

//arrow func - one liner - syntax different from javascript
int getAge() => 30;

// classes
class User {
    String username;
    int age;

    // constructor
    User(String username, int age) {
        this.username = username;
        this.age = age;
    }
    void login() {
        print('user logged in')
    }
}

// inheritance
class SuperUser extends User {
    // notice the constructor super syntax difference - we are using colon
    SuperUser(String username, int age): super(username, age)

    void publish() {
        print('content published')
    }
}

```

## Components

### Widgets - everything inside a flutter app is a widgets (widget is a class)

Different widgets  

Inbuilt widgets

#### 1. Scaffloding widget (defines layout of a page)

