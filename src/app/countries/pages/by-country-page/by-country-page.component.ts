import {Component, OnInit} from '@angular/core';
import {Country} from '../../interfaces/country.interface';
import {CountriesService} from '../../services/countries.service';

@Component({
	selector: 'app-by-country-page',
	templateUrl: './by-country-page.component.html',
	styles: ``
})
export class ByCountryPageComponent implements OnInit {

	private _countries: Country[] = [];

	public initialValue: string = '';
	public isLoading = false;

	constructor(private countriesService: CountriesService) {
	}

	ngOnInit(): void {
		this._countries = this.countriesService.cacheStore.country.countries;
		this.initialValue = this.countriesService.cacheStore.country.term;
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
