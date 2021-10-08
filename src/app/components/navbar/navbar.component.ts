import { IndividualCustomer } from './../../models/individualCustomer';
import { LocalStorageService } from './../../services/local-storage.service';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  faBars,
  faCreditCard,
  faInfoCircle,
  faSignOutAlt,
  faTimes,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class NavbarComponent implements OnInit {
  faBars = faBars;
  faTimes = faTimes;
  faTemp?: IconDefinition;
  faInfo = faInfoCircle;
  faSignOut = faSignOutAlt;
  faCreditCard = faCreditCard;

  userDetails?: IndividualCustomer;

  @ViewChild('navbar') navbar: ElementRef;
  @ViewChild('ddmain') ddMain: ElementRef;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.getIndividualCustomerDetails();
  }

  menuClassToggler(): void {
    this.iconToggler();
    this.navbar.nativeElement.classList.toggle('active');
  }

  iconToggler(): void {
    this.faTemp = this.faBars;
    this.faBars = this.faTimes;
    this.faTimes = this.faTemp;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.faBars = faBars;
    this.navbar.nativeElement.classList.remove('active');
  }

  onClick(event: any) {
    if (!this.ddMain.nativeElement.contains(event.target)) {
      this.ddMain.nativeElement.classList.remove('active');
    }
  }

  getIndividualCustomerDetails(): void {
    this.userDetails = this.localStorageService.getIndividualCustomerDetails();
  }

  toggleProfileInfo(): void {
    this.ddMain.nativeElement.classList.toggle('active');
  }

  logOut(): void {
    this.localStorageService.remove('individual-customer-details');
    window.location.reload();
  }
}
