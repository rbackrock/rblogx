import PostContent from './post-content'

const postContentLayout = ({ post }) => {
  return (
    <div className="container">
      <PostContent post={ post }></PostContent>

      <style jsx>{`
        .container {
          position: relative;
          flex: 65;
          width: 65vw;
          height: 100%;
          background: url(/img/note_icon.png) no-repeat center center;
        }
      `}</style>
    </div>
  )
}

export default postContentLayout
