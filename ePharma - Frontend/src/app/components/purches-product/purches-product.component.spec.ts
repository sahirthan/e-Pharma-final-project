import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchesProductComponent } from './purches-product.component';

describe('PurchesProductComponent', () => {
  let component: PurchesProductComponent;
  let fixture: ComponentFixture<PurchesProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchesProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchesProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
