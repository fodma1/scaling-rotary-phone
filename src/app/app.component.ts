import { Component, OnInit } from '@angular/core';
import { Builder} from 'escher-vis';
import { select, Selection, BaseType} from 'd3-selection';
import { MemoIterator } from '@types/lodash';
import * as _ from 'lodash';

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
  nodeStats: any;
  selectedSegment: any;
  constructor() {
    this.title = 'app works!';
    this.greenScheme = false;  
    this.builderOptions = {
      menu: 'zoom'
    };  
  }
  ngOnInit():void {
    this.target = select('#escher-target');
  }
  toggleColorScheme():void {
    this.greenScheme = !this.greenScheme;
  }
  fileChange(event):void {
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
      this.computeNodeStats(this.builder.map);
      var selection = this.builder.selection;
      selection.selectAll('.segment')
        .style('cursor', (d) => {
            return 'pointer';
        })
        .on('click', (segment) => {
          this.selectedSegment = {
            from: this.builder.map.nodes[segment.from_node_id],
            to: this.builder.map.nodes[segment.to_node_id]
          };
        });
    }
    reader.readAsText(file);
  }
  // Todo: move this to a component
  computeNodeStats(map):void {
    var ObjCounter:MemoIterator<Array<any>, Map<string, number>> = (prev: Map<string, number>, curr: Array<any>, key: string) => {
      prev[key] = curr.length;
      return prev;
    };
    this.nodeStats = _(map.nodes).values().groupBy('node_type').reduce(ObjCounter, {});
  }
  compute():void {
    this.computeNodeStats(this.builder.map);
  }
}
