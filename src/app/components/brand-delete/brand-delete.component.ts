import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from './../../models/brand';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.scss'],
})
export class BrandDeleteComponent implements OnInit {
  brand: Brand;

  brandLoaded: boolean = false;
  responseLoaded: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getById(params['brandId']);
        this.brandLoaded = true;
      }
    });
  }

  getById(brandId: number) {
    this.brandService.getById(brandId).subscribe((response) => {
      this.brand = response.data;
    });
  }

  delete(): void {
    if (this.brand) {
      this.brandService.delete(this.brand).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Success!');
          this.responseLoaded = true;
          if (this.responseLoaded === true) {
            setInterval(() => {
              this.backToList();
            }, 500);
          }
        },
        (responseError) => {
          if (!responseError.error.Errors) {
            this.toastrService.error(
              responseError.error.ErrorMessage,
              'Error!'
            );
          } else if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Validation Error!'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Invalid form information.', 'Error!');
    }
  }

  backToList() {
    this.router.navigate(['brands/list']).then(() => {
      window.location.reload();
    });
  }
}
