import { BrandComponent } from './components/brand/brand.component';
import { CarsComponent } from './components/pages/cars/cars.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NgModule } from '@angular/core';
import { LoginGuard } from './guards/login.guard';
import { PaymentComponent } from './components/payment/payment.component';
import { RouterModule, Routes } from '@angular/router';
import { SignComponent } from './components/pages/sign/sign.component';

const routes: Routes = [
  // Pages:
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'sign', component: SignComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'cars/brand/:brandId', component: CarsComponent },
  { path: 'cars/color/:colorId', component: CarsComponent },
  { path: 'cars/filters/:brandId:colorId', component: CarsComponent },
  { path: 'cars/details/:carId', component: CarDetailsComponent },

  // CAR CRUD:
  { path: 'cars/list', component: CarListComponent },
  {
    path: 'cars/list/add',
    component: CarAddComponent,
    canActivate: [LoginGuard],
  },
  { path: 'cars/list/update/:carId', component: CarUpdateComponent },
  { path: 'cars/list/delete/:carId', component: CarDeleteComponent },

  // BRAND CRUD:
  { path: 'brands/list', component: BrandListComponent },
  { path: 'brands/list/add', component: BrandAddComponent },
  { path: 'brands/list/update/:brandId', component: BrandUpdateComponent },
  { path: 'brands/list/delete/:brandId', component: BrandDeleteComponent },

  // COLOR CRUD:
  { path: 'colors/list', component: ColorListComponent },
  { path: 'colors/list/add', component: ColorAddComponent },
  { path: 'colors/list/update/:colorId', component: ColorUpdateComponent },
  { path: 'colors/list/delete/:colorId', component: ColorDeleteComponent },

  { path: 'payment', component: PaymentComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
