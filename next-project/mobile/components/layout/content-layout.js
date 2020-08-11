const contentLayout = ({ children }) => {
  return (
    <div className='container'>
      {children}

      <style jsx>{`
        .container {
          width: 100vw;
          height: 94vh;
        }
      `}</style>
    </div>
  )
}

export default contentLayout