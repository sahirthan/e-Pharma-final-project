import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebaseComponentsComponent } from './homebase-components.component';

describe('HomebaseComponentsComponent', () => {
  let component: HomebaseComponentsComponent;
  let fixture: ComponentFixture<HomebaseComponentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomebaseComponentsComponent]
    });
    fixture = TestBed.createComponent(HomebaseComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
