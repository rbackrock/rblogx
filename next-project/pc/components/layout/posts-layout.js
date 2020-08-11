import PostContentLayout from './post-content-layout'
import PostsInfoLayout from './posts-info-layout'

const postsLayout = ({ categories, category, posts, post }) => {
  return (
    <div className='note-wrapper'>
      <PostsInfoLayout categories={ categories } category={ category } posts={ posts } post={ post }></PostsInfoLayout>
      <PostContentLayout post={ post }></PostContentLayout>

      <style jsx>{`
        .note-wrapper {
          position: relative;
          display: flex;
          width: 100%;
          height: 95%;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default postsLayout
