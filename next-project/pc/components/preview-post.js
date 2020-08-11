import PostContent from './post-content'

const prewviewPost = ({ post }) => {
  return (
    <>
      <div className="preview-wrapper">
        <PostContent post={ post }></PostContent>
      </div>

      <style jsx>{`
        .preview-wrapper {
          width: 65%;
          height: 95%;
          margin: 0 auto;
          overflow: hidden;
        }
      `}</style>
    </>
  )
}

export default prewviewPost