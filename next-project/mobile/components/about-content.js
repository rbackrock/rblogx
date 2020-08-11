import { useEffect } from 'react'
import BScroll from 'better-scroll'

const aboutContent = () => {
  const scrollWrapperRef = React.createRef()
  let scroll = null
  
  useEffect(() => {
    scroll = new BScroll(scrollWrapperRef.current, {
      bindToWrapper: true,
      click: true,
    })

    return () => {
      if (scroll) {
        scroll.destroy()
      }
    }
  })

  return (
    <div className="container" ref={scrollWrapperRef}>
      <div className="content">
        <p>大家好，我是回滚滚</p><br/>
        <p>喜欢计算机，愿望之一是可以撸代码撸到老</p><br/>
        <p>如果你喜欢本博客，欢迎使用和 Fork 项目，源代码<a className='link' target="_black" href="https://github.com/rbackrock/rblog">点这里</a></p><br/>
        <p>感谢你的访问</p><br/>
        <p style={{ textAlign: 'center', color: 'rgb(222, 216, 197)', fontSize: '3.9vw' }}>博客样式完全参照于锤子便签</p>
      </div>

      <style jsx>{`
        .container {
          height: 94vh;
          background-color: #fffcf6;
          padding: 0 6vw;
          font-size: 4.3vw;
          line-height: 4vh;
          overflow: hidden;
          word-break: break-word!important;
          font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;

          .content {
            padding: 3vh 0;
          }

          .content .link {
            color: #b4a08e;
            text-decoration: none;
          }
        }
      `}</style>
    </div>
  )
}

export default aboutContent
