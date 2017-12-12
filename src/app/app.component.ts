import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NewsService } from './news.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    allNews = [];
    filteredNews = [];
    page = 1;
    newsPerPage = 5;
    newsLoaded: boolean;

    constructor(private _translate: TranslateService, private _newsService: NewsService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        _translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        _translate.use('en');
    }

    ngOnInit() {
        this._newsService.getAllNews()
            .subscribe((news) => {
                console.log(news.length);
                this.allNews = news;
                this.filteredNews = JSON.parse(JSON.stringify(this.allNews));
                this.newsLoaded = true;
            })
    }

    filtered(data) {
        this.filteredNews = data.newses;
    }
}
