import React from 'react'
import { graphql } from 'gatsby'
import tw, { css } from 'twin.macro'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { PostList, ProfileCard } from '../components'

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <div
        tw="grid md:grid-cols-index-contents gap-12 justify-items-center px-3 lg:px-index-width"
      >
        <PostList edges={data.allMicrocmsPosts.edges} />

        <ProfileCard bio="abc" />
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPage {
    allMicrocmsPosts(sort: { fields: revisedAt, order: DESC }) {
      edges {
        node {
          postsId
          title
          localImage {
            childImageSharp {
              gatsbyImageData(
                width: 600
                placeholder: DOMINANT_COLOR
                formats: [AUTO, WEBP]
              )
            }
          }
          createdAt
        }
      }
    }
  }
`
