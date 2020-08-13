import { useEffect } from 'react'
import BScroll from 'better-scroll'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './markdown/code-block'
import InlineCode from './markdown/inline-code'
import moment from 'moment'
import ContentLayout from './layout/content-layout'
import RemarkMathPlugin from 'remark-math'

function recalculateImageHeight(scrollWrapperRef, scroll) {
  const originImages = scrollWrapperRef.current.querySelectorAll('img')
  const newImageLoadPromise = []
  const loadHandle = (evt, resolve, index, newImage) => {
    resolve({
      image: newImage,
      index
    })
  }

  originImages.forEach((image, index) => {
    newImageLoadPromise.push(new Promise((resolve, reject) => {
      let newImage = new window.Image()
      newImage.addEventListener('load', (evt) => loadHandle(evt, resolve, index, newImage))
      newImage.alt = image.alt
      newImage.title = image.title
      newImage.src = image.src
    }))
  })

  Promise.all(newImageLoadPromise).then(imageOffSetHeight => {
    imageOffSetHeight.forEach(fixImageInfo => {
      fixImageInfo.image.removeEventListener('load', loadHandle)
      originImages[fixImageInfo.index].style.height = '30vh'
      originImages[fixImageInfo.index].style.width = 'auto'
      originImages[fixImageInfo.index].style.display = 'block'
      originImages[fixImageInfo.index].style.opacity = '1'
      originImages[fixImageInfo.index].style.margin = '4vh auto'
      originImages[fixImageInfo.index].style.border = '0.3em solid #fff'
    })
  }).finally(() => {
    if (scroll) {
      scroll.refresh()
    }
  })
}

