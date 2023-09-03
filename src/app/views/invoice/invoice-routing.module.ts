import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { InvoiceReportComponent } from './invoice-report/invoice-report.component';
;

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'report', component: InvoiceReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
