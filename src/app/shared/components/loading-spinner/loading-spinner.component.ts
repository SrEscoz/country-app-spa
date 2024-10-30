import {Component} from '@angular/core';

@Component({
	selector: 'shared-loading-spinner',
	templateUrl: './loading-spinner.component.html',
	styles: `
        .spinner-container {
            position: fixed;
            bottom: 15px;
            right: 15px;
            background-color: white;
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            box-shadow: 0 0 5px rgba(0, 0, 0, .5);
        }

        span {
            margin-left: 5px;
        }
	`
})
export class LoadingSpinnerComponent {

}
