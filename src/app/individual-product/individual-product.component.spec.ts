import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualProductComponent } from './individual-product.component';

describe('IndividualProductComponent', () => {
  let component: IndividualProductComponent;
  let fixture: ComponentFixture<IndividualProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
