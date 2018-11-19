import React, { PureComponent } from 'react';
import { Button } from 'antd-mobile';
import router from 'umi/router';

class Welcome extends React.PureComponent {
  welcome = () => {
    router.push('/login');
  };

  render() {
    return (
      <div className="welcome-container">
        <div className="welcome-float">
          <Button
            type="primary"
            onClick={this.welcome}
            className="enter-btn"
            style={{ borderRadius: '30px', textAlign: 'center', fontSize: '16px' }}
          >
            立即体验触达号
          </Button>
          <p style={{ marginTop: '15px', color: '#595959' }}>触及用户 ∙ 无处不达</p>
        </div>
      </div>
    );
  }
}

export default Welcome;
