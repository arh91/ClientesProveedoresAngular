import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOptionsComponent } from './supplier-options.component';

describe('SupplierOptionsComponent', () => {
  let component: SupplierOptionsComponent;
  let fixture: ComponentFixture<SupplierOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
