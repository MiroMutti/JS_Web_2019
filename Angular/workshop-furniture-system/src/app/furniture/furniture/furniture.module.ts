import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FurnitureAllComponent } from '../furniture-all/furniture-all.component';
import { FurnitureDetailsComponent } from '../furniture-details/furniture-details.component';
import { FurnitureUserComponent } from '../furniture-user/furniture-user.component';
import { FurnitureCreateComponent } from '../furniture-create/furniture-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FurnitureService } from '../furniture.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'create', component: FurnitureCreateComponent },
      { path: 'all', component: FurnitureAllComponent },
      { path: 'details/:id', component: FurnitureDetailsComponent },
      { path: 'user', component: FurnitureUserComponent }
    ])
  ],
  declarations: [
    FurnitureAllComponent,
    FurnitureDetailsComponent,
    FurnitureUserComponent,
    FurnitureCreateComponent
  ],
  providers: [
    FurnitureService
  ]
})
export class FurnitureModule { }
