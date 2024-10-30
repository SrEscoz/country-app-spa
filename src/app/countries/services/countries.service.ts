import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, delay, map, Observable, of, tap} from 'rxjs';
import {Country} from '../interfaces/country.interface';
import {CacheStore} from '../interfaces/chache-store.interface';
import {Region} from '../interfaces/region.type';

@Injectable({
	providedIn: 'root'
})
export class CountriesService {

	private apiUrl: string = 'https://restcountries.com/v3.1';

	private _cacheStore: CacheStore = {
		capital: {term: '', countries: []},
		country: {term: '', countries: []},
		region: {countries: []}
	};

	constructor(private httpClient: HttpClient) {
	}

	private getCountryRequest(url: string): Observable<Country[]> {
		return this.httpClient.get<Country[]>(url)
			.pipe(
				delay(500),
				catchError(() => of([]))
			);
	}

	public searchByCapital(capital: string): Observable<Country[]> {
		return this.getCountryRequest(`${this.apiUrl}/capital/${capital}`)
			.pipe(
				tap(countries => {
					this._cacheStore.capital = {term: capital, countries: countries};
				})
			);
	}

	public searchByRegion(region: Region): Observable<Country[]> {
		return this.getCountryRequest(`${this.apiUrl}/region/${region}`)
			.pipe(
				tap(countries => {
					this._cacheStore.region = {term: region, countries: countries};
				})
			);
	}

	public searchByCountry(country: string): Observable<Country[]> {
		return this.getCountryRequest(`${this.apiUrl}/name/${country}`)
			.pipe(
				tap(countries => {
					this._cacheStore.country = {term: country, countries: countries};
				})
			);
	}

	public searchByCountryAlphaCode(alphaCode: string): Observable<Country | null> {
		return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${alphaCode}`)
			.pipe(
				map(countries => countries.length > 0 ? countries[0] : null),
				catchError(() => of(null))
			);
	}

	get cacheStore(): CacheStore {
		return this._cacheStore;
	}
}
