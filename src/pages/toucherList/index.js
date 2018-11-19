import React, { PureComponent } from 'react';
import router from 'umi/router';
import ToucherListComponent from '@/components/ToucherList';
import AddToucherButton from '@/components/AddToucherButton';

class ToucherList extends PureComponent {
  componentDidMount() {}

  addToucher = () => {
    console.log('添加触达号');
    router.push('/toucherManage');
  };

  render() {
    return (
      <div>
        <AddToucherButton />

        <ToucherListComponent />
      </div>
    );
  }
}

export default ToucherList;
