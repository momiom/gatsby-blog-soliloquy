import React from 'react'
import { graphql } from 'gatsby'
import 'twin.macro'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { PostList, ProfileCard } from '../components'

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <div tw="grid sm:grid-cols-index-contents gap-12">
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
                placeholder: TRACED_SVG
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
