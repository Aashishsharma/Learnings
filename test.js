// Debouncing

// step 1  - create a api func which needs to be debounced

let apiCall = (arg) => {
    console.log('api call made ')
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('api call made with arg ', arg)
            resolve({apiRes : 'success'})
        }, 5000);

    })
    return promise;
}

// step 2 - create a debounced function
// this is like higer order func, will take a func and return a func
// so first create a func signature, take a func and return a new func in this func

let debounce = (apiCallFunc, debounceLimit) => {
    let interval = null; // closure application

    // returning new function
    return function () { // if array func is used, then this is empty {} since (learn this)
        return new Promise((resolve, reject) => {
            clearInterval(interval);
            let me = this;
            // console.log(me)
            let args = arguments;
            interval = setTimeout(async () => {
                let apiRes = await apiCallFunc.apply(me, args);
                resolve(apiRes);
            }, debounceLimit);
        })
        
    }

}

let debouncedApiCall = debounce(apiCall, 2000);

// ideally needs to be called with event listeners

// (async () => {
//     // we call debounced call 4 times ata a time, but apiCall is made only once
//      debouncedApiCall(1).then((res) => {
//         console.log({res})
//     })
//     debouncedApiCall(2).then((res) => {
//         console.log({res})
//     })
//     debouncedApiCall(3).then((res) => {
//         console.log({res})
//     })
//     debouncedApiCall(4).then((res) => {
//         console.log({res})
//     }) // only this will be printed - console.log('api call made with arg ', 4)
 
// })()

///////////////////////////////////////////////////////////////////////////

//Throttling
// step 2 - create a throttled function
// this is like higer order func, will take a func and return a func
// so first create a func signature, take a func and return a new func in this func

let throttle = (funcCall, throttleLimit) => {
    let dateNow = new Date();

    return async function () {
        let me = this;
        let args = arguments;

        if(new Date() - dateNow > throttleLimit) {
            return await funcCall.apply(me, args)
        }
    }

}
let throttledApiCall = throttle(apiCall, 2000);

// (async () => {
//     // we call throttled call 4 times ata a time, but apiCall is made only once after the throttlelimit is made
//     throttledApiCall(1).then((res) => {
//         console.log({res})
//     })
//     throttledApiCall(2).then((res) => {
//         console.log({res})
//     })
//     throttledApiCall(3).then((res) => {
//         console.log({res})
//     })
   
//     setTimeout(() =>  {throttledApiCall(4).then((res) => {
//         console.log({res})
//     })} // only this will be printed - console.log('api call made with arg ', 4)
//     , 3000)
 
// })()

///////////////////////////////////////////////////////

// Iterables (requirements)
//1. need to have Symbol.iterator method assigned to a object
// 2. that method should return obj which should have next() method init

// for objects

let iterableObj = {
    firstName: "Ashish",
    lastName: "Sharma"
}

iterableObj[Symbol.iterator] = function() {
    const keys = Object.keys(this);
    let index = 0;
    return {
        next: () => {
            if(index < keys.length) {
                return {value: [keys[index], this[keys[index++]]], done: false}
                
            }
            return {done: true}
        }
    }
}

for (let key of iterableObj) {
    console.log({key})
}

// real use case for classes
// we want to create custom iterator to iterate through our custom class datastrcuture
// point to note - iterator class should be array, set, map of some other object which needs to be iterable
class Students {
    constructor() {
        this.students = [];
    }

    addStudents(name, rollNo, grade) {
        this.students.push({name, rollNo, grade})
    }

    // note how we need to add squre brackets to avoid syntax error
    [Symbol.iterator] = function () {
        let studentsLength = this.students.length;
        let index = 0;

        return {
            next: () => {

                if(studentsLength > index) {
                    return {value: this.students[index++], done: false};
                }

                return {done: true}

            }
        }
    }
}

let stu = new Students();
stu.addStudents('Ashish', 1, 'B')
stu.addStudents('Sharma', 2, 'A')

// if we don't add the iterable method then we get an error
// stu is not iterable
// for (student of stu) {
//     console.log(student)
// }



///////////////////////////////////////////////////////////////////////////////////

// generators
// step 1 - create generator func
// in arrow funcs, generator is not possible

let genFunc = function* ()  {
    let i =0;
    while (1)
        yield i++
}

// step 2- call the generator func to get the iterator
let iterator = genFunc();
// for (let i of iterator) {
//     console.log(i) // will generatir infifnte seqeunce
// }


/////////////////////////////////////////////////

// promise

let arr = [1, 2, 3, 4, 5];

// creating a promise
let promArr = (item) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(item === 1)
              reject(item)
            resolve(item)
        }, 1000*item)
    })

}

// (async () => {
    
//     //parallel promise
//     Promise.all(arr.map((item) => promArr(item))).then((res) => {
//         console.log({res})
//     })

//     //retunrn first promise (doesn't matter resolved or rejected)
//     Promise.race(arr.map((item) => promArr(item))).then((res) => {
//         console.log({res})
//     })

//     //retunrn first resolved promise (if first promise is rejected, then continue till first promise is settled)
//     Promise.any(arr.map((item) => promArr(item))).then((res) => {
//         console.log({res})
//     })

//     //sequential promise
//     for await (i of arr) {
//         console.log(await promArr(i))
//     }
// })()


/// create your own Promise.all
// promsie.all takes array of promises and return a single promise with resolve (all results) or rejected

let promiseAllMyVersion = (arrodPromises) => {

    if(!Array.isArray(arrodPromises))
      throw new Error('Invalid args')
  
    let resolvedPromiseCnt = 0;
    let totalPromise = arrodPromises.length;
    let promArrResult = []
    console.log({arrodPromises})

    return new Promise((resove, reject) => {
        arrodPromises.forEach((element) => {
            if(!(typeof(element) === 'object')) 
                reject('invalid args')
            element.then((res) => {
                promArrResult.push(res)
                resolvedPromiseCnt++;
                if(resolvedPromiseCnt === totalPromise)
                  resove(promArrResult)
            }).catch((e) => {
                reject(e)
            })
        });
    })

}

// below output is same as that of Promise.all()
promiseAllMyVersion(arr.map((item) => promArr(item))).then((res) => {
    console.log({res})
})


class Something {
    #property;
  
    constructor(){
      this.#property = "test";
    }
  
    #privateMethod() {
      return 'hello world';
    }
  
    getPrivateMessage() {
        return this.#property;
    }
  }
  
  const instance = new Something();
  console.log(instance.property); //=> undefined
  console.log(instance.privateMethod); //=> undefined
  console.log(instance.getPrivateMessage()); //=> test
  //console.log(instance.#property); //=> Syntax error
