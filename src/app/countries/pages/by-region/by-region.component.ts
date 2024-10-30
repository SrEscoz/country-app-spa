import {Component, OnInit} from '@angular/core';
import {CountriesService} from '../../services/countries.service';
import {Country} from '../../interfaces/country.interface';
import {Region} from '../../interfaces/region.type';

@Component({
	selector: 'app-by-region',
	templateUrl: './by-region.component.html',
	styles: ``
})
export class ByRegionComponent implements OnInit {

	private _countries: Country[] = [];

	public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
	public selectedRegion?: Region;

	public isLoading = false;

	constructor(private countriesService: CountriesService) {
	}

	ngOnInit(): void {
		this._countries = this.countriesService.cacheStore.region.countries;
		this.selectedRegion = this.countriesService.cacheStore.region.term;
	}

	public searchByRegion(value: Region): void {
		this.isLoading = true;
		this.selectedRegion = value;

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
