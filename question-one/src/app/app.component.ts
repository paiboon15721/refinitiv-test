import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

type Algorithm = 'isPrime' | 'isFibonacci';
type FormValue = {
  input: number;
  option: Algorithm;
};

const isSquare = (n: number) => n > 0 && Math.sqrt(n) % 1 === 0;

const algorithms: { [key in Algorithm]: (n: number) => boolean } = {
  isFibonacci: (n) => isSquare(5 * (n * n) - 4) || isSquare(5 * (n * n) + 4),
  isPrime: (n) => {
    for (let i = 2; i < n; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return n > 1;
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  options: Algorithm[] = ['isPrime', 'isFibonacci'];
  c = {
    input: 'input',
    option: 'option',
  };
  form = this.fb.group({
    [this.c.input]: null,
    [this.c.option]: this.options[0],
  });
  result = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    merge(
      this.form.controls[this.c.input].valueChanges.pipe(
        tap((x) => {
          if (x < 0) {
            this.form.controls[this.c.input].setValue(1, { emitEvent: false });
          }
        })
      ),
      this.form.controls[this.c.option].valueChanges
    ).subscribe(() => {
      const { input, option } = this.form.getRawValue() as FormValue;
      this.result =
        input !== null ? algorithms[option](Math.round(input)) : false;
    });
  }
}
