import {Component} from '@angular/core';
import {CountriesService} from '../../services/countries.service';
import {Country} from '../../interfaces/Country';

@Component({
	selector: 'app-by-capital-page',
	templateUrl: './by-capital-page.component.html',
	styles: ``
})
export class ByCapitalPageComponent {

	private _countries: Country[] = [];
	public isLoading = false;

	constructor(private countriesService: CountriesService) {
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
