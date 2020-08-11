const dynamicUnderline = () => {
  return (
    <>
      <span className='motto'></span>

      <style jsx>{`
        .motto {
          display: inline-block;
          height: 1vh;
          width: 3vw;
          border-bottom: 0.4vw solid;
          opacity: 1;
          animation: blink 0.9s infinite;
        }

        @keyframes blink {
          0% { opacity:1; }
          50% { opacity:0; }
          100% { opacity:1; }
        }
        @-webkit-keyframes blink {
          0% { opacity:1; }
          50% { opacity:0; }
          100% { opacity:1; }
        }
        @-moz-keyframes blink {
          0% { opacity:1; }
          50% { opacity:0; }
          100% { opacity:1; }
        }
      `}</style>
    </>
  )
}

export default dynamicUnderline