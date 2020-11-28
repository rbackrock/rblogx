import { getPostContentByName, getAllCategories, getPostsByCategory } from '../../../../lib/api'
import Post from '../../components/post'

const viewPost = ({ post }) => {
  return (
    <Post post={ post }></Post>
  )
}

export default viewPost

export async function getStaticProps({ params }) {
  const post = getPostContentByName(params.slug[1])

  return {
    props: {
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