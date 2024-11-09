import { Product } from './AppState';
import { IEvents } from './base/events';
import { Component } from './Component';

const categoryClasses: { [key: string]: string } = {
	'софт-скил': 'card__category_soft',
	'хард-скил': 'card__category_hard',
	кнопка: 'card__category_button',
	дополнительное: 'card__category_additional',
	другое: 'card__category_other',
};

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICard {
	id: string;
	title: string;
	category: string;
	description: string;
	image: string;
	price: number;
	index?: number;
}

export class Card extends Component<ICard> {
	protected _id: HTMLElement;
	protected _category: HTMLElement;
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _description?: HTMLElement;
	protected _price: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _index?: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

		this._category = container.querySelector(`.card__category`);
		this._title = container.querySelector(`.card__title`);
		this._image = container.querySelector(`.card__image`);
		this._price = container.querySelector(`.card__price`);
		this._button = container.querySelector(`.card__button`);
		this._index = container.querySelector('.basket__item-index');

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set category(value: string) {
		this.setText(this._category, value);
		this._category.classList.add(categoryClasses[value]);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set price(value: number) {
		this.setText(this._price, `${value} синапсов`);
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	buttonDisabled(items: Product[], id: string, price: number | null) {
		let itemsID = items.map((item) => item.id);
		if (itemsID.includes(id) || price === null) {
			this.setDisabled(this._button, true);
		} else {
			this.setDisabled(this._button, false);
		}
	}
}
