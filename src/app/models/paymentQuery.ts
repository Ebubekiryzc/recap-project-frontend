import { Rental } from './rental';
import { UserCreditCard } from './userCreditCard';

export interface PaymentQuery {
  userCreditCard: UserCreditCard;
  rental: Rental;
}
