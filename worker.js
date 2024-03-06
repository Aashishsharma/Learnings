self.onmessage = function(event) {
  const rangeStart = event.data.rangeStart;
  const rangeEnd = event.data.rangeEnd;
  const primeNumbers = calculatePrimesInRange(rangeStart, rangeEnd);
  
  self.postMessage(primeNumbers);
};

function calculatePrimesInRange(start, end) {
  const primes = [];
  for (let num = start; num <= end; num++) {
    if (isPrime(num)) {
      primes.push(num);
    }
  }
  return primes;
}

function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }

  return true;
}
