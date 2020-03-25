import { Injectable } from '@angular/core';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  GetDetails() {
    const resultPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Data')
      },2000)
    })

    return resultPromise;
  }
}
