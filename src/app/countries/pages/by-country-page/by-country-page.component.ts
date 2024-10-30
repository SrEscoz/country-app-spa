import {Component} from '@angular/core';
import {Country} from '../../interfaces/Country';
import {CountriesService} from '../../services/countries.service';

@Component({
	selector: 'app-by-country-page',
	templateUrl: './by-country-page.component.html',
	styles: ``
})
export class ByCountryPageComponent {

	private _countries: Country[] = [];
	public isLoading = false;

	constructor(private countriesService: CountriesService) {
	}

	public searchByCountry(country: string): void {
		this.isLoading = true;

		this.countriesService.searchByCountry(country)
			.subscribe(countries => {
				this._countries = countries;
				this.isLoading = false;
			});
	}

	get countries(): Country[] {
		return this._countries;
	}
}
