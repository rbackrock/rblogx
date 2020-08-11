import MainLayout from './layout/main-layout'
import PostsHeader from './posts-header'
import PostsList from './posts-list'

const posts = ({ categories, category, posts }) => {
  return (
    <MainLayout>
      <PostsHeader categories={ categories } currentCategory={ category }></PostsHeader>
      <PostsList posts={ posts } ></PostsList>
    </MainLayout>
  )
}

export default posts
