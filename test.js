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

let i=1;
let abc = setInterval(async () => {
    clearInterval(abc) //- if ww don't clear the interval
    // api call is made evry 1 second and debounce limit is not met hence api is never called
    console.log(i)
    i++;
    let response = await debouncedApiCall(i);
    console.log({response})
}, 1000)
