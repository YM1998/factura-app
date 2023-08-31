import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path:'',redirectTo:'/category', pathMatch:'full'},

  { 
      path: 'category', 
      loadChildren: () => import('./views/category/category.module').then( m => m.CategoryModule)
  },

  { 
    path: 'product', 
    loadChildren: () => import('./views/product/product.module').then( m => m.ProductModule)
},

{ 
  path: 'invoice', 
  loadChildren: () => import('./views/invoice/invoice.module').then( m => m.InvoiceModule)
},

{ 
  path: 'stock', 
  loadChildren: () => import('./views/stock/stock.module').then( m => m.StockModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}