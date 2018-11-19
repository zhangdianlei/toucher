
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ category }) => ({
  category,
}))
class Category extends PureComponent {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { route } = this.props;
    return <div className={styles.category}>{route.title}</div>;
  }
}

export default Category;
