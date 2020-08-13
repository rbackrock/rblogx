import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import BScroll from 'better-scroll'

function toggleScrollBar(scrollContainerRef, toggle, isTransition=true) {
  if (scrollContainerRef.current) {
    scrollContainerRef.current.querySelector('.bscroll-vertical-scrollbar').style.opacity = toggle ? 1 : 0;
    if (isTransition) {
      scrollContainerRef.current.querySelector('.bscroll-vertical-scrollbar').style.transitionDuration = '500ms';
    }
  }
}

function handleCategoriesMouseEnter(scrollContainerRef) {
  toggleScrollBar(scrollContainerRef, true)
}

function handleCategoriesMouseLeave(scrollContainerRef) {
  toggleScrollBar(scrollContainerRef, false)
}

function onCategoryItemStyle(router, category, index) {
  const onItemClassName = 'on-item'
  const routerQuery = router.query

  if (Object.keys(routerQuery).length > 0) {
    if (routerQuery.hasOwnProperty('category')) {
      if (decodeURI(routerQuery.category) === category) {
        return onItemClassName
      }
    } else if (routerQuery.hasOwnProperty('slug') && routerQuery.slug.length === 2) {
      if (routerQuery.slug[0] === category) {
        return onItemClassName
      }
    }
  } else {
    if (index === 0) {
      return onItemClassName
    }
  }

  return ''
}

const categories = ({ categories, category, post }) => {
  const router = useRouter()
  const scrollContainerRef = React.createRef()
  let scroll = null

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
    <div className='category' ref={scrollContainerRef} onMouseEnter={() => handleCategoriesMouseEnter(scrollContainerRef)} onMouseLeave={() => handleCategoriesMouseLeave(scrollContainerRef)}>
      {
        categories ? (
          <ul className='list-wrapper'>
            {
              categories.map((currentCategory, index) => (
                <li className={`item ${onCategoryItemStyle(router, currentCategory, index)}`} key={index}>
                  <Link as={`/category/${currentCategory}`} href="/category/[category]" >
                    <div className='category-info'>
                      <div className="name">{currentCategory}</div>
                      {/* <div className="num">{currentCategory.category_num}</div> */}
                    </div>
                  </Link>
                </li>
              ))
            }
          </ul>
        ) : null
      }

      <style jsx>{`
        .category {
          position: relative;
          flex: 38;
          ouch-action: none;
          overflow: hidden!important;
          border-right: 1px solid #dcd6ca;
        }

        .list-wrapper {
          position: relative;
        }

        .item {
          height: 49px;
          border-bottom: 1px #e4dad1 solid;
          position: relative;
        }

        .item:after {
          content: '';
          display: block;
          width: 0;
          visibility: hidden;
        }

        .item:hover {
          background: #f1ece1;
          box-shadow: 0 1px 4px rgba(0,0,0,.03) inset;
        }

        .on-item {
          background: #f1ece1;
          box-shadow: 0 1px 4px rgba(0,0,0,.03) inset;
        }

        .category-info {
          margin-left: 15px;
          margin-right: 15px;
          height: 49px;
          line-height: 49px;
          color: #635752;
        }

        .category-info .name {
          display: inline-block;
          position: relative;
          height: 30px;
          line-height: 30px;
          margin-top: 10px;
          max-width: 80%;
          overflow: hidden;
          vertical-align: top;
          font-size: 14px;
          color: #635753;
          white-space: nowrap;
          text-overflow: ellipsis;
          cursor: default;
        }

        .category-info .num {
          float: right;
          color: #b8a692;
          min-width: 30px;
          text-align: right;
          opacity: 1;
          transition: all .3s ease;
        }
      `}</style>
    </div>
  )
}

export default categories