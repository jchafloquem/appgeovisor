import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';
import { LayerComponent } from 'src/app/action/layer/layer.component';

@Component({
  selector: 'app-sidebar-left',
  standalone: true,
  imports: [CommonModule,CalciteComponentsModule,LayerComponent],
  templateUrl: './sidebar-left.component.html',
  styleUrl: './sidebar-left.component.css'
})
export class SidebarLeftComponent {

}
