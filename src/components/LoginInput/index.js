import React from 'react';
import { List, InputItem, Toast } from 'antd-mobile';
import { Button, Col, Row } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';

const namespace = 'loginModel';

const mapStateToProps = (state) => {
  const result = state[namespace].list;
  return {
    result,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetSmsCode: (mobile, token) => {

      const action = {
        type: `${namespace}/getSmsCode`,
        payload: {
          mobile: mobile,
          token: token,
        },
      };
      dispatch(action);

    },
    onAuth: (mobile, smsCode, token) => {
      const action = {
        type: `${namespace}/auth`,
        payload: {
          mobile: mobile,
          smsCode: smsCode,
          token: token,
        },
      };
      dispatch(action);
    }


  };
};

@connect(({ loginModel }) => ({
  loginModel,
}))

@connect(mapStateToProps, mapDispatchToProps)
class LoginInput extends React.Component {
  state = {
    mobile: 0,
    smsCode: '',
    inputSmsCode: '',
    time: 60,
    phoneError: false,
    smsCodeError: false,
    toastMessage: '',
    sendSuccess: false,
  };

  componentDidMount() {
    const token = this.props.loginModel.token;

    if (token !== '') {
      router.push('/toucherList');
    }

  }

  loginSubmit = async () => {
    const mobile = this.state.mobile;
    const smsCode = this.state.inputSmsCode;
    const token = this.props.loginModel.token;

    let regPhone = /^((1[3-8][0-9])+\d{8})$/;
    let regSmsCode = /\d{4}/;

    if (!regPhone.test(mobile) || !regSmsCode.test(smsCode)) {
      return Toast.fail('请检查手机号是否正确');
    } else {

      this.props.onAuth(mobile, smsCode, token);

    }
    // router.push('/toucherList');
  };

  onErrorClick = () => {
    if (this.state.phoneError) {
      Toast.info(this.state.toastMessage);
    }
  };

  getSMSCode = async (time, mobile) => {

    let regPhone = /^((1[3-8][0-9])+\d{8})$/;
    if (!regPhone.test(mobile)) {
      return Toast.fail('请检查手机号是否正确');
    } else {
      this.setState({
        time: time || 60,
      });
      this.countDown();
      const token = this.props.loginModel.token;
      this.props.onGetSmsCode(mobile, token);

    }
  };

  countDown() {
    this.setState({ sendSuccess: true });
    this.Timer = setInterval(() => {
      if (this.state.time <= 1) {
        this.setState({ sendSuccess: false, time: 0 });
        clearInterval(this.Timer);
      } else {
        this.setState({ time: this.state.time - 1 });
      }
    }, 1000);
  }

  render() {
    const { sendSuccess, time, mobile } = this.state;

    const extraEle =
      <Button className='.btn_extra'
              disabled={sendSuccess}
              onClick={this.getSMSCode.bind(this, time, mobile)}
              style={{
                backgroundColor: sendSuccess ? '#999' : '#1890ff',
                fontSize: '13px', color: 'white',
                padding: '0px 5px', height: '20px', width: '75px',
                marginTop: '0px',
              }}
      >
        {sendSuccess ? time + 's' : '获取验证码'}
      </Button>;

    return (
      <div>
        <List>
          <InputItem
            // type="phone"
            style={{ color: '#595959' }}
            clear
            placeholder="请输入手机号"
            value={this.state.mobile}
            error={this.state.phoneError}
            onErrorClick={this.onErrorClick}
            onChange={mobile => {

              if (!(/^1[34578]\d{9}$/.test(mobile))) {
                this.setState({
                  phoneError: true,
                  toastMessage: '请输入正确的手机号',
                });
              } else {
                this.setState({
                  phoneError: false,
                  toastMessage: '',
                });
              }
              this.setState({
                mobile,
              });
            }}
          >
            <span style={{ color: '#595959', fontSize: '14px' }}>手机号</span>
          </InputItem>

          <InputItem
            type="number"
            clear
            value={this.state.inputSmsCode}
            placeholder="请输入验证码"
            error={this.state.smsCodeError}
            onChange={inputSmsCode => {

              this.setState({
                inputSmsCode,
              });
            }}
            extra={extraEle}
          >
            <span style={{ color: '#595959', fontSize: '14px' }}>验证码</span>
          </InputItem>
        </List>

        <Row style={{ textAlign: 'center' }}>
          <Col span="20" offset="2">
            <Button
              block
              type="default"
              style={{ marginTop: 30, color: '#595959' }}
              size="large"
              onClick={this.loginSubmit}
            >
              登录
            </Button>
          </Col>
        </Row>

      </div>
    );
  }
}

export default LoginInput;
