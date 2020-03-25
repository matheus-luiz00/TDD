import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumerosComponent } from './numeros.component';
import { FormsModule } from '@angular/forms';
import { MockService } from './mock.service';
describe('NumerosComponent', () => {
  let component: NumerosComponent;
  let fixture: ComponentFixture<NumerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule ],
      declarations: [ NumerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumerosComponent); // Código que será executado sempre antes de cada it
    component = fixture.componentInstance;
  });

  it('Variavel resultado do multiplicador de tres deve set 30 com 10 no input', () => {
    let app = fixture.debugElement.componentInstance;
    app.multiThree = 10;
    fixture.detectChanges();
    expect(app.multiTresResult).toEqual(30);
  })

  it('Span deve ser o mesmo valor que variável result', () => {
    let app = fixture.debugElement.componentInstance;
    let compiled = fixture.debugElement.nativeElement;
    app.multiThree = 10; 
    fixture.detectChanges();
    expect(compiled.querySelector("span[id='result-multi-3']").textContent).toContain(app.multiTresResult);
  })

  it('Variável deve ter o mesmo valor que o serviço', () => {
    let app = fixture.debugElement.componentInstance;
    let mockService = fixture.debugElement.injector.get(MockService);
    fixture.detectChanges();
    expect(mockService.value).toEqual(app.randomValue);
  })

  it('Método async deve funcionar', async(() => {
    let app = fixture.debugElement.componentInstance;
    let mockService = fixture.debugElement.injector.get(MockService);
    let spy = spyOn(mockService, 'GetValueAsync').and.returnValue(Promise.resolve(30));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(app.asyncValue).toEqual(30);
    })
  }))
});
