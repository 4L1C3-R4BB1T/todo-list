import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'limitString'
})
export class LimitStringPipe implements PipeTransform {

    private static LIMIT: number = 15;

    transform(value: string): unknown {
        if (value.length > LimitStringPipe.LIMIT) {
            return value.substring(0, LimitStringPipe.LIMIT) + '.'.repeat(3);
        }
        return value;
    }

}
