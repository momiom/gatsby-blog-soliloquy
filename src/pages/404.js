import React from 'react'
import { graphql } from 'gatsby'
import { GlobalStyles } from 'twin.macro'
import { SEO, Header, Footer, PostList } from '../components'
import 'twin.macro'
import './404.scss'

const ErrorPage = ({ data }) => (
  <>
    <GlobalStyles />
    <div tw="min-h-screen bg-main grid grid-rows-layout">
      <SEO title="404 Not found" />
      <Header />

      <div tw="grid justify-items-center place-items-center px-3 sm:px-24 lg:px-8 xl:px-index-width">
        <div
          tw="w-full text-center text-8xl font-black"
          className="not-found"
        >
          404
        </div>
        <div tw="text-center text-xl text-light-black">
          最近の投稿はこちら
        </div>
        <PostList edges={data.allMicrocmsPosts.edges} />
      </div>
      <Footer />
    </div>
  </>
)

export default ErrorPage

export const query = graphql`
  query {
    allMicrocmsPosts(
      sort: { fields: revisedAt, order: DESC }
      limit: 4
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
          publishedAt
        }
      }
    }
  }
`