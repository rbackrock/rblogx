import Link from 'next/link'

const posts = ({ category, posts }) => {
  return (
    <>
      <ul>
        {
          posts.map(post => (
            <Link key={post.title} as={`/${category}/${post.title}`} href="/[category]/[post]">
              <li>{post.title}</li>
            </Link>
          ))
        }
      </ul>
    </>
  )
}

export default posts
