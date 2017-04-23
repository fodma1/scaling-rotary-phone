import { Component, OnInit } from '@angular/core';
import { Builder} from 'escher-vis';
import { select, Selection, BaseType} from 'd3-selection';
import { MemoIterator } from '@types/lodash';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  target: Selection<BaseType, {}, null, undefined>;
  builder: any;
  builderOptions: any;
  greenScheme: boolean;
  nodeStats: any;
  selectedSegment: any;
  constructor() {
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
    this.nodeStats = d3
      .nest()
      .key(e => e.node_type)
      .rollup(d => d.length)
      .entries(d3.values(map.nodes));
  }
  compute():void {
    this.computeNodeStats(this.builder.map);
  }
}
