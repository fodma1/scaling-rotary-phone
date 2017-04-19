import { Component } from '@angular/core';
import { Builder} from 'escher-vis';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  builder = Builder(null, null, null, null, {});
}
