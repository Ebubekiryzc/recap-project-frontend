import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { ColorComponent } from './components/color/color.component';
import { IndividualCustomerComponent } from './components/individual-customer/individual-customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { SanitizerService } from './services/sanitizer.service';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    IndividualCustomerComponent,
    CarComponent,
    RentalComponent,
    CarDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [SanitizerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
