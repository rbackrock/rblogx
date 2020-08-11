import { getPostContentByTitle, getAllPosts } from '../../../../lib/api'
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
  const post = getPostContentByTitle(params.post)

  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths() {
  const paramsList = []
  const allPosts = getAllPosts([
    'title'
  ])

  allPosts.map(post => {
    paramsList.push({
      params: {
        post: post.title,
      }
    })
  })

  return {
    paths: paramsList,
    fallback: false,
  }
}