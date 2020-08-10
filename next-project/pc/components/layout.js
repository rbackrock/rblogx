import Header from './Header';

const layout = ({ children }) => {
  return (
    <div className='wrapper'>
      <Header />
      {children}
      <style jsx>{`
        .wrapper {
          width: 100%;
          height: 100%;
          min-width: 1280px;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default layout