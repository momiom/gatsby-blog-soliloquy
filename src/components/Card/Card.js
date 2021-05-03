import React from 'react'
import 'twin.macro'

const Card = ({ children, styles }) => {
  return (
    <article
      tw="bg-white shadow rounded-lg overflow-hidden w-full"
      css={styles}
    >
      {children}
    </article>
  )
}

export default Card
