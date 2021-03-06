const inlineCode = ({ inline, children }) => {
  let render = null;
  if (inline) {
    render = <code className='inline'>{children}</code>
  } else {
    render = <code>{children}</code>
  }

  return render
}

export default inlineCode
