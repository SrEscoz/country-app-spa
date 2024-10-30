import {Component} from '@angular/core';
import {CountriesService} from '../../services/countries.service';
import {Country} from '../../interfaces/Country';

@Component({
	selector: 'app-by-region',
	templateUrl: './by-region.component.html',
	styles: ``
})
export class ByRegionComponent {

	private _countries: Country[] = [];
	public isLoading = false;

	constructor(private countriesService: CountriesService) {
	}

	public searchByRegion(value: string): void {
		this.isLoading = true;

		this.countriesService.searchByRegion(value)
			.subscribe(countries => {
				this._countries = countries;
				this.isLoading = false;
			});
	}

	get countries(): Country[] {
		return this._countries;
	}
}
