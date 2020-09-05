import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NodesComponent } from './nodes.component';
import { LoadingModule } from '../_components/loading/loading.module';
import { PipesModule } from '../_pipes/pipes.module';
import { NodesTableModule } from '../_components/nodes-table/nodes-table.module';
import {ErrorModule} from '../_components/error/error.module';

@NgModule({
  declarations: [NodesComponent],
  imports: [
    CommonModule,
    LoadingModule,
    ErrorModule,
    PipesModule,
    NodesTableModule,
    RouterModule.forChild([
      {
        path: '',
        component: NodesComponent
      }
    ])
  ]
})
export class NodesModule { }
