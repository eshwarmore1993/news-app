import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { FilterService } from './filter.service';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

    @Input("news")
    set news(value) {
        if (value) {
            this.allNews = value;
            this._filter.getCategories(this.allNews)
                .subscribe((categories) => {
                    this.categories = categories;
                    this.selectedCategories = JSON.parse(JSON.stringify(categories));
                });

            this._filter.getPublishers(this.allNews)
                .subscribe((publishers) => {
                    this.publishers = publishers;
                    this.selectedPublishers = JSON.parse(JSON.stringify(publishers));
                });
        }
    }

    allNews: any;
    categories = [];
    publishers = [];
    selectedCategories = [];
    selectedPublishers = [];

    @Output('filtered')
    filtered = new EventEmitter<any>();

    constructor(private _filter: FilterService) {
    }

    ngOnInit() {
    }

    publisherCheckbox($event) {
        if ($event.target.checked) {
            this.publishers.push($event.target.value);
        } else {
            this.selectedPublishers.splice(this.selectedPublishers.indexOf[$event.target.value], 1);
        }
        this.filterNewses();
    }

    categoryCheckbox($event) {
        if ($event.target.checked) {
            this.selectedCategories.push($event.target.value);
        } else {
            this.selectedCategories.splice(this.selectedCategories.indexOf[$event.target.value], 1);
        }
        this.filterNewses();
    }

    private filterNewses() {
        this._filter.filter(this.selectedCategories, this.selectedPublishers, this.allNews)
            .subscribe((filteredNews) => {
                this.filtered.emit({newses: filteredNews});
            });
    }

}
