import React from 'react';
import { List, InputItem, WhiteSpace, Toast, Modal, Button } from 'antd-mobile';
import { List as AndtList, Avatar, Icon } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';

const namespace = 'loginModel';
const prompt = Modal.prompt;
const alert = Modal.alert;

const Item = List.Item;
const Brief = Item.Brief;

const mapStateToProps = state => {
  const result = state[namespace].list;
  return {
    result,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUploadLogo: (token, option, id, toucher) => {
      const action = {
        type: `${namespace}/uploadLogo`,
        payload: {
          token: token,
          option: option,
          id: id,
          toucher: toucher,
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
class ToucherManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shareModal: false,
      toucherDetail: this.props.loginModel.toucherDetail,
    };
  }

  componentWillMount() {
    if (this.props.loginModel.toucherDetail === '') {
      router.push('/login');
    } else {
      console.log('--- componentWillMount ---');
    }
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  };

  showModal = key => e => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  };

  backToToucherList = () => {
    router.push('/toucherList');
  };

  deleteToucher = () => {
    const id = this.props.loginModel.toucherDetail.Toucher.id;
    const token = this.props.loginModel.token;

    this.props.dispatch({
      type: `${namespace}/deleteToucher`,
      payload: {
        id: id,
        token: token,
      },
    });
  };

  preview = () => {
    console.log('preview');
    router.push('/preview');
  };

  addService = serviceId => {
    const id = this.props.loginModel.toucherDetail.Toucher.id;
    const ownedServices = this.props.loginModel.ownedServices;
    const token = this.props.loginModel.token;

    this.props.dispatch({
      type: `${namespace}/addService`,
      payload: {
        id: id,
        token: token,
        serviceId: serviceId,
        ownedServices: ownedServices,
      },
    });
  };

  deleteService = serviceId => {
    const id = this.props.loginModel.toucherDetail.Toucher.id;
    const ownedServices = this.props.loginModel.ownedServices;
    const token = this.props.loginModel.token;

    this.props.dispatch({
      type: `${namespace}/deleteService`,
      payload: {
        id: id,
        token: token,
        serviceId: serviceId,
        ownedServices: ownedServices,
      },
    });
  };

  pickLogo = () => {
    const input = document.getElementsByClassName('edit-pick-image-input')[0];
    if (input) {
      input.click();
    }
  };

  fileChange = event => {
    const files = event.target.files;
    const file = files[0];
    const _f = new FormData();

    if (!file) {
      return;
    }

    _f.append('directory', 'file');
    _f.append('file', file, file.name);
    const options = {
      method: 'POST',
      body: _f,
    };
    Toast.loading();
    const id = this.state.toucherDetail.Toucher.id;
    this.props.onUploadLogo(
      this.props.loginModel.token,
      options,
      id,
      this.props.loginModel.toucherDetail
    );
  };

  confirmChangeTitle = async value => {
    const id = this.state.toucherDetail.Toucher.id;
    const token = this.props.loginModel.token;

    this.props.dispatch({
      type: `${namespace}/changeTitle`,
      payload: {
        title: value,
        id: id,
        token: token,
        toucher: this.props.loginModel.toucherDetail,
      },
    });
  };

  confirmChangeDescription = async value => {
    const id = this.state.toucherDetail.Toucher.id;
    const token = this.props.loginModel.token;

    this.props.dispatch({
      type: `${namespace}/changeDescription`,
      payload: {
        description: value,
        id: id,
        token: token,
        toucher: this.props.loginModel.toucherDetail,
      },
    });
  };

  render() {
    return (
      <div>
        <div
          style={{
            position: 'fixed',
            width: '100%',
            left: 0,
            top: 0,
            right: 0,
            zIndex: 1000,
            textAlign: 'center',
            backgroundColor: '#ffffff',
            marginTop: '25px',
          }}
        >
          <Button onClick={this.backToToucherList} inline size="small" style={{ margin: '5px' }}>
            <Icon type="left" />
            返回
          </Button>

          <Button
            inline
            size="small"
            style={{ margin: '5px', color: '#ff4d4f' }}
            onClick={() =>
              alert('删除触达号', '', [
                { text: '取消', onPress: () => console.log('cancel delete') },
                { text: '确认', onPress: () => this.deleteToucher() },
              ])
            }
          >
            <Icon type="delete" />
            删除
          </Button>
          <Button
            onClick={this.showModal('shareModal')}
            inline
            size="small"
            style={{ margin: '5px', color: '#096dd9' }}
          >
            <Icon type="share-alt" />
            分享
          </Button>
          <Button onClick={this.preview} inline size="small" style={{ margin: '5px' }}>
            <Icon type="compass" />
            预览
          </Button>
        </div>

        <List style={{ marginTop: '80px' }}>
          <Item
            onClick={() =>
              prompt(
                '触达号名称',
                '',
                [
                  { text: '取消' },
                  { text: '确定', onPress: value => this.confirmChangeTitle(value) },
                ],
                'default',
                this.props.loginModel.toucherDetail.Toucher.title
              )
            }
          >
            <span style={{ color: '#595959' }}>名称：</span>
            <span style={{ color: '#262626' }}>
              {this.props.loginModel.toucherDetail.Toucher.title}
            </span>
          </Item>

          <Item
            onClick={() =>
              prompt(
                '触达号描述',
                '',
                [
                  { text: '取消' },
                  { text: '确定', onPress: value => this.confirmChangeDescription(value) },
                ],
                'default',
                this.props.loginModel.toucherDetail.Toucher.description
              )
            }
          >
            <span style={{ color: '#595959' }}>描述：</span>
            <span>{this.props.loginModel.toucherDetail.Toucher.description}</span>
          </Item>

          <Item>
            <div className="edit-wrapper edit-logo-picker" onClick={this.pickLogo}>
              <div
                className="edit-logo-title"
                style={{ display: 'inline-block', color: '#595959' }}
              >
                Logo
              </div>

              <div
                style={{
                  display: 'inline-block',
                  float: 'right',
                  marginLeft: '30px',
                  marginRight: '30px',
                }}
              >
                <Icon type="cloud-upload" style={{ fontSize: '18px' }} />
              </div>

              <img
                className="edit-logo-img"
                style={{ width: '30px', height: '30px', float: 'right' }}
                // style={{width: '30px', height: '30px', position: 'absolute', right: '50px', marginTop: '-20px'}}
                src={this.props.loginModel.toucherDetail.Toucher.logo}
                alt=""
              />
              <input
                style={{ display: 'none' }}
                className="edit-pick-image-input"
                type="file"
                onChange={this.fileChange}
                accept="image/png, image/jpg"
              />
            </div>
          </Item>

          <WhiteSpace />
        </List>

        <Item>
          <div style={{ fontSize: '15px', color: '#595959' }}>我的服务</div>
        </Item>

        <AndtList
          dataSource={this.props.loginModel.ownedServices}
          renderItem={item => (
            <AndtList.Item
              key={item.id}
              style={{ backgroundColor: '#ffffff', paddingLeft: '10px', paddingRight: '20px' }}
            >
              <AndtList.Item.Meta
                avatar={<Avatar src={item.logo} shape="square" />}
                title={<a href="#">{item.title}</a>}
                // description={item.des}
              />
              <div onClick={() => this.deleteService(item.id)}>
                <Icon type="delete" style={{ fontSize: '18px', marginRight: '25px' }} />
              </div>
            </AndtList.Item>
          )}
        />

        <WhiteSpace size="lg" />
        <Item>
          <div style={{ fontSize: '15px', color: '#595959' }}>可选服务</div>
        </Item>

        <AndtList
          dataSource={this.props.loginModel.providedServices}
          renderItem={item => (
            <AndtList.Item
              key={item.id}
              style={{ backgroundColor: '#ffffff', paddingLeft: '10px', paddingRight: '20px' }}
            >
              <AndtList.Item.Meta
                avatar={<Avatar src={item.logo} shape="square" />}
                title={<a href="#">{item.title}</a>}
                // description={item.des}
              />
              <div onClick={() => this.addService(item.id)}>
                <Icon
                  type="plus-circle"
                  style={{ fontSize: '18px', color: '#1890ff', marginRight: '25px' }}
                />
              </div>
            </AndtList.Item>
          )}
        />

        <Modal
          visible={this.state.shareModal}
          transparent
          maskClosable={false}
          onClose={this.onClose('shareModal')}
          footer={[
            {
              text: 'ok',
              onPress: () => {
                this.onClose('shareModal')();
              },
            },
          ]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div>
            <img
              style={{ height: '150px' }}
              src={this.props.loginModel.toucherDetail.Toucher.shareQrcode}
              alt="请稍等..."
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default ToucherManage;
