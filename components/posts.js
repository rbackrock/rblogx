import Link from 'next/link'

const posts = ({ category, posts }) => {
  return (
    <>
      <ul>
        {
          posts.map(post => (
            <Link key={post.title} as={`/category/${category}/p/${post.title}`} href="/category/[category]/p/[post]">
              <li>{post.title}</li>
            </Link>
          ))
        }
      </ul>
    </>
  )
}

export default posts
