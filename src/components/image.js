import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'
import 'twin.macro'

const Image = ({ src, alt = '', tag = 'div', ...rest }) => {
  const { allMicrocmsPosts } = useStaticQuery(allImages)

  let imageData = {}
  allMicrocmsPosts.edges.forEach(({ node }) => {
    'images' in node.fields &&
      node.fields.images.forEach(image => {
        if ('url' in image && image.url === src) {
          imageData = { childImageSharp: image.localFile.childImageSharp, src }
        }
      })
  })

  const result = imageData.childImageSharp ? (
    <GatsbyImage
      image={getImage(imageData.childImageSharp)}
      alt={alt}
      as={tag}
      tw="w-full"
      {...rest}
    />
  ) : (
    <img src={src} alt={alt} {...rest} />
  )

  return result
}

export default Image

const allImages = graphql`
  query {
    allMicrocmsPosts {
      edges {
        node {
          fields {
            images {
              url
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: DOMINANT_COLOR
                    formats: [AUTO, WEBP]
                  )
                }
              }
            }
          }
        }
      }
    }
  }
`
