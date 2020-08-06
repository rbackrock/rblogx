import Layout from '../components/layout'
import PostsLayout from '../components/posts-layout'
import { getAllPosts, getAllCategories } from '../lib/api'

const Index = ({ allCategories, allPosts }) => (
  <>
    <Layout>  
      <PostsLayout
        categories={ allCategories }
        category={ allCategories && allCategories.length > 0 ? allCategories[0] : null }
        posts={ allPosts }
        post={ allPosts.length > 0 ? allPosts[0] : null }
      ></PostsLayout>
    </Layout>
  </>
)

export async function getStaticProps() {
  const allCategories = getAllCategories()
  const allPosts = getAllPosts([
    'title',
    'date',
    'content'
  ])

  return {
    props: {
      allCategories,
      allPosts
    }
  }
}

export default Index
