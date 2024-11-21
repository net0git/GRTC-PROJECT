import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TucComponent } from './tuc.component';

describe('TucComponent', () => {
  let component: TucComponent;
  let fixture: ComponentFixture<TucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TucComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
