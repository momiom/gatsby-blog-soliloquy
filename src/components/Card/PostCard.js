import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import 'twin.macro'
import dayjs from 'dayjs'
import Card from './Card'

const PostCard = ({ title, createdAt, imageData, alt, href }) => {
  const date = dayjs(createdAt).format('YYYY/MM/DD')
  return (
    <Card>
      <Link to={href} tw="flex flex-col h-full">
        <figure tw="w-full pt-ogp-height relative">
          <GatsbyImage
            image={getImage(imageData)}
            alt={alt}
            tw="w-full h-full object-cover object-center absolute top-0"
          />
        </figure>
        <div tw="flex flex-col p-3 h-full">
          <h2 tw="text-base text-light-black">{title}</h2>
          <div tw="mt-auto pt-3">
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
