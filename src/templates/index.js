import React from 'react'
import { graphql, Link } from 'gatsby'
import tw, { css } from 'twin.macro'
import { Layout, PostList } from '../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'

const IndexPage = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? '/' : `/page/${(currentPage - 1).toString()}`
  const nextPage = `/page/${(currentPage + 1).toString()}`

  return (
    <Layout seo={{ title: 'Home' }}>
      <PostList edges={data.allMicrocmsPosts.edges} />

      <div tw="flex justify-between pt-4">
        <Link
          to={prevPage}
          rel="prev"
          tw="bg-white shadow rounded-lg overflow-hidden w-full z-10 text-center px-2.5 py-2 hover:bg-gray-100 transition"
          css={css`
            width: 10ch;
            color: #505050;
            ${isFirst ? tw`invisible` : ``}
          `}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            tw=""
            css={css`
              font-size: 0.9em;
            `}
          />
          <span tw="pl-1.5">Prev</span>
        </Link>

        <Link
          to={nextPage}
          rel="next"
          tw="bg-white shadow rounded-lg overflow-hidden w-full z-10 text-center px-2.5 py-2 hover:bg-gray-100 transition"
          css={css`
            width: 10ch;
            color: #505050;
          `}
        >
          <span tw="pr-1.5">Next</span>
          <FontAwesomeIcon
            icon={faChevronRight}
            css={css`
              font-size: 0.9em;
              ${isLast ? tw`invisible` : ``}
            `}
          />
        </Link>
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
          publishedAt
        }
      }
    }
  }
`
