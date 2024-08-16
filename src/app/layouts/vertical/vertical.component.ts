import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';
import { SidebarLeftComponent } from '../sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from '../sidebar-right/sidebar-right.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vertical',
  standalone: true,
  imports: [CommonModule,CalciteComponentsModule,SidebarLeftComponent,SidebarRightComponent,RouterModule],
  templateUrl: './vertical.component.html',
  styleUrl: './vertical.component.css'
})
export class VerticalComponent {

}
