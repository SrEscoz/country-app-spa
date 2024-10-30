import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {debounceTime, Subject, Subscription} from 'rxjs';

@Component({
	selector: 'shared-search-box',
	templateUrl: './search-box.component.html',
	styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

	@Input()
	public placeHolder: string = '';

	@Input()
	public initialValue: string = '';

	@Output()
	public onSearch = new EventEmitter<string>();

	@Output()
	public onDebounce = new EventEmitter<string>();

	private debouncer = new Subject<string>();
	private debouncerSubscription?: Subscription;

	ngOnInit(): void {
		this.debouncerSubscription = this.debouncer
			.pipe(
				debounceTime(300),
			)
			.subscribe(value => this.onDebounce.emit(value));
	}

	ngOnDestroy(): void {
		this.debouncerSubscription?.unsubscribe();
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
