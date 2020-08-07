import Link from 'next/link'

const categories = ({ categories, post }) => {
  return (
    <ul>
      {
        categories.map(category => (
          <Link key={category} as={`/${category}/${post.title}`} href="/[category]/[post]">
            <li>{category}</li>
          </Link>
        ))
      }
    </ul>
  )
}

export default categories