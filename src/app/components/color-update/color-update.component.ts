import { ActivatedRoute, Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.scss'],
})
export class ColorUpdateComponent implements OnInit {
  updateForm: FormGroup;
  color: Color;

  colorLoaded: boolean = false;
  responseLoaded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getById(params['colorId']);
      }
    });
  }

  createUpdateForm(): void {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  getById(colorId: number): void {
    this.colorService.getById(colorId).subscribe((response) => {
      this.color = response.data;
      this.colorLoaded = true;
    });
  }

  update(): void {
    if (this.updateForm.valid) {
      let colorModel: Color = Object.assign({}, this.updateForm.value);
      colorModel.id = this.color.id;
      this.colorService.update(colorModel).subscribe(
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
    this.router.navigate(['colors/list']).then(() => {
      window.location.reload();
    });
  }
}
