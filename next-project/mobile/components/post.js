import MainLayout from './layout/main-layout'
import PostHeader from './post-header'
import PostContent from './post-content'

const post = ({ post }) => {
  return (
    <MainLayout>
      <PostHeader></PostHeader>
      <PostContent post={ post }></PostContent>
    </MainLayout>
  )
}

export default post
