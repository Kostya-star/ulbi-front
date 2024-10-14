import { Country } from '@/entities/CountrySelect';
import { Currency } from '@/entities/CurrencySelect';

export interface Profile {
  id?: string;
  first?: string;
  lastname?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
}
