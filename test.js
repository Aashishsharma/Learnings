var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ConcreteSub1 = /** @class */ (function () {
    function ConcreteSub1() {
    }
    ConcreteSub1.prototype.update = function (object) {
        console.log('Subscriber 1 notified new state ', object.state);
    };
    return ConcreteSub1;
}());
var ConcreteSub2 = /** @class */ (function () {
    function ConcreteSub2() {
    }
    ConcreteSub2.prototype.update = function (object) {
        console.log('Subscriber 2 notified new state ', object.state);
    };
    return ConcreteSub2;
}());
var Publisher = /** @class */ (function () {
    function Publisher() {
        this.state = 'State modified';
    }
    return Publisher;
}());
var ConcretePublisher = /** @class */ (function (_super) {
    __extends(ConcretePublisher, _super);
    function ConcretePublisher() {
        var _this = _super.call(this) || this;
        _this.listOfSubscribers = [];
        return _this;
    }
    ConcretePublisher.prototype.add = function (subscriber) {
        this.listOfSubscribers.push(subscriber);
    };
    ConcretePublisher.prototype.remove = function (subscriber) {
        var subscriberIndex = this.listOfSubscribers.indexOf(subscriber);
        if (subscriberIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }
        this.listOfSubscribers.splice(subscriberIndex, 1);
    };
    // notify method is important, need to pass this as arg in update method
    ConcretePublisher.prototype.notify = function () {
        var _this = this;
        // update state if necessary
        this.listOfSubscribers.forEach(function (subscriber) {
            subscriber.update(_this);
        });
    };
    return ConcretePublisher;
}(Publisher));
var sub1 = new ConcreteSub1();
var sub2 = new ConcreteSub2();
var pub = new ConcretePublisher();
pub.add(sub1);
pub.add(sub2);
pub.notify();
