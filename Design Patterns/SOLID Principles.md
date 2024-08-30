## SOLID Principles
1. **Why?**  - let's us to write more maintainable, understandable, and flexible software  

### 1. **Single resposibility** - 
This principle states that a class should only have one responsibility. It should only have one reason to change, this reason for change should not change, e.g, if a PrintBook class changes only when display needs to be changed, then any other change in the application shouldn't result in changing this class

### 2. **Open/closed** 
- open for extension, closed for modification never re-write (existing)code, del old code n write new code, no re-write then no bugs.  

**How to achieve open close principle** - 
1. Inheritance
2. Decorator pattern, additional functionality added to class/function
3. Using Attributes - in React, if 

### 3. **Liskov's substitution** - 
subclass should be substitutable for the baseclass at any given point of time. 
1. **preconditions** - (same/weaker e.g, subclass method inherited from baseclass must accept all parameters from BClass + more if required, thus if Bclass is replaced by SClass, code would not break since no req. args for BClass is missing)
2. **postcondition** - (same/stronger - SClass must return same/subset of values returned by BClass, if additional values are returned or is SClass throws more generic exception then BClass, then BClass can't be replaced by SClass, since the new exception isn't handeled in the code where BClass is replaced via SClass), if BClass can't be replaced by SClass, maybe inheritance is not required

**Anywhere you want to extend a class, follow these conditions**

#### 4. **Interface segregation** -  
Better to have too many small interfaces then to having to few large interfaces, benifit(results to composition over inheritance n decoupling), the ideas is to not force a class implementing interface to implement a method which it doesn't need, (e.g, Animal interface {eat,sleep,move}, but there is some fish which doesn't sleep, so we are forcing that fish class to implement sleep, not good, instaed break Animal interface into multiple interfaces, and split eat/sleep/move methods)

**Anwhere you are implemeting DB class, create separate interface for save, select methods, because some classes implenting this interface only need to read the data**

#### 5 **Dependency inversion** - 
Dependency injection(constructor injection), inversion(high n low level module must depend on abstraction rather than on concretion(this happends in injection)), class MyDB{constructor(SQLConn:conn)} here it is injection, what inversion says is intead of SQLConn use most generic DBConn(abstract class/interface)
```typescript
// 1. Define an abstraction for payment gateways using an interface.
// This ensures that the business logic is decoupled from specific payment gateway implementations.
export interface IPaymentGateway {
    processPayment(amount: number, currency: string): Promise<boolean>;
    refundPayment(transactionId: string): Promise<boolean>;
}

// 2. Implement the interface for specific payment gateways (e.g., PayPal, Stripe).
// Each implementation handles the specifics of interacting with the respective payment gateway's API.

export class PayPalGateway implements IPaymentGateway {
    async processPayment(amount: number, currency: string): Promise<boolean> {
        // PayPal-specific API call to process payment
        return true; // Assume success for this example
    }

    async refundPayment(transactionId: string): Promise<boolean> {
        // PayPal-specific API call to refund payment
        return true;
    }
}

export class StripeGateway implements IPaymentGateway {
    async processPayment(amount: number, currency: string): Promise<boolean> {
        // Stripe-specific API call to process payment
        return true;
    }

    async refundPayment(transactionId: string): Promise<boolean> {
        return true;
    }
}

// 3. Inject the dependency into the business logic class.
// This allows the PaymentService to work with any payment gateway implementation that adheres to the IPaymentGateway interface.

class PaymentService {
    private paymentGateway: IPaymentGateway;

    constructor(paymentGateway: IPaymentGateway) {
        this.paymentGateway = paymentGateway;
    }

    async processOrderPayment(orderId: string, amount: number, currency: string): Promise<boolean> {
        // Business logic for processing payment
        return this.paymentGateway.processPayment(amount, currency);
    }
}

// 4. Configure dependency injection at runtime.
// This allows you to switch between different payment gateways without changing the business logic code.

const isUsingPayPal = true; // This could be determined based on configuration
const paymentGateway: IPaymentGateway = isUsingPayPal ? new PayPalGateway() : new StripeGateway();
const paymentService = new PaymentService(paymentGateway);
```
