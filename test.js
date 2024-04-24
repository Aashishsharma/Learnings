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
/**
 * Concrete Components provide default implementations of the operations. There
 * might be several variations of these classes.
 */
var SimpleCoffee = /** @class */ (function () {
    function SimpleCoffee() {
    }
    SimpleCoffee.prototype.getCost = function () {
        return 100;
    };
    return SimpleCoffee;
}());
/**
 * The base Decorator class follows the same interface as the other Coffees.
 * The primary purpose of this class is to define the wrapping interface for all
 * concrete decorators. The default implementation of the wrapping code might
 * include a field for storing a wrapped Coffee and the means to initialize
 * it.
 */
var CoffeeDecorator = /** @class */ (function () {
    function CoffeeDecorator(Coffee) {
        this.Coffee = Coffee;
    }
    /**
     * The Decorator delegates all work to the wrapped Coffee.
     */
    CoffeeDecorator.prototype.getCost = function () {
        return this.Coffee.getCost();
    };
    return CoffeeDecorator;
}());
/**
 * Concrete Decorators call the wrapped object and alter its result in some way.
 */
var Caramel = /** @class */ (function (_super) {
    __extends(Caramel, _super);
    function Caramel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Decorators may call parent implementation of the operation, instead of
     * calling the wrapped object directly. This approach simplifies extension
     * of decorator classes.
     */
    Caramel.prototype.getCost = function () {
        return this.Coffee.getCost() + 50;
    };
    return Caramel;
}(CoffeeDecorator));
/**
 * Decorators can execute their behavior either before or after the call to a
 * wrapped object.
 */
var Espresso = /** @class */ (function (_super) {
    __extends(Espresso, _super);
    function Espresso() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Espresso.prototype.getCost = function () {
        return this.Coffee.getCost() + 20;
    };
    return Espresso;
}(CoffeeDecorator));
/**
 * The client code works with all objects using the Coffee interface. This
 * way it can stay independent of the concrete classes of Coffees it works
 * with.
 */
function clientCode(Coffee) {
    // ...
    console.log("Total cost: ".concat(Coffee.getCost()));
    // ...
}
/**
 * This way the client code can support both simple components...
 */
var simple = new SimpleCoffee();
console.log('Buying a simple coffee');
clientCode(simple);
/**
 * ...as well as decorated ones.
 *
 * Note how decorators can wrap not only simple components but the other
 * decorators as well.
 */
var caramel = new Caramel(simple);
console.log('Buying a coffee with extra caramel');
clientCode(new Caramel(new SimpleCoffee()));
var expressowithCaramel = new Espresso(caramel);
console.log('Buying a coffee with extra caramel + espresso flavour');
clientCode(new Espresso(new Caramel(new SimpleCoffee())));
console.log('Buying a coffee with extra caramel + espresso flavour + extra caramel (double caramel)');
clientCode(new Espresso(new Caramel(new Caramel(new SimpleCoffee()))));
// more readbale code for clientCode(new Espresso(new Caramel(new Caramel(new SimpleCoffee()))))
var doubleCaramelEspresso = new Caramel(expressowithCaramel);
clientCode(doubleCaramelEspresso);
