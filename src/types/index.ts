import { EventEmitter } from '../components/base/events';
export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface IOrder {
	payment?: string;
	email: string;
	phone: string;
	address?: string;
	total?: number;
	items: string[];
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IShopAPI {
	getProductList: () => Promise<IProduct[]>;
	orderProducts: (order: IOrder) => Promise<IOrderResult>;
}

export interface IPage {
	counter: number;
	catalog: HTMLElement[];
}

export interface IModal {
	content: HTMLElement;
}

export interface IBasketView {
	items: HTMLElement[];
	total: number;
}
export interface IOrderForm {
	payment: string;
	address: string;
}

export interface IContactsForm {
	email: string;
	phone: string;
}

export interface ICard {
	id: string;
	title: string;
	image: string;
	description: string;
	category: string;
	price: number | null;
}
