import { useEffect } from 'react'
import Link from 'next/link'
import HeaderLayout from './layout/header-layout'
import { GoTriangleDown } from 'react-icons/go'
import { FaCaretUp, FaCheck } from 'react-icons/fa'
import BScroll from 'better-scroll'

function isShowCategoryListStyle(isShow, maskRef, categoryListRef, scroll) {
  maskRef.current.style.display = isShow ? 'block' : 'none'
  if (isShow) {
    categoryListRef.current.style.display = 'block'
    scroll.refresh()
    window.setTimeout(() => {
      categoryListRef.current.style.opacity = '1'
    }, 333)
  } else {
    categoryListRef.current.style.opacity = '0'
    window.setTimeout(() => {
      categoryListRef.current.style.display = 'none'
      scroll.refresh()
    }, 333)
  }
}

function isShowCategoryListHandle(evt, maskRef, categoryListRef, scroll) {
  isShowCategoryListStyle(true, maskRef, categoryListRef, scroll)
}

const header = ({ categories, currentCategory }) => {
  const categoryListRef = React.createRef()
  const maskRef = React.createRef()

  const scrollContainerRef = React.createRef()
  let scroll = null

  useEffect(() => {
    scroll = new BScroll(scrollContainerRef.current, {
      bindToWrapper: true,
      click: true
    })

    isShowCategoryListStyle(false, maskRef, categoryListRef, scroll)

    return () => {
      if (scroll) {
        scroll.destroy()
      }
    }
  })

  return (
    <HeaderLayout>
      <div className="container">
        <div className="title" onClick={evt => isShowCategoryListHandle(evt, maskRef, categoryListRef, scroll)}>
          <h1 className='text'>{currentCategory ? currentCategory : categories[0]}<GoTriangleDown color='#413833' size='0.6em' style={{ verticalAlign: 'middle', marginLeft: '2vw' }} /></h1>
        </div>
        <div className="category-list" ref={categoryListRef} >
          <div className="list-container">
            <div className='triangle-up'><FaCaretUp color='#f8f8f8' size='1.6em' /></div>
            <div className="scroll-container" ref={scrollContainerRef}>
              <ul>
                {
                  categories && categories.map((category, index) => {
                    // 如果是当前分类，那么显示小钩
                    let isChoose = false;
                    if (category === currentCategory) {
                      isChoose = true;
                    }

                    return (
                      <Link key={index} as={`/category/${category}`} href="/category/[category]">
                        <li className="item"><div className="content"><div className="left"><div className="name">{category}</div>{/*<div className="num">{category.category_num}</div>*/}</div><div className="right"><FaCheck color="#5083ff" style={{ visibility: isChoose ? 'visible' : 'hidden', verticalAlign: 'middle' }} /></div></div></li>
                      </Link>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
        <div onClick={() => isShowCategoryListStyle(false, maskRef, categoryListRef, scroll)} className="mask" ref={maskRef}></div>
      </div>

      <style jsx>{`
        @svg 1px-border {
          height: 2px;
          @rect {
            fill: var(--color, black);
            width: 100%;
            height: 50%;
          }
        }

        .container {
          position: relative;

          .title {
            width: 30%;
            height: 100%;
            margin: 0 auto;

            .text {
              height: 6vh;
              line-height: 6vh;
              font-size: 3.9vw;
              font-weight: 600;
              text-align: center;
              color: #fff;
            }
          }

          .category-list {
            display: none;
            position: absolute;
            top: 5.4vh;
            left: 0;
            right: 0;
            width: 80%;
            margin: auto;
            border-radius: 1vw;
            box-shadow: rgba(58, 15, 0, 0.2) 0px 1px 4px;
            background-color: #f8f8f8;
            z-index: 20;
            opacity: 0;
            transition: opacity .2s ease-out;

            .list-container {
              position: relative;
              padding-top: 1vh;

              .triangle-up {
                position: absolute;
                top: -2vh;
                width: 100%;
                text-align: center;
                z-index: 20;
              }

              .scroll-container {
                max-height: 33vh;
                overflow: hidden;

                ul li {
                  box-sizing: border-box;
                  border-bottom: 1px solid transparent;
                  border-image: svg(1px-border param(--color #e6e6e6)) 2 2 stretch;
                }

                ul li:last-child {
                  border-bottom: 0;
                }

                .item {
                  display: flex;
                  height: 6vh;
                  padding: 0 4vw;
                  color: #585858;

                  .content {
                    margin: auto;
                    width: 100%;
                  }

                  .left, .right {
                    display: inline-block;
                  }

                  .left {
                    width: 95%;

                    .name, .num {
                      display: inline-block;
                    }

                    .name {
                      max-width: 75%;
                      padding-right: 3vw;
                      width-weight: 500;
                    }

                    .num {
                      font-size: 2.6vw;
                      color: #8c8c8c;
                    }
                  }

                  .right {
                    width: 5%;
                  }
                }
              }
            }
          }

          .mask {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 10;
          }
        }
      `}</style>
    </HeaderLayout>
  )
}

export default header
