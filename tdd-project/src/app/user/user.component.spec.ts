import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

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
  });
  
});
