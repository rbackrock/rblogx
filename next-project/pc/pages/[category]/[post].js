import { getAllCategories, getPostsByCategory, getPostContentByTitle } from '../../../../lib/api'
import MainLayout from '../../components/layout/main-layout'
import PostsLayout from '../../components/layout/posts-layout'

const viewPost = ({ allCategories, category, allPosts, post }) => {
  return (
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
}

export default viewPost

export async function getStaticProps({ params }) {
  const allCategories = getAllCategories()
  const category = params.category
  const allPosts = getPostsByCategory(params.category)
  const post = getPostContentByTitle(params.post)

  return {
    props: {
      allCategories,
      category,
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