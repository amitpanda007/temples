import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TempleListComponent } from './temples/temple-list/temple-list.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: TempleListComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
