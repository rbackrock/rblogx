import { getAllCategories, getPostsByCategory, getPostContentByName } from '../../../../lib/api'
import MainLayout from '../../components/layout/main-layout'
import PostsLayout from '../../components/layout/posts-layout'

const viewCategory = ({ allCategories, category, allPosts, post }) => {
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

export default viewCategory

export async function getStaticProps({ params }) {
  const allCategories = getAllCategories()
  const category = params.category
  const allPosts = getPostsByCategory(params.category)
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

export async function getStaticPaths() {
  const paramsList = []
  const allCategories = getAllCategories()

  allCategories.map(category => {
    paramsList.push({
      params: {
        category: category
      }
    })
  })

  return {
    paths: paramsList,
    fallback: false,
  }
}