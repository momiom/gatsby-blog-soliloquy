import React from 'react'
import 'twin.macro'

const Card = ({ children }) => {
  return (
    <article tw="bg-white shadow rounded-lg overflow-hidden max-w-sm">
      { children }
    </article>
  )
}

export default Card
