import React from 'react'
import PropTypes from 'prop-types'
import 'twin.macro'
import PostCard from './PostCard'

const CardList = ({ edges }) => {
  return (
  <div tw="grid sm:grid-cols-2 grid-cols-1 gap-4 max-w-max">
    {edges.map(({ node }) => (
      <PostCard
        key={node.title}
        title={node.title}
        date={node.date}
        imageData={node.localImage}
        alt={node.title}
        href={`/post/${node.postsId}`}
      />
    ))}
  </div>
)
    }

CardList.propTypes = {
  edges: PropTypes.array,
}

export default CardList
