import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, LayoutComponent, HeaderComponent],
  exports: [LayoutComponent, HeaderComponent],
})
export class CoreModule {}
