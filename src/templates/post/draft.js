import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import tw, { css } from 'twin.macro'
import dayjs from 'dayjs'
import Prism from 'prismjs'

import { Layout, Card } from '../../components'
import './Post.scss'
import './Prism.css'

import queryString from 'query-string'

const replaceCode = elm => {
  switch (elm.name) {
    case 'img':
      if (!elm.attribs.src || elm.parent.name === 'a') {
        return
      }

      const url = new URL(elm.attribs.src)
      url.searchParams.delete('w')
      url.searchParams.delete('h')
      url.searchParams.append('w', 1000)

      return (
        <a href={elm.attribs.src} className="image-link">
          <div className="draft-image-wrapper">
            <img src={url.toString()} alt={elm.attribs.alt} tw="w-full" />
          </div>
        </a>
      )

    case 'a':
      if (elm.firstChild.name === 'img') {
        return (
          <a className="image-link" {...elm.attribs}>
            <div className="draft-image-wrapper">
              <img src={url.toString()} alt={elm.attribs.alt} tw="w-full" />
            </div>
          </a>
        )
      }
  }
}

const BlogDraftPage = ({ location }) => {
  const { contentId, draftKey } = queryString.parse(location.search)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(
      `https://momio.microcms.io/api/v1/posts/${contentId}?draftKey=${draftKey}`,
      {
        headers: {
          'X-API-KEY': '4cbf07d2-967a-4936-b635-f17104c10741',
        },
      },
    )
      .then(res => res.json())
      .then(res => setData({ microcmsPosts: res }))
  }, [])

  useEffect(() => {
    Prism.highlightAll()
  })

  if (data === null) {
    return null
  }

  const { featuredImage, title, updatedAt, body } = data.microcmsPosts

  const publishedDate = dayjs(updatedAt).format('YYYY-MM-DD')
  const jsxBody = parse(body, { replace: replaceCode })
  const imageParams = {
    w: '1000',
    txt64: '8J-TnSBQUkVWSUVXIE5PVyEg8J-nkA',
    'txt-size': '62',
    'txt-color': 'ffffff',
    'txt-align': 'bottom,left',
    'txt-pad': '30',
    'txt-shad': '42',
  }
  const imageData = {
    url: `${featuredImage.url}?${queryString.stringify(imageParams)}`,
  }

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
            <div css={imgWrapperStyle}>
              <img src={imageData.url} alt={title} css={imgStyle} />
            </div>
          </figure>

          <section tw="pt-11 pb-5 sm:pb-6 px-3 sm:px-8 text-light-black">
            <h1 tw="text-center">{title}</h1>
            <div tw="text-center">
              <time tw="text-sm pt-3.5">{publishedDate}</time>
            </div>
            <section tw="pt-12">{jsxBody}</section>
            {/* <section
              tw="pt-12"
              dangerouslySetInnerHTML={{ __html: body }}
            ></section> */}
          </section>
        </section>
      </Card>
    </Layout>
  )
}

export default BlogDraftPage
