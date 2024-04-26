interface Quackable {
    quack(): string
}
interface Flyable {
    fly(): string
}
abstract class Duck {
    quackBehavior: Quackable;
    flyBehaviour: Flyable;
    performQuack() {
        this.quackBehavior.quack()
    }
    performFly() {
        this.flyBehaviour.fly()
    }
}
class FlywithWings implements Flyable {
    fly() {
        return 'I fly with Wings '
    }
}
class FlywithoutWings implements Flyable {
    fly() {
        return 'I fly without Wings '
    }
}
class FlyableDuck extends Duck {
    constructor() {
        super();
        this.flyBehaviour = new FlywithWings();
    }
    performFly(): string {
        return this.flyBehaviour.fly()
    }
}
class NonFlyableDuck extends Duck {
    constructor() {
        super();
        this.flyBehaviour = new FlywithoutWings();
    }
    performFly(): string {
        return this.flyBehaviour.fly()
    }
}
const client = (duck: Duck) => {
    console.log(duck.performFly())
}
let flyDuck = new FlyableDuck();
let noflyDuck = new NonFlyableDuck();
client(flyDuck)
client(noflyDuck)