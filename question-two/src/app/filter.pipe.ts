import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(xs: string[] | null, term: string): string[] {
    const lowerTerm = term.toLowerCase();
    return xs
      ? xs.filter((x) => x.toLowerCase().indexOf(lowerTerm) !== -1)
      : [];
  }
}
