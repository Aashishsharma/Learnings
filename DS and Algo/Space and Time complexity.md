<table>
  <thead>
    <tr>
      <th>Time Complexity</th>
      <th>Name</th>
      <th>JavaScript Code</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>O(1)</td>
      <td>Constant Time</td>
      <td><code>let x = 5;<br>console.log(x);</code></td>
    </tr>
    <tr>
      <td>O(log n)</td>
      <td>Logarithmic Time</td>
      <td><pre><code>let i = n;
while (i > 0) {
    i = Math.floor(i / 2);
}
console.log(i);</code></pre></td>
    </tr>
    <tr>
      <td>O(n)</td>
      <td>Linear Time</td>
      <td><pre><code>for (let i = 0; i < n; i++) {
    console.log(i);
}</code></pre></td>
    </tr>
    <tr>
      <td>O(n log n)</td>
      <td>Linearithmic Time</td>
      <td><pre><code>for (let i = 0; i < n; i++) {
    for (let j = 0; j < Math.log2(n); j++) {
        console.log(i, j);
    }
}</code></pre></td>
    </tr>
    <tr>
      <td>O(n^2)</td>
      <td>Quadratic Time</td>
      <td><pre><code>for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        console.log(i, j);
    }
}</code></pre></td>
    </tr>
    <tr>
      <td>O(n^c)</td>
      <td>Polynomial Time</td>
      <td><pre><code>function polynomialTime(n) {
    for (let i = 0; i < Math.pow(n, 2); i++) {
        console.log(i);
    }
}
polynomialTime(10);</code></pre></td>
    </tr>
    <tr>
      <td>O(c^n)</td>
      <td>Exponential Time</td>
      <td><pre><code>function exponentialTime(n) {
    if (n <= 0) return;
    exponentialTime(n - 1);
}
exponentialTime(3);</code></pre></td>
    </tr>
    <tr>
      <td>O(n!)</td>
      <td>Factorial Time</td>
      <td><pre><code>function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}
factorial(4);</code></pre></td>
    </tr>
  </tbody>
</table>
