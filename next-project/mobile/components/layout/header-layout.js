const headerLayout = ({ children }) => {
  return (
    <div className='container'>
      {children}

      <style jsx>{`
        @svg 1px-border {
          height: 2px;
          @rect {
            fill: var(--color, black);
            width: 100%;
            height: 50%;
          }
        }

        .container {
          width: 100vw;
          height: 6vh;
          box-sizing: border-box;

          background: linear-gradient(#827265,#716053);
          border-bottom: 1px #564944 solid;
          z-index: 999;
          box-shadow: rgba(0,0,0,.15) 0 1px 8px;

          border-bottom: 1px solid transparent;
          border-image: svg(1px-border param(--color #564944)) 2 2 stretch;
        }
      `}</style>
    </div>
  )
}

export default headerLayout