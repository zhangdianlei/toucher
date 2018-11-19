import React, { PureComponent } from 'react';
import { Button, Toast } from 'antd-mobile';
import ToucherManageComponent from '@/components/ToucherManage';

class ToucherManage extends PureComponent {
  componentDidMount() {}

  showToast = () => {
    Toast.info('This is a toast tips !!!', 10);
  };

  render() {
    return (
      <div>
        <ToucherManageComponent />
      </div>
    );
  }
}

export default ToucherManage;
