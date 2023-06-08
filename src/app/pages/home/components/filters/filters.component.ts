import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '../../../../services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>()
  categoriesSubscription: Subscription | undefined;
  categories: Array<string> | undefined;
  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService.getAllCategories().subscribe((
      res
    ) => {
      this.categories = res;
    })
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    this.categoriesSubscription?.unsubscribe()
  }
}
