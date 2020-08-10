import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import BScroll from 'better-scroll'
import { MdCompareArrows } from "react-icons/md"
import { BlockMath, InlineMath } from 'react-katex'
import RemarkMathPlugin from "remark-math"

import CodeBlock from './markdown/CodeBlock'
import InlineCode from './markdown/InlineCode'

function toggleScrollBar(scrollContainerRef, toggle, isTransition=true) {
  if (scrollContainerRef.current) {
    scrollContainerRef.current.querySelector('.bscroll-vertical-scrollbar').style.opacity = toggle ? 1 : 0;
    if (isTransition) {
      scrollContainerRef.current.querySelector('.bscroll-vertical-scrollbar').style.transitionDuration = '500ms';
    }
  }
}

function fixImageHeight(images) {
  const rowHeight = 50;
  const containerHeight = images.naturalHeight;
  const containerRowCount = window.Math.ceil(containerHeight / rowHeight);

  return window.Math.floor(containerRowCount * rowHeight) + 'px';
}

function recalculateImageHeight(scrollContainerRef, scroll) {
  const originImages = scrollContainerRef.current.querySelectorAll('img')
  const newImageLoadPromise = []
  const loadHandle = (evt, resolve, index, newImage) => {
    resolve({
      image: newImage,
      height: fixImageHeight(newImage),
      width: newImage.naturalWidth + 'px',
      index
    })
  }

  originImages.forEach((image, index) => {
    newImageLoadPromise.push(new Promise(resolve => {
      let newImage = new window.Image()
      newImage.addEventListener('load', (evt) => loadHandle(evt, resolve, index, newImage))
      newImage.alt = image.alt
      newImage.title = image.title
      newImage.src = image.src
    }))
  })

  Promise.all(newImageLoadPromise).then((imageOffSetHeight) => {
    imageOffSetHeight.forEach(fixImageInfo => {
      fixImageInfo.image.removeEventListener('load', loadHandle)
      originImages[fixImageInfo.index].style.height = '450px'
      originImages[fixImageInfo.index].style.width = 'auto'
      originImages[fixImageInfo.index].style.display = 'block'
      originImages[fixImageInfo.index].style.opacity = '1'
      originImages[fixImageInfo.index].style.margin = '0 auto'
      originImages[fixImageInfo.index].style.border = '0.3em solid #fff'
    });
  }).finally(() => {
    if (scroll) {
      scroll.refresh()
    }
  })
}

function handleArticleMouseEnter(scrollContainerRef) {
  toggleScrollBar(scrollContainerRef, true)
}

function handleArticleMouseLeave(scrollContainerRef) {
  toggleScrollBar(scrollContainerRef, false)
}

