const postContent = ({ post }) => {
  return (
    <>
      <h1>{ post.title }</h1>
      <h2>{ post.date }</h2>
      <h3>{ post.content }</h3>
    </>
  )
}

export default postContent