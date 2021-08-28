import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<string[]>('https://api.publicapis.org/categories');
  }
}
