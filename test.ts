/**
 * The base Component interface defines operations that can be altered by
 * decorators.
 */
interface Coffee {
    getCost(): number;
}

/**
 * Concrete Components provide default implementations of the operations. There
 * might be several variations of these classes.
 */
class SimpleCoffee implements Coffee {
    public getCost(): number {
        return 100;
    }
}

/**
 * The base Decorator class follows the same interface as the other Coffees.
 * The primary purpose of this class is to define the wrapping interface for all
 * concrete decorators. The default implementation of the wrapping code might
 * include a field for storing a wrapped Coffee and the means to initialize
 * it.
 */
class CoffeeDecorator implements Coffee {
    protected Coffee: Coffee;

    constructor(Coffee: Coffee) {
        this.Coffee = Coffee;
    }

    /**
     * The Decorator delegates all work to the wrapped Coffee.
     */
    public getCost(): number {
        return this.Coffee.getCost();
    }
}

/**
 * Concrete Decorators call the wrapped object and alter its result in some way.
 */
class Caramel extends CoffeeDecorator {
    /**
     * Decorators may call parent implementation of the operation, instead of
     * calling the wrapped object directly. This approach simplifies extension
     * of decorator classes.
     */
    public getCost(): number {
        return this.Coffee.getCost() + 50;
    }
}

/**
 * Decorators can execute their behavior either before or after the call to a
 * wrapped object.
 */
class Espresso extends CoffeeDecorator {
    public getCost(): number {
        return this.Coffee.getCost() + 20;
    }
}

/**
 * The client code works with all objects using the Coffee interface. This
 * way it can stay independent of the concrete classes of Coffees it works
 * with.
 */
function clientCode(Coffee: Coffee) {
    console.log(`Total cost: ${Coffee.getCost()}`);
}

/**
 * This way the client code can support both simple components...
 */
const simple = new SimpleCoffee();
console.log('Buying a simple coffee');
clientCode(simple);

/**
 * ...as well as decorated ones.
 *
 * Note how decorators can wrap not only simple components but the other
 * decorators as well.
 */
const caramel = new Caramel(simple);
console.log('Buying a coffee with extra caramel');
clientCode(new Caramel(new SimpleCoffee()))
const expressowithCaramel = new Espresso(caramel);
console.log('Buying a coffee with extra caramel + espresso flavour');
clientCode(new Espresso(new Caramel(new SimpleCoffee())))
console.log('Buying a coffee with extra caramel + espresso flavour + extra caramel (double caramel)');

clientCode(new Espresso(new Caramel(new Caramel(new SimpleCoffee()))))
// more readbale code for clientCode(new Espresso(new Caramel(new Caramel(new SimpleCoffee()))))
const doubleCaramelEspresso = new Caramel(expressowithCaramel)
clientCode(doubleCaramelEspresso)

// Hence we just need to create classes for all the different variations and not for all possible permutation / combination of those variations