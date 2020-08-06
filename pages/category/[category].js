import { getAllCategories, getPostsByCategory } from '../../lib/api'
import Layout from '../../components/layout'
import PostsLayout from '../../components/posts-layout'

const viewCategory = ({ allCategories, allPosts, category }) => {
  return (
    <>
      <Layout>  
        <PostsLayout
          categories={ allCategories }
          category={ category }
          posts={ allPosts }
          post={ allPosts.length > 0 ? allPosts[0] : null }
        ></PostsLayout>
      </Layout>
    </>
  )
}

export default viewCategory

export async function getStaticProps({ params }) {
  const allCategories = getAllCategories()
  const allPosts = getPostsByCategory(params.category)

  return {
    props: {
      allCategories,
      allPosts,
      category: params.category
    }
  }
}

export async function getStaticPaths() {
  const allCategories = getAllCategories()
  return {
    paths: allCategories.map(category => {
      return {
        params: {
          'category': category
        },
      }
    }),
    fallback: false,
  }
}