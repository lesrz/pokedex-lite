import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [HomeComponent, EditComponent, AddComponent],
  imports: [CommonModule, HomeRoutingModule, FormsModule, ReactiveFormsModule],
})
export class HomeModule {}
