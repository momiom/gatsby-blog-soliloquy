import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {css} from 'twin.macro'
import dayjs from 'dayjs'

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      allMicrocmsProfile {
        edges {
          node {
            name
          }
        }
      }
    }
  `)
  const year = dayjs().format('YYYY')
  const name = data.allMicrocmsProfile.edges[0].node.name
  return (
    <div tw="text-sm text-light-black flex justify-center items-center">
      <small>©︎ {year} {name}</small>
    </div>
  )
}

export default Footer
