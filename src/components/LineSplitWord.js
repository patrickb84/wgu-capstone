const LineSplitWord = ({ children }) => {
  return (
    <small className='text-center'>
      <hr className='mb-0 mx-2' />
      <div style={{ transform: `translateY(-.8rem)` }}>
        <span className='text-small text-muted bg-white px-3'>{children}</span>
      </div>
    </small>
  )
}

export default LineSplitWord
