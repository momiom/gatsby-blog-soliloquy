import React from "react"
import { graphql } from "gatsby"
import { Layout, Image } from '../components'
import parse from 'html-react-parser';

const replaceCode = elm => {
  if (elm.name === 'img') {
   return elm.attribs.src && (
     <Image
      src={elm.attribs.src}
      alt={elm.attribs.alt}
    />
   )
  }
}

const BlogPage = ({ data }) => {
  return (
    <Layout seo={{title: data.microcmsPosts.title}}>
      <span>投稿日：{data.microcmsPosts.publishedAt}</span>
      <span>更新日：{data.microcmsPosts.revisedAt}</span>
      <h1>{data.microcmsPosts.title}</h1>
      <div>{parse(data.microcmsPosts.body, {replace: replaceCode})}</div>
    </Layout>
  )
}

export default BlogPage

export const query = graphql`
  query($postsId: String!) {
    microcmsPosts(postsId: { eq: $postsId }) {
      postsId
      title
      publishedAt
      revisedAt
      body
    }
  }
`