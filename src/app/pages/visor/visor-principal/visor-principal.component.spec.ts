import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorPrincipalComponent } from './visor-principal.component';

describe('VisorPrincipalComponent', () => {
  let component: VisorPrincipalComponent;
  let fixture: ComponentFixture<VisorPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisorPrincipalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisorPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
