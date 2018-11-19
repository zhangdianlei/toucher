import React, { PureComponent } from 'react';
import { connect } from 'dva';
import LoginInput from '@/components/LoginInput';

@connect(({ loginModel }) => ({
  loginModel,
}))
class Login extends PureComponent {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { route } = this.props;
    console.log('loginModel', route.loginModel);

    return (
      <div style={{ backgroundColor:"white", height:"100%" }}>
        <div style={{ height: 200, textAlign: 'center' }}>
          <div>
            <img
              style={{ marginTop: 30 }}
              src="https://ws4.sinaimg.cn/large/006tNbRwly1fx6jyiybgzj307c07g0sv.jpg"
              height="90px"
              alt=""
            />
          </div>
          <div style={{ marginTop: 20, color: 'gray' }}>
            <span>触及用户 无处不达</span>
          </div>
        </div>
        <LoginInput />
      </div>
    );
  }
}

export default Login;
