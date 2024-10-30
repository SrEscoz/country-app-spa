import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, delay, map, Observable, of} from 'rxjs';
import {Country} from '../interfaces/Country';

@Injectable({
	providedIn: 'root'
})
export class CountriesService {

	private apiUrl: string = 'https://restcountries.com/v3.1';

	constructor(private httpClient: HttpClient) {
	}

	private getCountryRequest(url: string): Observable<Country[]> {
		return this.httpClient.get<Country[]>(url)
			.pipe(
				delay(1000),
				catchError(() => of([]))
			);
	}

	public searchByCapital(capital: string): Observable<Country[]> {
		return this.getCountryRequest(`${this.apiUrl}/capital/${capital}`);
	}

	public searchByRegion(region: string): Observable<Country[]> {
		return this.getCountryRequest(`${this.apiUrl}/region/${region}`);
	}

	public searchByCountry(country: string): Observable<Country[]> {
		return this.getCountryRequest(`${this.apiUrl}/name/${country}`);
	}

	public searchByCountryAlphaCode(alphaCode: string): Observable<Country | null> {
		return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${alphaCode}`)
			.pipe(
				map(countries => countries.length > 0 ? countries[0] : null),
				catchError(() => of(null))
			);
	}
}
