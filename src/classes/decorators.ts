import { makeProperty } from '../functions';

export function sealed(s: string) {
    return function(constructor: Function): void {
        console.log(`Sealing the constructoe${s}`);
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    };
}

export function logger<TFunction extends Function>(target: TFunction): TFunction {
    const newConstructor: Function = function() {
        console.log('Creating new instance');
        console.log(target.name);

        this.age = 30;
    };
    newConstructor.prototype = Object.create(target.prototype);
    newConstructor.prototype.printLibrarian = function(): void {
        console.log(`Librarian name: ${this.name}, Librarian age: ${this.age}`);
    };
    return newConstructor as TFunction;
}

export function writable(isWritable: boolean) {
    return function(targer: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        console.log('writable decorator');
        console.log(targer);
        console.log(methodName);
        console.log(descriptor);

        descriptor.writable = isWritable;
        return descriptor;
    };
}

export function timeout(ms: number = 0) {
    return function(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        const originalMethod =  descriptor.value;
        descriptor.value = function(...args: any[]) {
            if(window.confirm('Are you sure?'))  {
                setTimeout(() => {
                    originalMethod.apply(this, args);
                }, ms);
            }
        };
        return descriptor;
    };
}

export function logParameter(target: any, methodName: string, index: number) {
    const key = `${methodName}_decor_param_indexes`;
    if (Array.isArray(target[key])) {
        target[key].push(index);
    } else {
        target[key] = [index];
    }
}

export function logMethod(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod =  descriptor.value;

    descriptor.value = function(...args: any[]) {
        const key = `${methodName}_decor_param_indexes`;
        const indexes = target[key];

        if(Array.isArray(indexes)) {
            args.forEach((arg, index) => {
                if(indexes.includes(index)) {
                    console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`);
                }
            });
        };
        return originalMethod.apply(this, args);
    };

    return descriptor;

}

export function format(pref: string = 'Mr./Mrs.') {
    return function(target: any, propertyName) {
        makeProperty(target, propertyName, value => `${pref} ${value}`, value => value);
    };
}

export function positiveInteger(target: any, propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalSet =  descriptor.set;

    descriptor.set = function(value: number){
        if(value < 1 || !Number.isInteger(value)) {
            throw new Error('Invalid value');
        }

        originalSet.call(this, value);
    };
    return descriptor;
}
