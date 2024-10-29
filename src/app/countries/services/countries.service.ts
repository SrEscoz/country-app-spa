import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {Country} from '../interfaces/Country';

@Injectable({
	providedIn: 'root'
})
export class CountriesService {

	private apiUrl: string = 'https://restcountries.com/v3.1';

	constructor(private httpClient: HttpClient) {
	}

	public searchByCapital(capital: string): Observable<Country[]> {
		return this.httpClient.get<Country[]>(`${this.apiUrl}/capital/${capital}`)
			.pipe(
				catchError(() => of([]))
			);
	}

	public searchByRegion(region: string): Observable<Country[]> {
		return this.httpClient.get<Country[]>(`${this.apiUrl}/region/${region}`)
			.pipe(
				catchError(() => of([]))
			);
	}

	public searchByCountry(country: string): Observable<Country[]> {
		return this.httpClient.get<Country[]>(`${this.apiUrl}/name/${country}`)
			.pipe(
				catchError(() => of([]))
			);
	}

	public searchByCountryAlphaCode(alphaCode: string): Observable<Country | null> {
		return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${alphaCode}`)
			.pipe(
				map(countries => countries.length > 0 ? countries[0] : null),
				catchError(() => of(null))
			);
	}
}
