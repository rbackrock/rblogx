import Link from 'next/link'
import DynamicUnderline from './dynamic-underline'

const header = () => {
  return (
    <header>
      <div className="left">
        <Link href={'/'}>
          <h1 className='name'><a href="/" className='link'>{`[rback@blog ~] # `}<DynamicUnderline /></a></h1>
        </Link>
      </div>
      <div className="right">
        <Link href={'/about'}>
          <div className='about'><span>About</span></div>
        </Link>
      </div>
  
      <style jsx>{`
        header {
          height: 5%;
          min-height: 45px;
          display: flex;
          align-items: center;
  
          box-shadow: rgba(0,0,0,.15) 0 1px 8px;
          background: linear-gradient(#716661,#5f5450);
          border-bottom: 1px #534843 solid;
          border-right: 1px #564944 solid;
          z-index: 999999;
        }
  
        .left, .right {
          flex: 1;
        }
  
        .left {
          padding-left: 36px;
          color: #fff;
          font-size: 18px;
          font-weight: 400;
        }
  
        .name {
          cursor: pointer;
        }
  
        .link {
          color: #fff;
          text-decoration: none;
        }
  
        .right {
          padding-right: 36px;
          text-align: right;
        }
  
        .about {
          display: inline-block;
          padding: 1px;
          border-radius: 8px;
          line-height: 36px;
          background: #cacaca;
          background: rgba(0,0,0,.2);
          font-size: 14px;
          cursor: pointer;
        }
  
        .about span {
          background: #716661;
          background: linear-gradient(#716661,#5f5450);
          color: #fff;
          box-shadow: 0 1px rgba(255,255,255,.1) inset;
          display: inline-block;
          vertical-align: top;
          padding: 0 18px;
          border-radius: 7px;
          white-space: nowrap;
        }
  
        .about span:hover {
          background: #857263;
          background: linear-gradient(#8e7968,#7e6c5e);
        }
      `}</style>
    </header>
  )
}

export default header