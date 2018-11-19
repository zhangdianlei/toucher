import React from 'react';
import { ListView, Toast, Tabs, WhiteSpace } from 'antd-mobile';
import { Icon, Avatar, Skeleton, Card } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';

import { connect } from 'dva';
import router from 'umi/router';

const namespace = 'loginModel';

const { Meta } = Card;

const mapStateToProps = state => {
  const result = state.loginModel.toucherList;
  return {
    toucherList: result,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetToucherList: token => {
      const action = {
        type: `${namespace}/getToucherList`,
        payload: {
          token: token,
        },
      };
      dispatch(action);
    },
  };
};

@connect(({ loginModel }) => ({
  loginModel,
}))
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class PreviewComponent extends React.Component {
  state = {
    datas: [],
    selectedTabIndex: 0,
  };

  componentDidMount() {}

  renderTabBar(props) {
    return (
      <Sticky>
        {({ style }) => (
          <div style={{ ...style, zIndex: 1 }}>
            <Tabs.DefaultTabBar {...props} />
          </div>
        )}
      </Sticky>
    );
  }

  render() {
    const tabs = [{ title: '互动吧' }, { title: '服务店' }, { title: '分享' }];

    return (
      <div>
        <Card className="preview-info">
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="日日顺"
            description="日日顺是海尔集团旗下综合服务品牌，以诚信为核心，以社群为基本单元，致力成为物联网时代开放的引领平台"
          />
        </Card>

        <StickyContainer>
          <Tabs tabs={tabs} renderTabBar={this.renderTabBar}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '',
                backgroundColor: '#fff',
              }}
            >
              Content of first tab 1<br />
              Content of first tab 2<br />
              Content of first tab 3<br />
              Content of first tab 4<br />
              Content of first tab 5<br />
              Content of first tab 6<br />
              Content of first tab 7<br />
              Content of first tab 8<br />
              Content of first tab 1<br />
              Content of first tab 2<br />
              Content of first tab 3<br />
              Content of first tab 4<br />
              Content of first tab 5<br />
              Content of first tab 6<br />
              Content of first tab 7<br />
              Content of first tab 8<br />
              Content of first tab 1<br />
              Content of first tab 2<br />
              Content of first tab 3<br />
              Content of first tab 4<br />
              Content of first tab 5<br />
              Content of first tab 6<br />
              Content of first tab 7<br />
              Content of first tab 8<br />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '250px',
                backgroundColor: '#fff',
              }}
            >
              Content of second tab
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '250px',
                backgroundColor: '#fff',
              }}
            >
              Content of third tab
            </div>
          </Tabs>
        </StickyContainer>
      </div>
    );
  }
}

export default PreviewComponent;
