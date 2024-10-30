import {Country} from './country.interface';
import {Region} from './region.type';

export interface CacheStore {
	capital: {
		term: string;
		countries: Country[]
	},
	country: {
		term: string;
		countries: Country[]
	},
	region: {
		term?: Region;
		countries: Country[]
	}
}