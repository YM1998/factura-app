import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { CategoryComponent } from './views/category/main/category.component';
import { AdminRoleGuard } from './guard/admin-role.guard';

const routes: Routes = [

  {path:'',redirectTo:'/login', pathMatch:'full'},

  { 
      path: 'category',
      loadChildren: () => import('./views/category/category.module').then( m => m.CategoryModule),
      canLoad: [AuthGuard,AdminRoleGuard]
  },

  { 
    path: 'product', 
    loadChildren: () => import('./views/product/product.module').then( m => m.ProductModule),
    canLoad: [AuthGuard,AdminRoleGuard]

},

{ 
  path: 'invoice', 
  loadChildren: () => import('./views/invoice/invoice.module').then( m => m.InvoiceModule),
  canLoad: [AuthGuard]

},

{ 
  path: 'stock', 
  loadChildren: () => import('./views/stock/stock.module').then( m => m.StockModule),
  canLoad: [AuthGuard,AdminRoleGuard]

},
{ 
  path: 'login', 
  loadChildren: () => import('./views/login/login.module').then( m => m.LoginModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}