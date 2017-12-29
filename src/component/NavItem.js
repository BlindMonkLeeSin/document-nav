import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createNavItems from '../util/createNavItems';
import pureUpdate from '../util/pure';


const BASE_PADDING_LEFT = 15;

class NavItem extends Component {
  static propTypes = {
    index: PropTypes.string,
    level: PropTypes.number,
    title: PropTypes.string,
    anchor: PropTypes.string,
    subItems: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      level: PropTypes.number,
      anchor: PropTypes.string
    })),
  }
  static contextTypes = {
    scrollBar: PropTypes.oneOf(['left', 'right']),
    activeAnchor: PropTypes.string,
    showOrderNumber: PropTypes.bool
  }
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  shouldComponentUpdate = pureUpdate.bind(this)
  renderSubNavItems() {
    const { children, index, level, subItems } = this.props;
    if (children) {
      return React.Children.map(children, (item, i) =>
        React.cloneElement(item, {
          index: `${index}.${i + 1}`,
          level: level + 1,
          key: `${index}.${i + 1} ${item.props.anchor}`
        })
      );
    }
    return createNavItems(subItems, level, index);
  }
  render() {
    const { title, anchor, subItems, children, index, level } = this.props;
    const { scrollBar = 'right', activeAnchor, showOrderNumber } = this.context;
    const active = anchor === activeAnchor;
    return (
      <div
        className="nav-item"
      >
        <a
          href={`#${anchor}`}
          className={`nav-link ${active ? 'active' : ''} scroll-bar-${scrollBar}`}
          style={{
            paddingLeft: `${((level - 1) * 20) + BASE_PADDING_LEFT}px`
          }}
        >
          { showOrderNumber ? `${index} ${title}` : title}
        </a>
        {
        subItems || children ?
          <div
            className="sub-nav-item"
          >
            {this.renderSubNavItems()}
          </div> : null
        }
      </div>

    );
  }
}

export default NavItem;
