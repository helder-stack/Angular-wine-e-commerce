import { Routes } from '@angular/router';
import { CatalogComponent } from './resources/pages/catalog/catalog.component';
import { CartComponent } from './resources/pages/cart/cart.component';
import { ProductComponent } from './resources/pages/product/product.component';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "catalog",
    },
    {
        path: "catalog",
        pathMatch: "full",
        component: CatalogComponent
    },
    {
        path: "cart",
        pathMatch: "full",
        component: CartComponent
    },
    {
        path: "product/:slug",
        component: ProductComponent,
    },
    {
        path: "**",
        redirectTo: "catalog"
    }
];
