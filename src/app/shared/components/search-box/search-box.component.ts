import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, Subject} from 'rxjs';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Component({
	selector: 'shared-search-box',
	templateUrl: './search-box.component.html',
	styles: ``
})
export class SearchBoxComponent implements OnInit {

	@Input()
	public placeHolder: string = '';

	@Output()
	public onSearch = new EventEmitter<string>();

	@Output()
	public onDebounce = new EventEmitter<string>();

	private debouncer = new Subject<string>();

	ngOnInit(): void {
		this.debouncer
			.pipe(
				debounceTime(300),
			)
			.subscribe(value => this.onDebounce.emit(value));
	}

	public emitSearch(value: string): void {
		if (value.length === 0) {
			return;
		}

		this.onSearch.emit(value);
	}

	public onKeyPress(searchTerm: string): void {
		this.debouncer.next(searchTerm);
	}
}
