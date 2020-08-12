import Posts from '../components/posts'
import { getAllCategories, getPostsByCategory } from '../../../lib/api'

const Index = ({ allCategories, category, allPostsByCategory }) => {
  return (
    <Posts
      categories={ allCategories }
      category={ category }
      posts={ allPostsByCategory }
    ></Posts>
  )
}

export async function getStaticProps() {
  const allCategories = getAllCategories()
  const allPostsByCategory = getPostsByCategory()

  return {
    props: {
      allCategories,
      allPostsByCategory,
      category: allCategories && allCategories.length > 0? allCategories[0] : null
    }
  }
}

export default Index

