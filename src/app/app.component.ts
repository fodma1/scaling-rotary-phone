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
  builderOptions: any;
  greenScheme: boolean;
  constructor() {
    this.title = 'app works!';
    this.greenScheme = false;  
    this.builderOptions = {
      menu: 'zoom'
    };  
  }
  ngOnInit():void{
    this.target = select('#escher-target');
  }
  toggleColorScheme():void{
    this.greenScheme = !this.greenScheme;
  }
  fileChange(event){
    var file:File = event.srcElement.files[0];
    var reader:FileReader = new FileReader();
    reader.onloadend = (e) => {
      this.builder = Builder(
        JSON.parse(reader.result),
        null,
        null,
        this.target,
        this.builderOptions
      );
    }
    reader.readAsText(file);
  }
}
