import React, {Component} from 'react';

import 'react-virtualized/styles.css'
import 'react-virtualized-tree/lib/main.css'
import 'material-icons/css/material-icons.css'

import Tree from 'react-virtualized-tree'

const MIN_NUMBER_OF_PARENTS = 500;
const MAX_NUMBER_OF_CHILDREN = 15;
const MAX_DEEPNESS = 4;

const {Deletable, Expandable, Favorite} = Renderers;

const Nodes = constructTree(MAX_DEEPNESS, MAX_NUMBER_OF_CHILDREN, MIN_NUMBER_OF_PARENTS);
const getTotalNumberOfElements = (nodes, counter = 0) => {
  return counter + nodes.length + nodes.reduce((acc, n) => getTotalNumberOfElements(n.children, acc), 0);
};

const totalNumberOfNodes = getTotalNumberOfElements(Nodes);

class LargeCollection extends Component {
  state = {
    nodes: Nodes,
  };

  handleChange = nodes => {
    this.setState({nodes});
  };

  render() {
    return (
      <Tree nodes={this.state.nodes} onChange={this.handleChange}>
        {({node, ...rest}) => (
          <Expandable node={node} {...rest}>
            {node.name}
            <Deletable node={node} {...rest}>
              <Favorite node={node} {...rest} />
            </Deletable>
          </Expandable>
        )}
      </Tree>
    );
  }
}

export default createEntry(
  'large-collection',
  'LargeCollection',
  'Large Data Collection',
  <div>
    <p>A tree that renders a large collection of nodes.</p>
    <p>This example is rendering a total of {totalNumberOfNodes} nodes</p>
  </div>,
  LargeCollection,
);