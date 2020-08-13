import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import BScroll from 'better-scroll'
import moment from 'moment';

function toggleScrollBar(scrollContainerRef, toggle, isTransition=true) {
  if (scrollContainerRef.current) {
    scrollContainerRef.current.querySelector('.bscroll-vertical-scrollbar').style.opacity = toggle ? 1 : 0;
    if (isTransition) {
      scrollContainerRef.current.querySelector('.bscroll-vertical-scrollbar').style.transitionDuration = '500ms';
    }
  }
}

function handlePostsMouseEnter(scrollContainerRef) {
  toggleScrollBar(scrollContainerRef, true)
}

function handlePostsMouseLeave(scrollContainerRef) {
  toggleScrollBar(scrollContainerRef, false)
}

const posts = ({ category, posts }) => {
  const scrollContainerRef = React.createRef();
  let scroll = null;

  useEffect(() => {
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

    return () => {
      if (scroll) {
        scroll.destroy();
      }
    }
  })

  return (
    <div className='article-list' ref={scrollContainerRef} onMouseEnter={() => handlePostsMouseEnter(scrollContainerRef)} onMouseLeave={() => handlePostsMouseLeave(scrollContainerRef)}>
      {
        <ul className='list-wrapper'>
          {
            posts ? ((
              posts.map((post, index) => (
                <li className={`item`} key={index}>
                  {
                    <Link key={post.title} as={`/p/${post.name}?category=${category}`} href="/p/[post]">
                      <div className="article-info" >
                        <div className="date">{moment(post.date).format('YYYY年MM月DD日')}</div>
                        <div className="title">{post.title}</div>
                      </div>
                    </Link>
                  }
                </li>
              ))
            )) : <li className='no-article'>该分类下没有文章</li>
          }
        </ul>
      }

      <style jsx>{`
        .article-list {
          position: relative;
          flex: 62;
          ouch-action: none;
          overflow: hidden!important;
          border-right: 1px solid #dcd6ca;
        }

        .list-wrapper {
          position: relative;
          min-height: 100%;
        }

        .no-article {
          width: 100%;
          top: 50%;
          position: absolute;
          color: #B9A691;
          text-align: center;
        }

        .item {
          height: 49px;
          border-bottom: 1px #e4dad1 solid;
          position: relative;
        }

        .item:hover {
          background: #f1ece1;
          box-shadow: 0 1px 4px rgba(0,0,0,.03) inset;
        }

        .on-item {
          background: #f1ece1;
          box-shadow: 0 1px 4px rgba(0,0,0,.03) inset;
        }

        .article-info {
          height: 49px;
          border-bottom: 1px #e4dad1 solid;
          position: relative;
        }

        .article-info .date {
          height: 20px;
          line-height: 20px;
          padding-left: 20px;
          padding-top: 4px;
          color: #b9a691;
          font-size: 12px;
        }

        .article-info .title {
          line-height: 20px;
          height: 20px;
          padding-right: 20px;
          padding-left: 20px;
          overflow: hidden;
          cursor: default;
          font-size: 14px;
          color: #635753;
          word-break: break-all;
          word-wrap: break-word;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        `}</style>
    </div>
  )
}

export default posts
