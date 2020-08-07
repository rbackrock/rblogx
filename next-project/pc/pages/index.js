import Layout from '../components/layout'
import PostsLayout from '../components/posts-layout'
import { getAllPosts, getAllCategories, getPostContentForIndex } from '../../../lib/api'

const Index = ({ allCategories, allPostsData, post }) => (
  <>
    <Layout>  
      <PostsLayout
        categories={ allCategories }
        category={ allCategories && allCategories.length > 0 ? allCategories[0] : null }
        posts={ allPostsData }
        post={ post }
      ></PostsLayout>
    </Layout>
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
