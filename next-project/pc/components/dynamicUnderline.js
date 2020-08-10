const dynamicUnderline = () => {
  return (
    <>
      &nbsp;<span className='motto'></span>
  
      <style jsx>{`
        .motto {
          display: inline-block;
          height: 1px;
          width: 13px;
          border-bottom: 2px solid;
          opacity: 1;
  
          -webkit-animation: blink 0.9s infinite;
          -moz-animation: blink 0.9s infinite;
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