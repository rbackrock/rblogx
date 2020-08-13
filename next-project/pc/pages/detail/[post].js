import { getPostContentByName, getAllPosts } from '../../../../lib/api'
import MainLayout from '../../components/layout/main-layout'
import PreviewPost from '../../components/preview-post'

const viewPost = ({ post }) => {
  return (
    <>
      <MainLayout>  
        <PreviewPost post={post}></PreviewPost>
      </MainLayout>
    </>
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
  const paramsList = []
  const allPosts = getAllPosts([
    'name'
  ])

  allPosts.map(post => {
    paramsList.push({
      params: {
        post: post.name,
      }
    })
  })

  return {
    paths: paramsList,
    fallback: false,
  }
}