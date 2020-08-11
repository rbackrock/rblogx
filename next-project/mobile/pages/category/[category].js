import { getAllCategories, getPostsByCategory } from '../../../../lib/api'
import Posts from '../../components/posts'

const viewCategory = ({ allCategories, category, allPosts }) => {
  return (
    <Posts
      categories={ allCategories }
      category={ category }
      posts={ allPosts }
    ></Posts>
  )
}

export default viewCategory

export async function getStaticProps({ params }) {
  const allCategories = getAllCategories()
  const category = params.category
  const allPosts = getPostsByCategory(params.category)

  return {
    props: {
      allCategories,
      category,
      allPosts
    }
  }
}

export async function getStaticPaths() {
  const allCategories = getAllCategories()
  const paramsList = []

  allCategories.map(category => {
    paramsList.push({
      params: {
        category: category
      }
    })
  })

  return {
    paths: paramsList,
    fallback: false,
  }
}