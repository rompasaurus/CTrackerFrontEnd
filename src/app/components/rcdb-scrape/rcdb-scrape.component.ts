import { Component, OnInit } from '@angular/core';
import { RcdbScraperService } from 'src/app/services/rcdbScraper/rcdb-scraper.service';

@Component({
  selector: 'app-rcdb-scrape',
  templateUrl: './rcdb-scrape.component.html',
  styleUrls: ['./rcdb-scrape.component.css']
})
export class RcdbScrapeComponent implements OnInit {

  constructor(private rcdbScraper:RcdbScraperService) { }

  ngOnInit(): void {
  }
  scrape(){
    let data = this.rcdbScraper.scrapePageData(26800);
    console.log(data);
  }

}
