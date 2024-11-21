import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraestructuraFormPrincipalComponent } from './infraestructura-form-principal.component';

describe('InfraestructuraFormPrincipalComponent', () => {
  let component: InfraestructuraFormPrincipalComponent;
  let fixture: ComponentFixture<InfraestructuraFormPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraestructuraFormPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfraestructuraFormPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
