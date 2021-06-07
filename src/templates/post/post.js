import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import parse from 'html-react-parser'
import tw, { css } from 'twin.macro'
import dayjs from 'dayjs'
import Prism from 'prismjs'

import { Layout, Card, Image } from '../../components'
import './Post.scss'
import './Prism.css'

const replaceCode = elm => {
  switch (elm.name) {
    case 'img':
      return (
        elm.attribs.src && <Image src={elm.attribs.src} alt={elm.attribs.alt} />
      )
  }
}

const BlogPage = ({ data }) => {
  useEffect(() => {
    Prism.highlightAll()
  })

  const { localImage, title, publishedAt, revisedAt, childProcessedBody } = data.microcmsPosts

  const publishedDate = dayjs(publishedAt).format('YYYY-MM-DD')
  const jsxBody = parse(childProcessedBody.body, { replace: replaceCode })
  const imageData = getImage(localImage)

  const imgWrapperStyle = tw`w-full h-full object-cover object-center absolute top-0`
  const imgStyle = tw`rounded-t-lg overflow-hidden`

  return (
    <Layout seo={{ title }}>
      <Card id="post-content">
        <section tw="">
          <figure
            tw="w-full relative"
            css={css`
              padding-top: calc(630 / 1200 * 100%);
            `}
          >
            <GatsbyImage
            image={getImage(imageData)}
            alt={title}
            style={imgWrapperStyle}
            imgStyle={imgStyle}
          />
          </figure>

          <section tw="pt-11 pb-5 sm:pb-6 px-3 sm:px-8 text-light-black">
            <h1 tw="text-center">{title}</h1>
            <div tw="text-center">
              <time tw="text-sm pt-3.5">{publishedDate}</time>
            </div>
            <section tw="pt-12">{jsxBody}</section>
            {/* <section tw="pt-12" dangerouslySetInnerHTML={{__html: body}}></section> */}
          </section>
        </section>
      </Card>
    </Layout>
  )
}

export default BlogPage

export const query = graphql`
  query($postsId: String!) {
    microcmsPosts(postsId: { eq: $postsId }) {
      postsId
      localImage {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP]
          )
        }
      }
      title
      publishedAt
      revisedAt
      childProcessedBody {
        body
      }
    }
  }
`
