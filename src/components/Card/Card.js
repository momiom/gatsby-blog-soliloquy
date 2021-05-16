import React from 'react'
import 'twin.macro'

const Card = ({ children, styles, ...rest }) => {
  return (
    <article
      tw="bg-white shadow rounded-lg overflow-hidden w-full z-10"
      css={styles}
      {...rest}
    >
      {children}
    </article>
  )
}

export default Card
