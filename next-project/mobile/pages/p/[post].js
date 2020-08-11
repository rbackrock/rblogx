import { getPostContentByTitle, getAllPosts } from '../../../../lib/api'
import Post from '../../components/post'

const viewPost = ({ post }) => {
  return (
    <Post post={ post }></Post>
  )
}

export default viewPost

export async function getStaticProps({ params }) {
  const post = getPostContentByTitle(params.post)

  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths() {
  const allPosts = getAllPosts(['title'])
  const paramsList = []

  allPosts.map(post => {
    paramsList.push({
      params: {
        post: post.title
      }
    })
  })

  return {
    paths: paramsList,
    fallback: false,
  }
}