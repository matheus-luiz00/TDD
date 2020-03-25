import { Component, OnInit } from '@angular/core';
import { MockService } from './mock.service';

@Component({
  selector: 'app-numeros',
  templateUrl: './numeros.component.html',
  styleUrls: ['./numeros.component.css']
})
export class NumerosComponent implements OnInit {

  public multiThreeInputValue = 0;
  public multiTresResult = 0;

  public randomValue: number;
  public asyncValue: number;

  constructor(
    private mockService: MockService
    ) { }

  ngOnInit(): void {
    this.randomValue = this.mockService.GetRandom();
    this.mockService.GetValueAsync().then((data: number) => this.asyncValue = data);
  }

  set multiThree(value: number) {
    this.multiThreeInputValue = value;
    this.multiTresResult = this.multiThreeInputValue * 3
  }

  get multiThree() {
    return this.multiThreeInputValue;
  }
}
