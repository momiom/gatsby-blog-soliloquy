import React from 'react'
import PropTypes from 'prop-types'
import 'twin.macro'
import PostCard from './PostCard'

const CardList = ({ edges }) => {
  return (
    <div tw="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {edges.map(({ node }) => (
        <PostCard
          key={node.title}
          title={node.title}
          publishedAt={node.publishedAt}
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
