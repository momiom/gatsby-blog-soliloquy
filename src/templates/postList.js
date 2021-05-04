import React from 'react'
import { graphql, Link } from 'gatsby'
import 'twin.macro'
import { Layout, SEO, PostList, ProfileCard } from '../components'

const IndexPage = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? '/' : `/page/${(currentPage - 1).toString()}`
  const nextPage = `/page/${(currentPage + 1).toString()}`

  return (
    <Layout>
      <SEO title="Home" />
      <div tw="grid md:grid-cols-index-contents gap-12 justify-items-center px-3 lg:px-index-width">
        <main tw="w-full">
          <PostList edges={data.allMicrocmsPosts.edges} />

          <div tw="flex justify-between">
            {!isFirst && (
              <Link to={prevPage} rel="prev">
                ← Previous Page
              </Link>
            )}

            {!isLast && (
              <Link to={nextPage} rel="next">
                Next Page →
              </Link>
            )}
          </div>
        </main>

        <div>
          <ProfileCard data={data.microcmsProfile} />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    allMicrocmsPosts(
      sort: { fields: revisedAt, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          postsId
          title
          localImage {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                placeholder: DOMINANT_COLOR
                formats: [AUTO, WEBP]
              )
            }
          }
          createdAt
        }
      }
    }
    microcmsProfile {
      name
      description
      sns {
        name
        link
        service_name
      }
      localImage {
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
`
