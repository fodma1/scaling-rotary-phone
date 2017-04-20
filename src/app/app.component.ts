import { Component, OnInit } from '@angular/core';
import { Builder} from 'escher-vis';
import { select, Selection, BaseType} from 'd3-selection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: string;
  target: Selection<BaseType, {}, null, undefined>;
  builder: any;
  builderOptions: {};
  greenScheme: boolean;
  constructor() {
    this.title = 'app works!';
    this.greenScheme = false;    
  }
  ngOnInit() {
    this.target = select('#escher-target');
    // I had issues with jQuery, and there was another issue, possibly a bug
    // The `{menu: 'zoom'}` option is a workaround.
    this.builder = Builder(null, null, null, this.target, this.builderOptions);
  }
  toggleColorScheme() {
    this.greenScheme = !this.greenScheme;
  }
}
