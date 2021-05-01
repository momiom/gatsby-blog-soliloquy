import React from 'react'
import 'twin.macro'

const Card = ({ children }) => {
  return (
    <article tw="bg-white shadow rounded-lg overflow-hidden w-full">
      { children }
    </article>
  )
}

export default Card
