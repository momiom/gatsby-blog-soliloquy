import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <ul>
        {data.allMicrocmsPosts.edges.map(({ node }) => (
          <li key={node.id}>
            {node.localImage && (
              <GatsbyImage
                image={getImage(node.localImage)}
                alt={node.title}
              />
            )}
            
            <Link to={`/blog/${node.id}`}>{node.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPage {
    allMicrocmsPosts(sort: {fields: revisedAt, order: DESC}) {
      edges {
        node {
          title
          id
          localImage {
            childImageSharp {
              gatsbyImageData(
                width: 600
                placeholder: TRACED_SVG
                formats: [AUTO, WEBP]
              )
            }
          }
        }
      }
    }
  }
`