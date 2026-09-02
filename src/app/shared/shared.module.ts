import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortingPopoverComponent } from '../component/sorting-popover/sorting-popover.component';
import { JwPaginationComponent } from '../component/jw-pagination/jw-pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [SortingPopoverComponent, JwPaginationComponent],
  imports: [CommonModule,NgxPaginationModule],
  exports: [SortingPopoverComponent,JwPaginationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
