import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'
import 'twin.macro'

const Image = ({ src, alt = '', tag = 'span' }) => {
  const { allMicrocmsPosts } = useStaticQuery(allImages)

  let imageData = {}
  allMicrocmsPosts.edges.forEach(({ node }) => {
    'images' in node.fields &&
      node.fields.images.forEach(image => {
        if ('url' in image && image.url === src) {
          imageData = {childImageSharp: image.localFile.childImageSharp, src}
        }
      })
  })

  const result = imageData.childImageSharp ? (
    <a href={src} className="image-wrapper">
      <GatsbyImage
        image={getImage(imageData.childImageSharp)}
        alt={alt}
        as={tag}
        tw="w-full"
      />
    </a>
  ) : (
    <img src={src} alt={alt} />
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
