import Link from 'next/link'

const categories = ({ categories, postId }) => {
  return (
    <ul>
      {
        categories.map(category => (
          <Link key={category} as={`/category/${category}`} href="/category/[category]">
            <li>{category}</li>
          </Link>
        ))
      }
    </ul>
  )
}

export default categories