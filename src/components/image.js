import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const Image = ({ src, alt = "", Tag = 'div'}) => {
  const { allMicrocmsPosts } = useStaticQuery(allImages)

  let imageFixed = {}
  allMicrocmsPosts.edges.forEach(
    ({node}) => {
      'images' in node.fields && node.fields.images.forEach(
        (image) => {
          if ('url' in image && image.url === src) {
            imageFixed = image.localFile.childImageSharp.fixed
          }
        }
      )
    }
  )

  const result = imageFixed
  ? (
      <Img 
        fixed={imageFixed}
        alt={alt}
        Tag={Tag}
      />
    )
  : (
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
                  fixed(width: 400){
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`