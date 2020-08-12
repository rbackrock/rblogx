import MainLayout from '../components/layout/main-layout'
import PaperContainer from '../components/paper-container'

const about = () => {
  return (
    <MainLayout>
      <div className="container">
        <PaperContainer>
          <p>大家好，我是回滚滚</p><br/>
          <p>喜欢计算机，愿望之一是可以撸代码撸到老</p><br/>
          <p>如果你喜欢本博客，欢迎使用和 Fork 项目，源代码<a className='link' target="_black" href="https://github.com/rbackrock/rblogx">点这里</a></p><br/>
          <p>感谢你的访问</p><br/>
        </PaperContainer>
      </div>

      <style jsx>{`
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 100%;
        height: 95%;
      }

      .link {
        color: #b4a08e;
        text-decoration: none;
      }

      .link:hover {
        color: #645647;
      }
    `}</style>
    </MainLayout>
  )
}

export default about