import { getAllCategories, getPostContentByName, getAllPosts, getPostsByCategory } from '../../../../lib/api'
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
  const post = getPostContentByName(params.post)
  const allCategories = getAllCategories()
  const category = post.category
  const allPosts = getPostsByCategory(post.category)

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
  const allPosts = getAllPosts([
    'name',
  ])

  allPosts.map(post => {
    paramsList.push({
      params: {
        post: post.name
      }
    })
  })

  return {
    paths: paramsList,
    fallback: false,
  }
}