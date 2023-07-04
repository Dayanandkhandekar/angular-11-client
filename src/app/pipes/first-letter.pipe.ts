// Angular
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Returns only first letter of string
 */
@Pipe({
	name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {
	
	// transform(value: any, ...args: any[]) {
	// 	throw new Error('Method not implemented.');
	// }
	

	/**
	 * Transform
	 *
	 * @param value: any
	 * @param args: any
	 */
	transform(value: any, args?: any): any {
		// return value.split(' ').map(n => n[0]).join('');
		return value && args.length ? value.filter(args) : value;
	}
}
