const mainLayout = ({ children }) => {
  return (
    <div className='container'>
    {children}

    <style jsx>{`
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      position: relative;
    `}</style>
  </div>
  )
}

export default mainLayout
