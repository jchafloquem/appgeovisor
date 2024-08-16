import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalComponent } from './vertical/vertical.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { SidebarLeftComponent } from './sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './sidebar-right/sidebar-right.component';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';



@NgModule({
  declarations: [
    // LayoutComponent,
    // SidebarLeftComponent,
    // SidebarRightComponent,
    // VerticalComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    CalciteComponentsModule
  ],
  exports:[

  ]
})
export class LayoutsModule { }
