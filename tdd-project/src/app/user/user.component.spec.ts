import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { DataService } from '../core/data.service';

describe('UserComponent', () => {
  describe('Component: User', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          UserComponent
        ]
      })
    })

    it('Deve criar o componente', () => {
      let fixture = TestBed.createComponent(UserComponent);
      let app = fixture.debugElement.componentInstance;

      expect(app).toBeTruthy();
    })

    it('Deve pegar o nome do usuário do serviço', () => {
      let fixture = TestBed.createComponent(UserComponent); // Cria o componente
      let app = fixture.debugElement.componentInstance;
      let userService = fixture.debugElement.injector.get(UserService); // pega as injeções de dependência do componente no .injector e .get para trazer a instancia do serviço desejado
      fixture.detectChanges(); //Detecta alguma mudança no estado do componente. Isso roda automáticamente no angular, mas não no teste. Caso esqueça isso o teste falha, pois user.name começou undefined
      expect(userService.user.name).toEqual(app.user.name); // Espera que o nome do objeto no serviço seja o mesmo da variável no componente
    })
    
    it('Deve mostrar o nome do usuário se ele estiver logado', () => {
      let fixture = TestBed.createComponent(UserComponent);
      let app = fixture.debugElement.componentInstance;
      app.isLoggedIn = true; // Variável para true como se user estivesse logado
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement; // Pega o html da instancia do componente
      expect(compiled.querySelector('p').textContent).toContain(app.user.name); // <p> deve ter o mesmo conteúdo da variável com o nome
    })

    it('Não deve mostrar o nome do usuário se ele estiver deslogado', () => {
      let fixture = TestBed.createComponent(UserComponent);
      let app = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('p').textContent).not.toContain(app.user.name); // <p> não deve conter o conteúdo da variável
    })

    it('Não deve pegar o dado do serviço com sucesso', () => {
     let fixture = TestBed.createComponent(UserComponent);
     let app = fixture.debugElement.componentInstance;
     let dataService = fixture.debugElement.injector.get(DataService);
     let spy = spyOn(dataService, 'GetDetails').and.returnValue(Promise.resolve('Data')); // Escuta alguma chamada no método GetDetals do DataService e retorna um valor mock
      fixture.detectChanges();
      expect(app.data).toEqual(undefined); // Como o método do serviço é async, o valor da variável deve ser undefined
    })

    it('Deve pegar o valor async do serviço com sucesso', async(() => { // o async faz o teste gerar um async 'estilo verdadeiro'
      let fixture = TestBed.createComponent(UserComponent);
      let app = fixture.debugElement.componentInstance;
      let dataService = fixture.debugElement.injector.get(DataService);
      let spy = spyOn(dataService, 'GetDetails').and.returnValue(Promise.resolve('Data')); // Cria o mock do método async
      fixture.detectChanges();
      fixture.whenStable().then(() => { // whenStable - diz que quando os métodos async acabarem executara o que estiver dentro de then
      expect(app.data).toBe('Data');
      })
      }))

      it('Deve pegar o valor async do serviço com sucesso com o fakeAsync e tick', fakeAsync(() => { // o fakeAsync é uma outra forma de fazer o falso async, mas você pode dizer quando os metodos mockados retornarão o valor
        let fixture = TestBed.createComponent(UserComponent);
        let app = fixture.debugElement.componentInstance;
        let dataService = fixture.debugElement.injector.get(DataService);
        let spy = spyOn(dataService, 'GetDetails').and.returnValue(Promise.resolve('Data')); 
        fixture.detectChanges();
        tick(); // faz os métodos async mockados pararem e retornarem o valor
        expect(app.data).toBe('Data');
      }))
  });
  
});
