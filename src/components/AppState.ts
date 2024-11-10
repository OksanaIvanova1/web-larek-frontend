import { IContactsForm, IOrder, IOrderForm, IProduct } from '../types';
import { Card } from './Card';
import { Model } from './base/Model';

export interface IAppState {
	catalog: IProduct[];
	basket: string[];
	order: IOrder | null;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export class Product extends Model<IProduct> {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}
export class AppState extends Model<IAppState> {
	basket: Product[] = [];
	catalog: Product[];
	order: IOrder = {
		payment: '',
		address: '',
		email: '',
		phone: '',
		total: 0,
		items: [],
	};
	preview: string | null;
	formErrors: FormErrors = {};

	clearBasket() {
		this.basket = [];
		this.order.items = [];
	}

	getCounter() {
		return this.basket.length;
	}

	getTotal() {
		const total = this.basket.reduce(function (currentSum, currentElement) {
			return currentSum + currentElement.price;
		}, 0);
		return total;
	}

	addBasket(item: Product) {
		this.basket.push(item);
		this.events.emit('basket:changed');
	}

	removeBasket(item: Product) {
		this.basket = this.basket.filter((basketItem) => basketItem.id != item.id);
		this.events.emit('basket:changed', this.basket);
	}

	setOrderItems() {
		this.order.items = this.basket.map((card) => card.id);
		this.order.total = this.getTotal();
	}

	setCatalog(items: Product[]) {
		this.catalog = items.map((item) => new Product(item, this.events));
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	setPreview(item: Card) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	setOrderField(field: keyof IOrderForm | keyof IContactsForm, value: string) {
		this.order[field] = value;

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.payment) {
			errors.payment = `Необходимо указать способ оплаты`;
		}
		if (!this.order.address) {
			errors.address = `Необходимо указать адрес`;
		}
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	getCardIndex(item: Product) {
		return Number(this.basket.indexOf(item)) + 1;
	}
}
