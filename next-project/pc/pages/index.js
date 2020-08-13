import MainLayout from '../components/layout/main-layout'
import PostsLayout from '../components/layout/posts-layout'
import { getPostsByCategory, getAllCategories, getPostContentByName } from '../../../lib/api'

const Index = ({ allCategories, category, allPosts, post }) => (
  <>
    <MainLayout>  
      <PostsLayout
        categories={ allCategories }
        category={ category }
        posts={ allPosts }
        post={ post }
      ></PostsLayout>
    </MainLayout>
  </>
)

export async function getStaticProps() {
  const allCategories = getAllCategories()
  const category = allCategories && allCategories.length > 0 ? allCategories[0] : null
  const allPosts = category ? getPostsByCategory(category) : null
  const post = allPosts && allPosts.length > 0 ? getPostContentByName(allPosts[0].name) : null

  return {
    props: {
      allCategories,
      category,
      allPosts,
      post
    }
  }
}

export default Index