const postContent = ({ post }) => {
  const wrapperRef = React.createRef()
  const scrollWrapperRef = React.createRef()
  let scroll = null

  useEffect(() => {
    scroll = new BScroll(scrollWrapperRef.current, {
      bindToWrapper: true,
      click: true,
    })

    if (wrapperRef.current) {
      wrapperRef.current.style.opacity = '1'
    }

    recalculateImageHeight(scrollWrapperRef, scroll)

    return () => {
      if (scroll) {
        scroll.destroy()
      }
    }
  })

  return (
    <ContentLayout>
      <div className="container" >
        <div className="wrapper" ref={wrapperRef}>
          <div className="scroll-wrapper" ref={scrollWrapperRef}>
            {
              post ? (
                <div className="content">
                  <div className="md-content">
                    <h1 style={{ textAlign: 'center' }}>{post.title}</h1>
                    <p style={{ textAlign: 'right', fontSize: '3vw', overflow: 'hidden', maxHeight: '4vh', padding: '1vh 0', margin: '0' }}>{moment(post.date).format('YYYY年MM月DD日')}</p>
                    <ReactMarkdown
                      source={post.content}
                      escapeHtml={true}
                      renderers={{
                        code: CodeBlock,
                        inlineCode: InlineCode,
                        math: (props) => (
                          <BlockMath>{props.value}</BlockMath>
                        ),
                        inlineMath: (props) => (
                          <InlineMath>{props.value}</InlineMath>
                        )
                      }}

                      plugins={
                        [
                          RemarkMathPlugin
                        ]
                      }
                    />
                  </div>
                </div>
              ) : <div className="no-content"></div>
            }
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          height: 100%;
          position: relative;
          background-color: #fffcf6;

          .wrapper {
            height: 100%;
            opacity: 0;
            transition: opacity .3s ease-out;
          }

          .scroll-wrapper {
            height: 100%;
            overflow: hidden;
          }

          .content {
            padding: 2vh 6vw;
            font-size: 4.3vw;
            line-height: 4vh;
            word-break: break-word!important;
            white-space: normal;
            word-break: break-all;
            font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;

            .md-content {
              text-align: justify;
            }

            /* Markdown 样式 */
            .md-content :global(h1) {
              font-size: 6.5vw;
              font-weight: 600;
            }

            .md-content :global(h2) {
              font-size: 6vw;
              font-weight: 600;
            }

            .md-content :global(h3) {
              font-size: 5.5vw;
              font-weight: 600;
            }

            .md-content :global(h4) {
              font-size: 5vw;
              font-weight: 600;
            }

            .md-content :global(h5) {
              font-size: 5vw;
              font-weight: 600;
            }

            .md-content :global(h6) {
              font-size: 5vw;
              font-weight: 600;
            }

            .md-content :global(blockquote) {
              margin: 0;
              padding-left: 12vw;
              position: relative;
              word-break: break-all;
              color: #b4a08e;
              background-size: 3.8vw;
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4MTE5MThmNC1lYjM0LTRmMTAtOThlMS0wNGU5NTczZTVkOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTk1NTJCQzE4NTRGMTFFNkJCNjdCRTNENzMyQzJFNTkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTk1NTJCQzA4NTRGMTFFNkJCNjdCRTNENzMyQzJFNTkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQzMTkyM2NmLTYyZWEtNDAwNS1iNDg2LTdhYjllNDQ0MjM5OSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjkzOTdhMDhkLWE2NjUtMTE3OS1hZWYxLWE1MjY4MTQ3ZGEyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkOrP8kAAADUSURBVHjaYiwJ02CgJmCiUB4dsLDgMEQYirmA+BwBQ5iBWAyIhYCYA91AXiBWAGI2Il0kAMRyQMwKdyKSpBDUMEYiDQO5ShZXGHGTaBgvNsOQXYjNsF9A/AKLHkaoenTwE6QeZKAgKDDRJD8D8V0g/otFoxCWMP4IxPeA+B8T1EBk8Bcq+ReHd4XQ+H+A+D7IMFgY8qApeA9VhAtwYVH/FzlS0JPOFwIJHa96FiyR8Q+aWJGDADlCGPCpx5ZTlND4ZwkkIWVK8irFhcOogcPBQIAAAwA1ph0Za5PfQwAAAABJRU5ErkJggg==);
              background-repeat: no-repeat;
              background-position: 0 0.4vh;
            }

            .md-content :global(blockquote):after {
              width: 0.6vw;
              top: 0;
              bottom: 0;
              left: 7vw;
              background-color: transparent;
              border: 1px solid #dfd6c5;
              border-top: 0;
              border-bottom: 0;
              position: absolute;
              content: ' ';
              overflow: hidden;
            }

            .md-content :global(strong) {
              font-weight: 700;
            }

            /* 有序，无序列表 */
            .md-content :global(ul) {
              line-height: 4vh;
              min-height: 4vh;
              text-indent: 6vw;
              position: relative;
              list-style: none;
              word-break: break-all;
              font-size: 5vw;
            }

            .md-content :global(ul li) {
              position: relative;
            }

            .md-content :global(ul li):after {
              content: '.';
              width: 8px;
              position: absolute;
              top: 1.2vh;
              height: 8px;
              background: #dfd6c5;
              overflow: hidden;
              left: 1vw;
              border-radius: 50%;
            }

            .md-content :global(ol) {
              line-height: 4vh;
              min-height: 4vh;
              text-indent: 6vw;
              position: relative;
              list-style: none;
              word-break: break-all;
              font-size: 5vw;
            }

            .md-content :global(ol li) {
              position: relative;
            }

            .md-content :global(ol li):after {
              content: '.';
              width: 8px;
              position: absolute;
              top: 1.2vh;
              height: 8px;
              background: #dfd6c5;
              overflow: hidden;
              left: 1vw;
              border-radius: 50%;
            }

            .md-content :global(a) {
              color: #b4a08e;
              text-decoration: none;
            }

            .md-content :global(hr) {
              display: none;
            }

            /* 表格 */
            .md-content :global(table) {
              width: 100%;
              margin: 4vh 0;
              border-spacing: 0px;
              box-sizing: border-box;
              border-collapse:collapse;
            }

            .md-content :global(table tr th) {
              border: 1vw solid #ece6df;
            }

            .md-content :global(table tr td) {
              border: 1vw solid #ece6df;
            }

            .md-content :global(img) {
              max-width: 100%;
              width: auto;
              height: 30vh;
              opacity: 0;
              vertical-align: top;
              background-color: #fff;
              box-shadow: 0 1px 4px rgba(58,15,0,.2);
              box-sizing: border-box;
              transition: opacity .3s ease-out;
            }

            .md-content :global(code.inline) {
              display: inline-block;
              background-color: rgba(180, 160, 142, 0.13);
              color: #645647;
              margin: 0.2em 0.2em;
              border-radius: 4px;
              padding: 0em 0.4em;
            }

            /* 空行处理 */
            .md-content :global(p) {
              margin-bottom: 4vh;
            }

            .md-content :global(blockquote p) {
              margin-bottom: 0px;
            }

            .md-content :global(p+.code-container) {
              margin-top: -4vh;
            }

            .md-content :global(p+ul) {
              margin-top: -4vh;
            }

            .md-content :global(p+ol) {
              margin-top: -4vh;
            }
          }
        }
      `}</style>
    </ContentLayout>
  )
}

export default postContent