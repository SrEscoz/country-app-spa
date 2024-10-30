import {Component, OnInit} from '@angular/core';
import {CountriesService} from '../../services/countries.service';
import {Country} from '../../interfaces/country.interface';

@Component({
	selector: 'app-by-capital-page',
	templateUrl: './by-capital-page.component.html',
	styles: ``
})
export class ByCapitalPageComponent implements OnInit {

	private _countries: Country[] = [];

	public initialValue: string = '';
	public isLoading = false;

	constructor(private countriesService: CountriesService) {
	}

	ngOnInit(): void {
		this._countries = this.countriesService.cacheStore.capital.countries;
		this.initialValue = this.countriesService.cacheStore.capital.term;
	}

	public searchByCapital(value: string): void {
		this.isLoading = true;

		this.countriesService.searchByCapital(value)
			.subscribe(countries => {
				this._countries = countries;
				this.isLoading = false;
			});
	}

	get countries(): Country[] {
		return this._countries;
	}
}
