import { getAllCategories, getPostContentByName, getPostsByCategory } from '../../../../lib/api'
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
  const post = getPostContentByName(params.slug[1])
  const allCategories = getAllCategories()
  const category = params.slug[0]
  const allPosts = getPostsByCategory(params.slug[0])

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
    const allPosts = getPostsByCategory(category)
    allPosts.map(post => {
      paramsList.push({
        params: {
          slug: [category, post.name]
        }
      })
    })
  })

  return {
    paths: paramsList,
    fallback: false,
  }
}