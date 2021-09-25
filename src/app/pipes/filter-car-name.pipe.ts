import { CarDetail } from './../models/carDetail';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCarName',
})
export class FilterCarNamePipe implements PipeTransform {
  transform(value: CarDetail[], filterText: string): CarDetail[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (car: CarDetail) =>
            `${car.brandName} ${car.carName}`.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
