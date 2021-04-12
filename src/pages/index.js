import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <ul>
        {data.allMicrocmsPosts.edges.map(({ node }) => (
          <li key={node.id}>
            {node.featuredImg && (
              <Img
                fixed={node.featuredImg.childImageSharp.fixed}
                alt={node.title}
                fadeIn={true}
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
          featuredImg {
            childImageSharp {
              fixed(width: 600) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      }
    }
  }
`