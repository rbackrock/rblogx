import Category from '../categories'
import Posts from '../posts'

const postsInfoLayout = ({ categories, category, posts, post }) => {
  return (
    <div className="note-container" >
      <Category categories={ categories } post={ post }></Category>
      <Posts category={ category } posts={ posts }></Posts>

      <style jsx>{`
        .note-container {
          display: flex;
          flex: 35;
          width: 35vw;
          max-width: 745px;
          background: #fbf7ed;
          box-shadow: rgba(0, 0, 0, .1) 1px 0 3px;
        }
      `}</style>
    </div>
  )
}

export default postsInfoLayout