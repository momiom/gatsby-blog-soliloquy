import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import 'twin.macro'
import Card from './Card'

const PostCard = ({ title, date, imageData, alt, href }) => {
  return (
  <Card>
    <Link to={href} tw="flex flex-col h-full">
      <figure>
        <GatsbyImage
          image={getImage(imageData)}
          alt={alt}
          tw="object-cover object-center w-full h-40 sm:h-52"
        />
      </figure>
      <div tw="flex flex-col p-3.5 h-full">
        <h2 tw="text-base text-light-black">{title}</h2>
        <div tw="mt-auto pt-3.5">
          <p tw="text-xs">{date}</p>
        </div>
      </div>
    </Link>
  </Card>
)
}
PostCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  imageData: PropTypes.any,
  alt: PropTypes.string,
  href: PropTypes.string,
}

export default PostCard
