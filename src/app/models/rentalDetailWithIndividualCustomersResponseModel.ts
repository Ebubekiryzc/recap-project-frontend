import { RentalDetailWithIndividualCustomers } from './rentalDetailWithIndividualCustomers';
import { ResponseModel } from './responseModel';

export interface RentalDetailWithIndividualCustomersResponseModel
  extends ResponseModel {
  data: RentalDetailWithIndividualCustomers[];
}
