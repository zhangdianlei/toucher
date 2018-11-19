import React from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import { Button, WhiteSpace, WingBlank, Modal } from 'antd-mobile';

const namespace = 'loginModel';

const prompt = Modal.prompt;

const mapStateToProps = state => {
  const result = state[namespace].list;
  return {
    result,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddToucher: (value, token) => {
      const action = {
        type: `${namespace}/putAddToucher`,
        payload: {
          title: value,
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
class AddToucherButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  confirmAddToucher = async value => {
    const token = this.props.loginModel.token;
    this.props.onAddToucher(value, token);
  };

  render() {
    return (
      <div>
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <Button
            type="ghost"
            onClick={() =>
              prompt(
                '触达号名称',
                '',
                [
                  { text: '取消' },
                  { text: '确定', onPress: value => this.confirmAddToucher(value) },
                ],
                'default',
                ''
              )
            }
          >
            <Icon type="plus-circle" />
            <span style={{ marginLeft: '10px' }}>新增触达号</span>
          </Button>
        </WingBlank>

        <WhiteSpace size="lg" />
      </div>
    );
  }
}

export default AddToucherButton;
