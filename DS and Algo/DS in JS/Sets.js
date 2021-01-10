// Sets - unique elems, can't rely to retuen elems in same order
// ES6 has set class, but does not contain all set functionlaity like union, intersection, difference, subset

/* Sets */

class MySet {
    // the const collection will hold the set
    collection = [];
    // this method will check for the presence of an element and return true or false
    has = function(element) {
      return (this.collection.indexOf(element) !== -1);
    };
    // this method will return all the values in the set
    values = function() {
      return this.collection;
    };
    // this method will add an element to the set
    add = function(element) {
      if(!this.has(element)){
        this.collection.push(element);
        return true;
      }
      return false;
    };
    // this method will remove an element from a set
    remove = function(element) {
      if(this.has(element)){
        index = this.collection.indexOf(element);
        this.collection.splice(index,1);
        return true;
      }
      return false;
    };
    // this method will return the size of the collection
    size = function() {
      return this.collection.length;
    };
    // this method will return the union of two sets
    union = function(otherSet) {
      const unionSet = new mySet();
      const firstSet = this.values();
      const secondSet = otherSet.values();
      firstSet.forEach(function(e){
        unionSet.add(e);
      });
      secondSet.forEach(function(e){
        unionSet.add(e);
      });
      return unionSet;
    };
    // this method will return the intersection of two sets as a new set
    intersection = function(otherSet) {
      const intersectionSet = new MySet();
      const firstSet = this.values();
      firstSet.forEach(function(e){
          if(otherSet.has(e)){
              intersectionSet.add(e);
          }
      });
      return intersectionSet;
    };
    // this method will return the difference of two sets as a new set
    difference = function(otherSet) {
      const differenceSet = new MySet();
      const firstSet = this.values();
      firstSet.forEach(function(e){
        if(!otherSet.has(e)){
            differenceSet.add(e);
        }
      });
      return differenceSet;
    };
    // this method will test if the set is a subset of a different set
    subset = function(otherSet) {
      const firstSet = this.values();
      // every fun returns true if all elems of the array pass the test
      // i.e, if all elems of firstSet return true for the inner fun, then every returns true
      // if even single elem fails the test, every returns false
      return firstSet.every(function(value) {
        return otherSet.has(value);
      });
    };
}
const setA = new MySet();  
const setB = new MySet();  
setA.add("a");  setB.add("b");  setB.add("c");  setB.add("a");  setB.add("d");  
console.log(setA.subset(setB));
console.log(setA.intersection(setB).values());
console.log(setB.difference(setA).values());
