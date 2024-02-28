import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCartComponent } from './show-cart.component';

describe('ShowCartComponent', () => {
  let component: ShowCartComponent;
  let fixture: ComponentFixture<ShowCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowCartComponent]
    });
    fixture = TestBed.createComponent(ShowCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
