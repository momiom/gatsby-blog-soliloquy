import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

import Image from "../../components/image"
import parse from 'html-react-parser';

const replaceCode = elm => {
  if (elm.name === 'img') {
   return elm.attribs.src && (
     <Image
      src={elm.attribs.src}
      alt={elm.attribs.alt}
      Tag='span'
    />
   )
  }
}

const BlogPage = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.microcmsPosts.title} />
      <span>投稿日：{data.microcmsPosts.publishedAt}</span>
      <span>更新日：{data.microcmsPosts.revisedAt}</span>
      <h1>{data.microcmsPosts.title}</h1>
      <div>{parse(data.microcmsPosts.body, {replace: replaceCode})}</div>
    </Layout>
  )
}

export default BlogPage

export const query = graphql`
  query($id: String!) {
    microcmsPosts(id: { eq: $id }) {
      id
      title
      publishedAt
      revisedAt
      body
    }
  }
`