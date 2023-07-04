import { UpperCasePipe } from '@angular/common';
import { Pipe, PipeTransform, Injector, Type } from '@angular/core';

@Pipe({
    name: 'dynamicPipe'
})
export class DynamicPipe implements PipeTransform {

    constructor(private injector: Injector) {}

    transform(value: any, requiredPipe: Type<any>, pipeArgs: any): any {
        const injector = Injector.create({
        name: 'DynamicPipe',
        parent: this.injector,
        providers: [
            { provide: UpperCasePipe }
        ]
    })
    const pipe = this.injector.get(requiredPipe)
    
    return pipe.transform(value, pipeArgs);

    }
}