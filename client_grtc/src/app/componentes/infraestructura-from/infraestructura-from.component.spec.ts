import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraestructuraFromComponent } from './infraestructura-from.component';

describe('InfraestructuraFromComponent', () => {
  let component: InfraestructuraFromComponent;
  let fixture: ComponentFixture<InfraestructuraFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraestructuraFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfraestructuraFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
