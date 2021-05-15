import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import parse from 'html-react-parser'
import { css } from 'twin.macro'
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

    case 'iframe':
      const { width, height, ...attribs } = elm.attribs
      return (
        <div
          tw="w-full relative"
          css={css`
            padding-top: calc(630 / 1200 * 100%);
          `}
        >
          <iframe tw="absolute top-0 w-full h-full p-4" {...attribs}></iframe>
        </div>
      )

    case 'pre':
      if (elm.children.length === 1 && elm.children[0].name === 'code') {
        const codeElm = elm.children[0]
        const planeCode = codeElm.children[0].data

        // １行目にはコード情報が ":言語タイプ:ファイル名" のように書かれている
        // 例えば ":js:script.js" のように書かれているので言語タイプ部分の "js" を取り出す
        if (planeCode.split('\n').length > 0) {
          const firstLine = planeCode.split('\n')[0]
          const code = planeCode.split('\n').slice(1).join('\n')

          if (firstLine.split(':').length > 1) {
            const split = firstLine.split(':')
            const langType = split[1]
            const fileName = split[2] ? split[2] : ''

            return (
              <div>
                <pre tw="whitespace-pre-line">
                  <code className={`language-${langType}`}>{`${code}`}</code>
                </pre>
              </div>
            )
          } else {
            return
          }
        }
      }
  }
}

const BlogPage = ({ data }) => {
  useEffect(() => {
    Prism.highlightAll()
  })

  const { localImage, title, publishedAt, revisedAt, body } = data.microcmsPosts

  const publishedDate = dayjs(publishedAt).format('YYYY-MM-DD')
  const jsxBody = parse(body, { replace: replaceCode })
  const imageData = getImage(localImage)

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
              tw="w-full h-full object-cover object-center absolute top-0"
            />
          </figure>

          <section tw="pt-11 px-3 sm:px-8 text-light-black">
            <h1 tw="text-center">{title}</h1>
            <div tw="text-center">
              <time tw="text-sm pt-3.5">{publishedDate}</time>
            </div>
            <section tw="pt-12">{jsxBody}</section>
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
      body
    }
  }
`
