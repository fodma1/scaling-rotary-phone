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
  greenScheme: boolean;
  nodeStats: any;
  selectedSegment: any;
  constructor() {
    this.greenScheme = false;  
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
    reader.onloadend = () => {this.fileHandler(JSON.parse(reader.result));}
    reader.readAsText(file);
  }

  fileHandler(contents):void {
      this.builder = Builder(
        contents, null, null, this.target, {menu: 'zoom'}
      );
      this.computeNodeStats(this.builder.map);
      this.setUpClickHandler(this.builder.selection, this.builder.map.nodes);
  }

  computeNodeStats(map):void {
    this.nodeStats = d3
      .nest()
      .key(e => e.node_type)
      .rollup(d => d.length)
      .entries(d3.values(map.nodes));
  }

  setUpClickHandler(selection, nodes):void {
    selection.selectAll('.segment')
      .style('cursor', (d) => {
          return 'pointer';
      })
      .on('click', (segment) => {
        this.selectedSegment = {
          from: nodes[segment.from_node_id],
          to: nodes[segment.to_node_id]
        };
      });
  }
}
