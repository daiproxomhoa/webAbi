/**
 * Rct Card Footer
 */
import React from 'react'

const RctCardFooter = ({ children, customClasses }) => (
  <div className={`rct-block-footer ${customClasses || ''}`}>{children}</div>
)

export default RctCardFooter
