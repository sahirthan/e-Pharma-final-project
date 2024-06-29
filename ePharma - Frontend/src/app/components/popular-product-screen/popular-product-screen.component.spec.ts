import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularProductScreenComponent } from './popular-product-screen.component';

describe('PopularProductScreenComponent', () => {
  let component: PopularProductScreenComponent;
  let fixture: ComponentFixture<PopularProductScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularProductScreenComponent]
    });
    fixture = TestBed.createComponent(PopularProductScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
