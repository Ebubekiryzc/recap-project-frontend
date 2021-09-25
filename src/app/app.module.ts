import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { ColorComponent } from './components/color/color.component';
import { IndividualCustomerComponent } from './components/individual-customer/individual-customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { SanitizerService } from './services/sanitizer.service';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { FilterCarNamePipe } from './pipes/filter-car-name.pipe';

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
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [SanitizerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
