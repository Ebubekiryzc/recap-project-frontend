import { AuthService } from './../../../services/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from './../../../services/local-storage.service';
import { LoginModel } from 'src/app/models/loginModel';
import { IndividualCustomer } from './../../../models/individualCustomer';
import { IndividualCustomerService } from './../../../services/individual-customer.service';
import { RegisterForIndividualCustomer } from './../../../models/registerModelForIndividualCustomer';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from './../../../models/user';
import { UserService } from './../../../services/user.service';
import {
  faBuilding,
  faEnvelope,
  faLock,
  faQuoteRight,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faQuoteRight = faQuoteRight;
  faBuilding = faBuilding;

  userLoaded: boolean = false;
  individualCustomerLoaded: boolean = false;

  loginForm: FormGroup;
  signUpForm: FormGroup;

  user: User;
  individualCustomerDetail: IndividualCustomer;

  @ViewChild('container') container: ElementRef;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private individualCustomerService: IndividualCustomerService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private toastrService: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.createRegisterForm();
  }

  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
    });
  }

  createRegisterForm(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
    });
  }

  activateSignUpMode(): void {
    this.container.nativeElement.classList.add('sign-up-mode');
  }

  activateSignInMode(): void {
    this.container.nativeElement.classList.remove('sign-up-mode');
  }

  login(): void {
    if (this.loginForm.valid) {
      let loginModel: LoginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          this.toastrService.success("Logined successfully.");
          this.localStorageService.setToken(response.data.token);
          this.setUserDetails(loginModel.email);
        },
        (responseError) => {
          if (!responseError.error.Errors) {
            this.toastrService.error(responseError.error, 'Error!');
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
      this.toastrService.error('Form invalid.', 'Error!');
    }
  }

  registerIndividualCustomer() {
    if (this.signUpForm.valid) {
      let registerModel: RegisterForIndividualCustomer = Object.assign(
        {},
        this.signUpForm.value
      );
      console.log(registerModel);

      this.authService.registerIndividiualCustomer(registerModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.localStorageService.setToken(response.data.token);
          this.setUserDetails(registerModel.email);
        },
        (responseError) => {
          if (!responseError.error.Errors) {
            this.toastrService.error(responseError.error, 'Error!');
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
      this.toastrService.error('Form invalid.', 'Error!');
    }
  }

  getIndividualCustomerDetails(): void {
    this.individualCustomerService
      .getById(this.user.id)
      .subscribe((response) => {
        this.individualCustomerDetail = response.data;
        this.individualCustomerLoaded = true;
        if (this.individualCustomerLoaded === true) {
          this.localStorageService.setIndividualCustomerDetails(
            this.individualCustomerDetail
          );
          this.router.navigateByUrl('/');
        }
      });
  }

  setUserDetails(mail: string): void {
    this.userService.getByMail(mail).subscribe(
      (response) => {
        this.user = response.data;
        this.userLoaded = true;
        this.setIndividualCustomerDetails();
      },
      (responseErr) => {
        console.log(responseErr);
      }
    );
  }

  setIndividualCustomerDetails() {
    if (this.userLoaded === true) {
      this.getIndividualCustomerDetails();
    }
  }
}
