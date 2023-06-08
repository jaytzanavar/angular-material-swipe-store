import { Injectable } from "@angular/core";
import { CartItem } from "../models/cart.model";

@Injectable({
    providedIn: 'root',
})

export class UtilitiesService {

    getTotal(items: Array<CartItem>): number {
        return items.map((item) => item.price * item.quantity)
            .reduce((prev, current) => prev + current, 0)
    }


}