const postContent = ({ post }) => {
  let scrollContainerRef = React.createRef()
  let scroll = null

  useEffect(() => {
    if (post) {
      scroll = new BScroll(scrollContainerRef.current, {
        mouseWheel: true,
        scrollbar: {
          fade: false,
          interactive: true
        },
        bounce: false,
        bindToWrapper: true,
        preventDefault: false
      })
    }

    if (scrollContainerRef && scrollContainerRef.current) {
      recalculateImageHeight(scrollContainerRef, scroll)
    }

    return () => {
      if (scroll) {
        scroll.destroy();
      }
    }
  })

  return (
    <div className={`article`}>
      <span className='wrapper-expand'><MdCompareArrows /></span>
      <div className={`wrapper`} ref={scrollContainerRef} onMouseEnter={() => handleArticleMouseEnter(scrollContainerRef)} onMouseLeave={() => handleArticleMouseLeave(scrollContainerRef)}>
        {
          <div className="container" >
            {
              post ? (
                <div className="content" >
                  <div className='md-content' >
                    <h1 style={{ textAlign: 'center' }}>{post.title}</h1>
                    <ReactMarkdown
                      source={post.content}
                      escapeHtml={true}
                      linkTarget='_blank'
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
              ) : null
            }
          </div>
        }
      </div>

      <style jsx>{`
        .article {
          position: relative;
          flex: 61;
          height: 100%;

          .wrapper-expand {
            color: #b4a08e;
            position: absolute;
            top: 8px;
            right: 5px;
            z-index: 10;
            font-size: 1.8em;
          }

          .wrapper-expand:hover {
            color: #645647;
            cursor: pointer;
          }
        }

        .wrapper {
          height: 100%;
          position: relative;
        }

        .detail-height {
          height: auto;
        }

        .container {
          background: #FFFCF7 url(/img/grid.jpg) left top;
        }

        .content {
          min-height: 95vh;
          overflow: hidden;
          padding: 0 30px 0px 50px;
          color: #645647;
          line-height: 50px;
          font-size: 17px;
          background: url(/img/note_detail_edge.jpg) repeat-y;
        }

        .md-content {
          white-space: normal;
          word-break: break-all;
          transition: opacity .3s ease-out;
          text-align: justify;
        }

        .md-content:after {
          display: block;
          content: ' ';
          height: 150px;
        }

        /* --- markdown 样式 --- */

        /* h1 ~ h6 */
        .md-content :global(h1) {
          font-size: 27px;
          font-weight: 400;
          color: #645647;
          line-height: 50px;
          margin: 0;
          word-break: break-all;
        }

        .md-content :global(h2) {
          font-size: 25px;
          font-weight: 400;
          color: #645647;
          line-height: 50px;
          margin: 0;
          word-break: break-all;
        }

        .md-content :global(h3) {
          font-size: 23px;
          font-weight: 400;
          color: #645647;
          line-height: 50px;
          margin: 0;
          word-break: break-all;
        }

        .md-content :global(h4) {
          font-size: 23px;
          font-weight: 400;
          color: #645647;
          line-height: 50px;
          margin: 0;
          word-break: break-all;
        }

        .md-content :global(h5) {
          font-size: 23px;
          font-weight: 400;
          color: #645647;
          line-height: 50px;
          margin: 0;
          word-break: break-all;
        }

        .md-content :global(h6) {
          font-size: 23px;
          font-weight: 400;
          color: #645647;
          line-height: 50px;
          margin: 0;
          word-break: break-all;
        }

        /* strong */
        .md-content :global(strong) {
          font-weight: 700;
        }

        /* blockquote */
        .md-content :global(blockquote) {
          font-size: 20px;
          line-height: 50px;
          margin: 0;
          padding-left: 38px;
          position: relative;
          min-height: 50px;
          word-break: break-all;
          color: #b4a08e;
          background-size: 13px;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4MTE5MThmNC1lYjM0LTRmMTAtOThlMS0wNGU5NTczZTVkOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTk1NTJCQzE4NTRGMTFFNkJCNjdCRTNENzMyQzJFNTkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTk1NTJCQzA4NTRGMTFFNkJCNjdCRTNENzMyQzJFNTkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQzMTkyM2NmLTYyZWEtNDAwNS1iNDg2LTdhYjllNDQ0MjM5OSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjkzOTdhMDhkLWE2NjUtMTE3OS1hZWYxLWE1MjY4MTQ3ZGEyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkOrP8kAAADUSURBVHjaYiwJ02CgJmCiUB4dsLDgMEQYirmA+BwBQ5iBWAyIhYCYA91AXiBWAGI2Il0kAMRyQMwKdyKSpBDUMEYiDQO5ShZXGHGTaBgvNsOQXYjNsF9A/AKLHkaoenTwE6QeZKAgKDDRJD8D8V0g/otFoxCWMP4IxPeA+B8T1EBk8Bcq+ReHd4XQ+H+A+D7IMFgY8qApeA9VhAtwYVH/FzlS0JPOFwIJHa96FiyR8Q+aWJGDADlCGPCpx5ZTlND4ZwkkIWVK8irFhcOogcPBQIAAAwA1ph0Za5PfQwAAAABJRU5ErkJggg==);
          background-repeat: no-repeat;
          background-position: 0 10px;
        }

        .md-content :global(blockquote):after {
          width: 1.5px;
          top: 0;
          bottom: 0;
          left: 25px;
          background-color: transparent;
          border: 1px solid #dfd6c5;
          border-top: 0;
          border-bottom: 0;
          position: absolute;
          content: ' ';
          overflow: hidden;
        }

        /* ul, ol */
        .md-content :global(ul) {
          margin-left: 21px;
          line-height: 50px;
          min-height: 50px;
          text-indent: 18px;
          position: relative;
          list-style: none;
          word-break: break-all;
          font-size: 21px;
        }

        .md-content :global(ul li) {
          position: relative;
        }

        .md-content :global(ul li):after {
          content: '.';
          width: 8px;
          position: absolute;
          top: 20px;
          height: 8px;
          background: #dfd6c5;
          overflow: hidden;
          left: 1px;
          border-radius: 4px;
        }

        .md-content :global(ol) {
          margin-left: 21px;
          line-height: 50px;
          min-height: 50px;
          text-indent: 18px;
          position: relative;
          list-style: none;
          word-break: break-all;
          font-size: 21px;
        }

        .md-content :global(ol li) {
          position: relative;
        }

        .md-content :global(ol li):after {
          content: '.';
          width: 8px;
          position: absolute;
          top: 20px;
          height: 8px;
          background: #dfd6c5;
          overflow: hidden;
          left: 1px;
          border-radius: 4px;
        }

        .md-content :global(a) {
          color: #b4a08e;
          text-decoration: none;
        }

        .md-content :global(a):hover {
          color: #645647;
        }

        /* table */
        .md-content :global(table) {
          width: 100%;
          margin: 50px 0;
          border-spacing: 0px;
          box-sizing: border-box;
          border-collapse:collapse;
        }

        .md-content :global(table tr th) {
          border: 1px solid #ece6df;
          border-top: none;
          border-bottom: none;
        }

        .md-content :global(table tr td) {
          border: 1px solid #ece6df;
          border-top: none;
          border-bottom: none;
        }

        .md-content :global(hr) {
          display: none;
        }

        /* image */
        .md-content :global(img) {
          max-width: 100%;
          width: 300px;
          height: 300px;
          opacity: 0;
          vertical-align: top;
          background-color: #fff;
          box-shadow: 0 1px 4px rgba(58,15,0,.2);
          box-sizing: border-box;
          transition: opacity .3s ease-out;
        }

        .md-content :global(code.inline) {
          display: inline-block;
          background-color: #b4a08e;
          color: #fff;
          margin: 0 0.2em;
          border-radius: 4px;
          padding: 0em 0.4em;
          height: 30px;
          line-height: 30px;
        }

        /* 空行处理 */
        .md-content :global(p) {
          margin-bottom: 50px;
        }

        .md-content :global(blockquote p) {
          margin-bottom: 0px;
        }

        .md-content :global(p+.code-container) {
          margin-top: -50px;
        }

        .md-content :global(p+ul) {
          margin-top: -50px;
        }

        .md-content :global(p+ol) {
          margin-top: -50px;
        }

        /* math */
        .md-content :global(.katex-display) {
          padding-bottom: 49px;
          margin-bottom: 0px;
        }
    `}</style>
    </div>
  )
}

export default postContent