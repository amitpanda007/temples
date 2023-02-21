import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TempleCardComponent } from './temple-card/temple-card.component';
import { TempleListComponent } from './temple-list/temple-list.component';

const routes: Routes = [
  {
    path: 'shorts',
    component: TempleListComponent,
    children: [
      {
        path: ':id',
        component: TempleCardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplesRoutingModule {
  static components = [TempleListComponent, TempleCardComponent];
}
