import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { PaymentComponent } from './components/payment/payment.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/filters/:brandId:colorId', component: CarComponent },
  { path: 'cardetails/:carId', component: CarDetailsComponent },
  { path: 'payment', component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
