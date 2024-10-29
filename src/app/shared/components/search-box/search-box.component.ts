import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
	selector: 'shared-search-box',
	templateUrl: './search-box.component.html',
	styles: ``
})
export class SearchBoxComponent {

	@Input()
	public placeHolder: string = '';

	@Output()
	public onSearch = new EventEmitter<string>();

	public emitSearch(value: string): void {
		if (value.length === 0) {
			return;
		}

		this.onSearch.emit(value);
	}

}
