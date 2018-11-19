import React, { PureComponent } from 'react';
import router from 'umi/router';
import PreviewComponent from '@/components/Preview';

class ToucherList extends PureComponent {
  componentDidMount() {}

  render() {
    return (
      <div>
        <PreviewComponent />
      </div>
    );
  }
}

export default ToucherList;
