import React from 'react'
import { withRouter } from 'next/router'
import PaperContainer from '../components/paper-container';
import DynamicUnderline from '../components/dynamic-underline';

class Error extends React.Component {
  onGoBackIndexClickHandle = () => {
    this.props.router.replace('/');
  };

  render() {
    return (
      <div className="container">
        <PaperContainer>
          <p>Balls,&nbsp;发生404错误了，回<span onClick={this.onGoBackIndexClickHandle} className='link'>首页</span>吧<DynamicUnderline /></p>
          <br/>
        </PaperContainer>

        <style jsx>{`
          .container {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 100%;
            height: 100%;
          }

          .link {
            color: #b4a08e;
            cursor: pointer;
            text-decoration: none;
          }

          .link:hover {
            color: #645647;
          }
        `}</style>
      </div>
    )
  }
}

export default withRouter(Error)
