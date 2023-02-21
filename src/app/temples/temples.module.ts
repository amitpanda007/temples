import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TempleCardComponent } from './temple-card/temple-card.component';
import { TemplesRoutingModule } from './temples.routing.module';

@NgModule({
  imports: [SharedModule, TemplesRoutingModule],
  declarations: [TemplesRoutingModule.components],
  exports: [],
})
export class TempleModule {}
