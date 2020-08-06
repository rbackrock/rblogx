import { getAllCategories, getPostsByCategory, getPostContentByTitle } from '../../../../lib/api'
import Layout from '../../../../components/layout'
import PostsLayout from '../../../../components/posts-layout'

const viewPost = ({ allCategories, allPosts, post }) => {
  return (
    <>
      <Layout>  
        <PostsLayout
          categories={ allCategories }
          posts={ allPosts }
          post={ post }
        ></PostsLayout>
      </Layout>
    </>
  )
}

export default viewPost

export async function getStaticProps({ params }) {
  const allCategories = getAllCategories()
  const allPosts = getPostsByCategory(params.category)
  const post = getPostContentByTitle(params.post)

  return {
    props: {
      allCategories,
      allPosts,
      post
    }
  }
}

export async function getStaticPaths() {
  const allCategories = getAllCategories()
  const paramsList = []

  allCategories.map(category => {
    const postsByCategory = getPostsByCategory(category)

    postsByCategory.map(post => {
      paramsList.push({
        params: {
          category: category,
          post: post.title
        }
      })
    })
  })

  return {
    paths: paramsList,
    fallback: false,
  }
}