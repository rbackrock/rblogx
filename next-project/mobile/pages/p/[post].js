import { getPostContentByName, getAllPosts } from '../../../../lib/api'
import Post from '../../components/post'

const viewPost = ({ post }) => {
  return (
    <Post post={ post }></Post>
  )
}

export default viewPost

export async function getStaticProps({ params }) {
  const post = getPostContentByName(params.post)

  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths() {
  const allPosts = getAllPosts(['name'])
  const paramsList = []

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