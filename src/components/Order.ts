import { ensureAllElements } from '../utils/utils';
import { IEvents } from './base/events';
import { Form } from './Form';

export interface IOrderForm {
	payment: string;
	address: string;
}

export interface IContactsForm {
	email: string;
	phone: string;
}

export class Order extends Form<IOrderForm> {
	protected _paymentButtons: HTMLButtonElement[];

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._paymentButtons = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			container
		);

		this._paymentButtons.forEach((button) => {
			button.addEventListener('click', () => {
				events.emit('payment:change', button);
			});
		});
	}

	selectButton(name: string) {
		this._paymentButtons.forEach((button) => {
			if (button.name === name) {
				this.toggleClass(button, 'button_alt-active', true);
			} else {
				this.toggleClass(button, 'button_alt-active', false);
			}
		});
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}
}

export class Contacts extends Form<IContactsForm> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}
}
