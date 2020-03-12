import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  results=['1', '2', '3', '4']
  @Input() allCompared:[];
  data:[];
  @Input() amount:any;
  @Input() origine:any;
  @Input() destination:any;
  @Input() pays_origine:any;
  @Input() pays_destination:any;
  @Input() emetteur:any;
  apiUrl="http://localhost/ScreenUnitoAPI/kompara";

  
  constructor() { }

  ngOnInit() {
    this.data=this.allCompared;
  }

}
