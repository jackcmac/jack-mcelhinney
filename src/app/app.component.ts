import { Component } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

interface CourseNode {
  name: string;
  children?: CourseNode[];
}

const TREE_DATA: CourseNode[] = [
  {
    name: 'Algorithms',
    children: [
      {name: 'Design and Analysis of Algorithms'},
      {name: 'Applied Data Science'},
      {name: 'Algorithms and Data Structures'}
    ]
  },
  {
    name: 'Software Development',
    children: [
      {name: 'Cloud Computing Architecture'},
      {name: 'Human and Computer Interaction'},
      {name: 'Software Engineering'},
    ]
  },
  {
    name: 'Other',
    children: [
      {name: 'Artificial Intelligence'},
      {name: 'Linear Algebra'},
      {name: 'Network Programming'},
      {name: 'Operating Systems'},
      {name: 'Programming Systems'}
    ]
  }
];

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jack-mcelhinney';

  private _transformer = (node: CourseNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;
}
