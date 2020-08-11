import React from 'react'
import { withRouter } from 'next/router'
import MainLayout from '../components/layout/main-layout'
import HeaderLayout from '../components/layout/header-layout'
import DynamicUnderline from '../components/dynamic-underline'

class Error extends React.Component {
  onGoBackIndexClickHandle = () => {
    this.props.router.replace('/');
  };

  render() {
    return (
      <MainLayout>
        <HeaderLayout>
          <h1 className="err-title">错误</h1>
        </HeaderLayout>

        <div className="container">
          <div className="wrapper">
            <p>Balls,&nbsp;发生404错误了，回<span onClick={this.onGoBackIndexClickHandle} className='link'>首页</span>吧&nbsp;<DynamicUnderline /></p>
          </div>
        </div>

        <style jsx>{`
          .err-title {
            height: 6vh;
            line-height: 6vh;
            text-align: center;
            color: #fff;
            font-size: 4vw;
            font-weight: 600;
          }

          .container {
            width: 100%;
            height: 100%;

            .wrapper {
              margin: 4vw;
              padding: 5vw;
              background: #fffcf6;
              font-size: 5vw;
              box-shadow: 0 3px 8px rgba(69,18,10,.4);

              .link {
                color: #b4a08e;
                text-decoration: none;
              }
            }
          }
        `}</style>
      </MainLayout>
    )
  }
}

export default withRouter(Error)
