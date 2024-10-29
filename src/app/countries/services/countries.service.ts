import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from '../interfaces/Country';

@Injectable({
	providedIn: 'root'
})
export class CountriesService {

	private apiUrl: string = 'https://restcountries.com/v3.1';

	constructor(private httpClient: HttpClient) {
	}

	public searchByCapital(capital: string): Observable<Country[]> {
		return this.httpClient.get<Country[]>(`${this.apiUrl}/capital/${capital}`);
	}
}
