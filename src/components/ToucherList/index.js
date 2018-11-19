import React from 'react';
import { ListView, Toast } from 'antd-mobile';
import { Card, Icon, Avatar, Skeleton } from 'antd';
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

    onGetToucherDetail: (token, toucherId) => {
      const action = {
        type: `${namespace}/getToucherDetail`,
        payload: {
          token: token,
          toucherId: toucherId,
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
class ToucherList extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      isLoading: true,
      loading: false,
    };
  }

  componentDidMount() {
    const token = this.props.loginModel.token;

    if (token !== '') {
      this.props.onGetToucherList(token);
    } else {
      router.push('/login');
    }
  }

  manageToucher = async toucherId => {
    if (this.token !== '') {
      this.props.onGetToucherDetail(this.props.loginModel.token, toucherId);
    } else {
      router.push('/login');
      return Toast.info('请重新登录');
    }
  };

  previewToucher = async toucherId => {
    console.log('preview toucher:', toucherId);
    router.push('/preview');
  };

  render() {
    const { toucherList = [] } = this.props;

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    let index = toucherList.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = toucherList.length - 1;
      }
      const obj = toucherList[index--];
      return (
        <div>
          <Card
            actions={[
              <a href="javascript:;" onClick={() => this.previewToucher(obj.id)}>
                <Icon type="compass" style={{ marginRight: 10 }} />
                预览
              </a>,
              <a href="javascript:;" onClick={() => this.manageToucher(obj.id)}>
                <Icon type="setting" style={{ marginRight: 10 }} />
                管理
              </a>,
            ]}
          >
            <Skeleton loading={this.state.loading} avatar active>
              <Meta
                avatar={<Avatar src={obj.logo} shape={'square'} size={'large'} />}
                title={obj.title}
                description={obj.description}
              />
            </Skeleton>
          </Card>
        </div>
      );
    };
    return (
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(toucherList)}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        useBodyScroll
        // onScroll={() => {console.log('scroll');}}
        scrollRenderAheadDistance={500}
        // onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}

export default ToucherList;
