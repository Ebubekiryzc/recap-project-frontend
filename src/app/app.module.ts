import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarComponent } from './components/car/car.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { ColorComponent } from './components/color/color.component';
import { IndividualCustomerComponent } from './components/individual-customer/individual-customer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { SanitizerService } from './services/sanitizer.service';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { FilterCarNamePipe } from './pipes/filter-car-name.pipe';

import { ToastrModule } from 'ngx-toastr';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    IndividualCustomerComponent,
    CarComponent,
    RentalComponent,
    CarDetailsComponent,
    FilterBrandPipe,
    FilterColorPipe,
    FilterCarNamePipe,
    PaymentComponent,
    CartSummaryComponent,
    CarAddComponent,
    BrandListComponent,
    BrandUpdateComponent,
    BrandDeleteComponent,
    BrandAddComponent,
    CarUpdateComponent,
    ColorListComponent,
    ColorAddComponent,
    ColorUpdateComponent,
    ColorDeleteComponent,
    CarListComponent,
    CarDeleteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [SanitizerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
