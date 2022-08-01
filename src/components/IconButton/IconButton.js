import { useRef, useState } from 'react'
import { Overlay, Tooltip } from 'react-bootstrap'

const IconButton = ({
  icon,
  onClick,
  className,
  style,
  tooltipContent,
  tooltip,
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const target = useRef(null)

  return (
    <>
      <button
        ref={target}
        onClick={onClick}
        className={`icon-button ${className}`}
        style={style}
        onMouseEnter={tooltip ? () => setShowTooltip(true) : () => {}}
        onMouseLeave={tooltip ? () => setShowTooltip(false) : () => {}}>
        {icon}
        {tooltip && (
          <Overlay
            target={target.current}
            show={showTooltip}
            placement='bottom'>
            {props => (
              <Tooltip id='overlay-example' {...props}>
                {tooltipContent}
              </Tooltip>
            )}
          </Overlay>
        )}
      </button>
    </>
  )
}

export default IconButton
