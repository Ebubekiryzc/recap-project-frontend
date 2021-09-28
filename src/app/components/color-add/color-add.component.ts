import { Color } from './../../models/color';
import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.scss'],
})
export class ColorAddComponent implements OnInit {
  addForm: FormGroup;
  responseLoaded: boolean = false;

  constructor(
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createColorForm();
  }

  createColorForm(): void {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add(): void {
    if (this.addForm.valid) {
      let colorModel: Color = Object.assign({}, this.addForm.value);
      this.colorService.add(colorModel).subscribe(
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
