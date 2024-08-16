import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomToComponent } from './zoom-to.component';

describe('ZoomToComponent', () => {
  let component: ZoomToComponent;
  let fixture: ComponentFixture<ZoomToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoomToComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZoomToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
