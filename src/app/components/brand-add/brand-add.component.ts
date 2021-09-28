import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.scss'],
})
export class BrandAddComponent implements OnInit {
  addForm: FormGroup;
  responseLoaded: boolean = false;

  constructor(
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createBrandForm();
  }

  createBrandForm(): void {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add(): void {
    if (this.addForm.valid) {
      let brandModel: Brand = Object.assign({}, this.addForm.value);
      this.brandService.add(brandModel).subscribe(
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
