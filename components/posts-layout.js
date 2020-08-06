import Category from './categories'
import Posts from './posts'
import PostContent from './post-content'

const postsLayout = ({ categories, category, posts, post }) => {
  return (
    <>
      <Category categories={ categories }></Category>
      <Posts category={ category } posts={ posts }></Posts>
      <PostContent post={ post }></PostContent>
    </>
  )
}

export default postsLayout
