import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CountriesService} from '../../services/countries.service';
import {switchMap} from 'rxjs';
import {Country} from '../../interfaces/country.interface';

@Component({
	selector: 'app-country-page',
	templateUrl: './country-page.component.html',
	styles: ``
})
export class CountryPageComponent implements OnInit {

	public country?: Country;

	constructor(private router: Router,
	            private activateRoute: ActivatedRoute,
	            private countriesService: CountriesService) {
	}

	ngOnInit(): void {
		this.activateRoute.params
			.pipe(
				switchMap(({countryId}) => this.countriesService.searchByCountryAlphaCode(countryId))
			)
			.subscribe(county => {
				if (!county) {
					return this.router.navigateByUrl('');
				}

				this.country = county;
				return;
			});

	}

	protected readonly Object = Object;
}
