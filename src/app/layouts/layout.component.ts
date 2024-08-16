import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalComponent } from './vertical/vertical.component';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,CalciteComponentsModule,VerticalComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
