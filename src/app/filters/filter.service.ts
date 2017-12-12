import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

@Injectable()
export class FilterService {
    constructor() { }

    filter(categories, publishers, newsArray): Observable<any> {
        return Observable.of(newsArray)
            .map((newses) => {
                let fl_categories = [];
                categories.forEach((category) => {
                    newses.forEach(news => {
                        if (news.CATEGORY === category) {
                            fl_categories.push(news);
                        }
                    });
                });

                fl_categories = fl_categories.length > 0 ? fl_categories : newses;

                let final_filtered = [];

                publishers.forEach((publisher) => {
                    fl_categories.forEach(news => {
                        if (news.PUBLISHER === publisher) {
                            final_filtered.push(news);
                        }
                    });
                });

                final_filtered = final_filtered.length > 0 ? final_filtered : newses;
                return final_filtered;
            });
    }

    getCategories(newsArray): Observable<any> {
        return Observable.of(newsArray)
            .map((newses) => {
                let categories = [];
                newsArray.forEach(news => {
                    if (categories.indexOf(news.CATEGORY) === -1) {
                        categories.push(news.CATEGORY);
                    }
                });
                return categories;
            });

    }

    getPublishers(newsArray): Observable<any> {
        return Observable.of(newsArray)
            .map((newses) => {
                let publishers = [];
                newsArray.forEach(news => {
                    if (publishers.indexOf(news.PUBLISHER) === -1) {
                        publishers.push(news.PUBLISHER);
                    }
                });
                return publishers;
            });

    }

}
