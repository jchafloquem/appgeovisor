import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinateConversionComponent } from './coordinate-conversion.component';

describe('CoordinateConversionComponent', () => {
  let component: CoordinateConversionComponent;
  let fixture: ComponentFixture<CoordinateConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinateConversionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoordinateConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
