import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  public value: number;

  constructor() { }


  GetRandom() {
    this.value = Math.random();
    return this.value;
  }

  GetValueAsync() {
    return Promise.resolve(this.value);
  }
}
