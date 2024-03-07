# Time complexity

| Time Complexity | Name                 | JavaScript Code                                                   |
|-----------------|----------------------|---------------------------------------------------------------------|
| O(1)            | Constant Time        | `let x = 5; console.log(x);`                                       |
| O(log n)        | Logarithmic Time     | ```
                                              let i = n;
                                              while (i > 0) {
                                                  i = Math.floor(i / 2);
                                              }
                                          ```                             |
| O(n)            | Linear Time          | ```
                                              for (let i = 0; i < n; i++) {
                                                  console.log(i);
                                              }
                                          ```                             |
| O(n log n)      | Linearithmic Time    | ```javascript
                                              for (let i = 0; i < n; i++) {
                                                  for (let j = 0; j < Math.log2(n); j++) {
                                                      console.log(i, j);
                                                  }
                                              }
                                          ```                             |
| O(n^2)          | Quadratic Time       | ```javascript
                                              for (let i = 0; i < n; i++) {
                                                  for (let j = 0; j < n; j++) {
                                                      console.log(i, j);
                                                  }
                                              }
                                          ```                             |
| O(n^c)          | Polynomial Time      | *Not commonly implemented in JavaScript*                           |
| O(c^n)          | Exponential Time     | *Not commonly implemented in JavaScript*                           |
| O(n!)           | Factorial Time       | *Not commonly implemented in JavaScript*                           |

