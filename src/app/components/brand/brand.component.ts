import { Brand } from 'src/app/models/brand';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  brands: Brand[];
  currentBrand?: Brand;
  dataLoaded: boolean = false;
  allBrands: string = 'All Brands';

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getAll();
  }

  setCurrentBrand(brand?: Brand): void {
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand?: Brand): string {
    return this.currentBrand === brand
      ? 'list-group-item active text-center'
      : 'list-group-item text-center';
  }

  getAllBrandClass(): string {
    return !this.currentBrand
      ? 'list-group-item list-group-item-action bg-secondary text-light text-center'
      : 'list-group-item list-group-item-action text-center';
  }

  getAll(): void {
    this.brandService.getAll().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }
}
