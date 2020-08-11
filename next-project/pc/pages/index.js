import MainLayout from '../components/layout/main-layout'
import PostsLayout from '../components/layout/posts-layout'
import { getAllPosts, getAllCategories, getPostContentForIndex } from '../../../lib/api'

const Index = ({ allCategories, allPostsData, post }) => (
  <>
    <MainLayout>  
      <PostsLayout
        categories={ allCategories }
        category={ allCategories && allCategories.length > 0 ? allCategories[0] : null }
        posts={ allPostsData }
        post={ post }
      ></PostsLayout>
    </MainLayout>
  </>
)

export async function getStaticProps() {
  const allCategories = getAllCategories()
  const allPostsData = getAllPosts([
    'title',
    'date',
  ])
  const post = getPostContentForIndex()

  return {
    props: {
      allCategories,
      allPostsData,
      post
    }
  }
}

export default Index
