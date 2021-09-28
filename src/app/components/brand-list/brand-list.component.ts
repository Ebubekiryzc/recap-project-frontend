import { Brand } from './../../models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
})
export class BrandListComponent implements OnInit {
  brands: Brand[] = [];

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void {
    this.brandService.getAll().subscribe((response) => {
      this.brands = response.data;
    });
  }
}
