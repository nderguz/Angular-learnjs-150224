import {BehaviorSubject, Subscription} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Product} from './product.interface';
import {ProductsApiService} from './products-api.service';
import {State} from '../../store/reducer';

@Injectable({
    providedIn: 'root',
})
export class ProductsStoreService {
    private readonly productsStore$ = new BehaviorSubject<Product[] | null>(null);
    private readonly currentProductStore$ = new BehaviorSubject<Product | null>(null);

    private activeLoadProductsSubscription: Subscription | null = null;
    private activeLoadCurrentProductSubscription: Subscription | null = null;

    readonly products$ = this.productsStore$.asObservable();
    readonly currentProduct$ = this.currentProductStore$.asObservable();

    constructor(
        private readonly productsApiService: ProductsApiService,
        private readonly store$: Store<State>,
    ) {}

    loadProducts(subcategoryId?: string | null) {
        if (this.activeLoadProductsSubscription) {
            this.activeLoadProductsSubscription.unsubscribe();
        }

        this.productsStore$.next(null);

        this.activeLoadProductsSubscription = this.productsApiService
            .getProducts$(subcategoryId)
            .subscribe(products => {
                this.productsStore$.next(products);
                // Костыль до примения эффекта
                // this.store$.dispatch(addProducts(products));

                this.activeLoadProductsSubscription = null;
            });
    }

    loadProduct(id: Product['_id']) {
        if (this.activeLoadCurrentProductSubscription) {
            this.activeLoadCurrentProductSubscription.unsubscribe();
        }

        const productPreview = this.productsStore$.value?.find(({_id}) => _id === id);

        this.currentProductStore$.next(productPreview || null);

        this.activeLoadCurrentProductSubscription = this.productsApiService
            .getProduct$(id)
            .subscribe(product => {
                this.currentProductStore$.next(product || null);

                this.activeLoadCurrentProductSubscription = null;
            });
    }
}
