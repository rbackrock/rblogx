const aboutContainer = ({ children }) => {
  return (
    <>
      <div className="wrapper">
      <div className="note-border">
        <div className="w-top"></div>
        <div className="w-right"></div>
        <div className="w-bottom"></div>
        <div className="w-left"></div>
        <div className="content">
          {children}
        </div>
      </div>
      <div className="via"><span className='tips left'>本博客样式完全参照于锤子便签</span><span className='tips right'>滇ICP备18008965号-1</span></div>
    </div>

    <style jsx>{`
      .wrapper {
        position: relative;
        width: 45%;
        font-size: 17px;
        color: #645647;
        background: #fffcf6;
        border-top: 1px solid #fffcf6;
        font-family: 'PingFang SC',Helvetica,ST-Heiti,'Microsoft Yahei';
        border-radius: 4px;
        box-shadow: 0 3px 8px rgba(69,18,10,.4);
      }

      .note-border {
        position: relative;
        border: 2px solid #e9e5d9;
        padding: 2px;
        margin: 33px 19px 0 19px;
      }

      .w-top {
        top: -6px;
        left: -6px;
      }

      .w-right {
        top: -6px;
        right: -6px;
      }

      .w-bottom {
        bottom: -6px;
        right: -6px;
      }

      .w-left {
        bottom: -6px;
        left: -6px;
      }

      .w-top,
      .w-right,
      .w-bottom,
      .w-left {
        width: 2px;
        height: 2px;
        border: 2px solid #e9e5d9;
        position: absolute;
      }

      .content {
        position: relative;
        line-height: 25px;
        border: 2px solid #e9e5d9;
        padding: 38px 39px 20px 40px;
      }

      .via {
        margin: 10px 19px 15px 19px;
        padding: 0 15px 0 15px;
        height: 24px;
        line-height: 24px;
        font-size: 16px;
        color: #ded8c5;
      }

      .via:after {
        content: ' ';
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;
        clear: both;
      }

      .via .tips {
        display: inline-block;
      }

      .via .tips.left {
        float: left;
      }

      .via .tips.right {
        float: right;
      }

      .motto {
        height: 24px;
        line-height: 24px;
        font-size: 26px;
        font-weight: bold;
        opacity: 1;
        -webkit-animation: blink 0.9s infinite;
        -moz-animation: blink 0.9s infinite;
        animation: blink 0.9s infinite;
      }

      @keyframes blink {
        0% { opacity:1; }
        50% { opacity:0; }
        100% { opacity:1; }
      }

      @-webkit-keyframes blink {
        0% { opacity:1; }
        50% { opacity:0; }
        100% { opacity:1; }
      }

      @-moz-keyframes blink {
        0% { opacity:1; }
        50% { opacity:0; }
        100% { opacity:1; }
      }
    `}</style>
    </>
  )
}

export default aboutContainer
