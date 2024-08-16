import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0404Component } from './page0404.component';

describe('Page0404Component', () => {
  let component: Page0404Component;
  let fixture: ComponentFixture<Page0404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page0404Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Page0404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
