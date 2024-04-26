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
var Duck = /** @class */ (function () {
    function Duck() {
    }
    Duck.prototype.performQuack = function () {
        this.quackBehavior.quack();
    };
    Duck.prototype.performFly = function () {
        this.flyBehaviour.fly();
    };
    return Duck;
}());
var FlywithWings = /** @class */ (function () {
    function FlywithWings() {
    }
    FlywithWings.prototype.fly = function () {
        return 'I fly with Wings ';
    };
    return FlywithWings;
}());
var FlywithoutWings = /** @class */ (function () {
    function FlywithoutWings() {
    }
    FlywithoutWings.prototype.fly = function () {
        return 'I fly without Wings ';
    };
    return FlywithoutWings;
}());
var FlyableDuck = /** @class */ (function (_super) {
    __extends(FlyableDuck, _super);
    function FlyableDuck() {
        var _this = _super.call(this) || this;
        _this.flyBehaviour = new FlywithWings();
        return _this;
    }
    FlyableDuck.prototype.performFly = function () {
        return this.flyBehaviour.fly();
    };
    return FlyableDuck;
}(Duck));
var NonFlyableDuck = /** @class */ (function (_super) {
    __extends(NonFlyableDuck, _super);
    function NonFlyableDuck() {
        var _this = _super.call(this) || this;
        _this.flyBehaviour = new FlywithoutWings();
        return _this;
    }
    NonFlyableDuck.prototype.performFly = function () {
        return this.flyBehaviour.fly();
    };
    return NonFlyableDuck;
}(Duck));
var client = function (duck) {
    console.log(duck.performFly());
};
var flyDuck = new FlyableDuck();
var noflyDuck = new NonFlyableDuck();
client(flyDuck);
client(noflyDuck);
