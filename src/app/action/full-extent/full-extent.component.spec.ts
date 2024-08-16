import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullExtentComponent } from './full-extent.component';

describe('FullExtentComponent', () => {
  let component: FullExtentComponent;
  let fixture: ComponentFixture<FullExtentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullExtentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullExtentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
