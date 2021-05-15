import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { css } from 'twin.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import Card from './Card'

const PostCard = ({ title, publishedAt, imageData, alt, href }) => {
  const date = dayjs(publishedAt).format('YYYY-MM-DD')

  return (
    <Card>
      <Link to={href} tw="flex flex-col h-full">
        <figure
          tw="w-full relative"
          css={css`
            padding-top: calc(630 / 1200 * 100%);
          `}
        >
          <GatsbyImage
            image={getImage(imageData)}
            alt={alt}
            tw="w-full h-full object-cover object-center absolute top-0"
          />
        </figure>
        <div tw="flex flex-col p-4 h-full">
          <div>
            <p tw="text-xs text-gray-600">
              <FontAwesomeIcon icon={faSync} tw="text-gray-500" /> {date}
            </p>
          </div>
          <h2 tw="pt-3 text-base text-light-black">{title}</h2>
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
