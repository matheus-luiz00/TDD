import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';

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
  });
  
});
