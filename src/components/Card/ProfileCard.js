import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import 'twin.macro'
import Card from './Card'

const PostCard = ({ bio }) => {
  return (
  <Card>
    { bio }
  </Card>
)
}
PostCard.propTypes = {
  bio: PropTypes.string,
}

export default PostCard
