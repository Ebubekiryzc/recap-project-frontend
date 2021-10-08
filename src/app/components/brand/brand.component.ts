import { Brand } from 'src/app/models/brand';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  brands: Brand[];
  currentBrand: Brand;
  dataLoaded: boolean = false;
  dataWithRoute: boolean = false;
  allBrands: string = 'All Brands';
  filterBrandText: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.setCurrentBrandById(params['brandId']);
        this.getAll();
      } else {
        this.getAll();
      }
    });
  }

  setCurrentBrandById(brandId: number) {
    this.brandService.getById(brandId).subscribe((response) => {
      this.setCurrentBrand(response.data);
      this.dataWithRoute = true;
    });
  }

  setCurrentBrand(brand?: Brand): void {
    this.currentBrand = brand;
  }
  
  getCurrentBrandClass(brand: Brand) {
    if (this.currentBrand) {
      if (brand.id == this.currentBrand.id) {
        return 'active text-center';
      } else {
        return 'text-center';
      }
    } else {
      return 'text-center';
    }
  }

  getAllBrandClass() {
    if (!this.currentBrand) {
      return 'active text-center';
    } else {
      return 'text-center';
    }
  }

  getAll(): void {
    this.brandService.getAll().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }
}
