import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import 'twin.macro'

const Image = ({ src, alt = '', tag = 'span' }) => {
  const { allMicrocmsPosts } = useStaticQuery(allImages)

  let childImageSharp = {}
  allMicrocmsPosts.edges.forEach(({ node }) => {
    'images' in node.fields &&
      node.fields.images.forEach(image => {
        if ('url' in image && image.url === src) {
          childImageSharp = image.localFile.childImageSharp
        }
      })
  })

  const result = childImageSharp ? (
    <GatsbyImage image={getImage(childImageSharp)} alt={alt} as={tag} tw="w-full" />
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
                    layout: FULL_WIDTH
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
