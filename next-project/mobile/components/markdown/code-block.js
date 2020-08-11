import React, { useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/styles/prism'
import BScroll from 'better-scroll'

const codeBlock = ({ language, value }) => {
  const wrapperRef = React.createRef()
  let scroll = null

  useEffect(() => {
    scroll = new BScroll(wrapperRef.current.querySelector('.syntax-high-lighter-container'), {
      scrollY: false,
      scrollX: true,
      scrollbar: {
        fade: true,
        interactive: true
      },
      bounce: false,
      bindToWrapper: true,
    })

    return () => {
      if (scroll) {
        scroll.destroy()
      }
    }
  })

  return (
    <div className='container code-container' ref={wrapperRef}>
      <div className='wrapper'>
        <SyntaxHighlighter
          className='syntax-high-lighter-container'
          wrapLines={ true }
          language={ language }
          style={ dark }
          customStyle={{
            margin: '0',
            overflow: 'hidden',
            position: 'relative',
            flex: 1,
            border: 'none',
            boxShadow: '0 3px 8px rgba(69,18,10,.4)',
            fontSize: '16px',

            padding: 0,
          }}
          codeTagProps={{
            style: {
              display: 'inline-block',
              padding: '1em'
            }
          }}
        >{value}
        </SyntaxHighlighter>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          position: relative;
          align-items:center;
          margin: 2vh auto;
        }

        .wrapper {
          display: flex;
          width: 100%;
          position: relative;
          align-items: center;
          border-radius: 0.5em;
          box-shadow: 0 0 2px rgba(126,50,0,.1) inset, 0 1px 4px rgba(58,15,0,.2);
        }
      `}</style>
    </div>
  )
}

export default codeBlock
