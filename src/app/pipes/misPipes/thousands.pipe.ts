import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandsPipe',
})
export class ThousandsPipe implements PipeTransform {
  /**
   * FUNCION EN PRUEBA: añadir simbolo € al valor que recibe
   */
  // transform(value: any) {
  //   value = value.toString().replace(' €', '');
  //   return value
  //     .toString()
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  //     .concat(' €');
  // }

  transform(value: any) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
