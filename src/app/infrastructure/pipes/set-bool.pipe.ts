import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setBool'
})
export class SetBoolPipe implements PipeTransform {

  transform(value?: boolean, format?: string): string {
    if(value == undefined)
      return '';
    switch(format){
      case 'correct':
        return value ? 'נכון' : 'לא נכון';
      case 'active':
        return value ? 'פעיל' : 'לא פעיל';
      case 'icon':
        return value ? '✔' : '❌'
      default: return value ? 'כן': 'לא'
    }
  }

}
