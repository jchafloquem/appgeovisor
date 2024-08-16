import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';

@Component({
  selector: 'app-sidebar-right',
  standalone: true,
  imports: [CommonModule,CalciteComponentsModule],
  templateUrl: './sidebar-right.component.html',
  styleUrl: './sidebar-right.component.css'
})
export class SidebarRightComponent {

}
