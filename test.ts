interface Subscriber {
    update(obj: Publisher): void
}

class ConcreteSub1 implements Subscriber {

    update(object: Publisher): void {
        console.log('Subscriber 1 notified new state ', object.state)
    }
}

class ConcreteSub2 implements Subscriber {

    update(object: Publisher): void {
        console.log('Subscriber 2 notified new state ', object.state)
    }
}

abstract class Publisher {
    listOfSubscribers: Subscriber[];
    state = 'State modified';

    abstract add(subscriber: Subscriber): void;
    abstract remove(subscriber: Subscriber): void;
    abstract notify(): void;

}

class ConcretePublisher extends Publisher {

    constructor() {
        super();
        this.listOfSubscribers = []
    }
    add(subscriber: Subscriber): void {
        this.listOfSubscribers.push(subscriber)
    }

    remove(subscriber: Subscriber): void {
        const subscriberIndex = this.listOfSubscribers.indexOf(subscriber);
        if (subscriberIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }

        this.listOfSubscribers.splice(subscriberIndex, 1);
    }

    // notify method is important, need to pass this as arg in update method
    notify(): void {
        // update state if necessary
        this.listOfSubscribers.forEach((subscriber) => {
            subscriber.update(this)
        })
    }

}

let sub1 = new ConcreteSub1()
let sub2 = new ConcreteSub2()

let pub = new ConcretePublisher();

pub.add(sub1); pub.add(sub2)

pub.notify()