import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private q: string;
  private searchBoxText: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(e => this.q = e.get('q'));
  }

  public search() {
    this.router.navigate(['/'], { queryParams: { q: this.searchBoxText } });
    this.searchBoxText = '';
  }
}
