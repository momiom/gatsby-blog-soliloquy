import React from 'react'
import { GlobalStyles } from 'twin.macro'
import { SEO } from '../components'
import Header from './Header/Header'
import Footer from './Footer'

const Layout = ({ children, seo={title: ''}, ...rest } = {}) => {
  const { title } = seo

  return (
    <div {...rest} tw="min-h-screen bg-main grid grid-rows-layout">
      <SEO title={ title } />
      <GlobalStyles />
      <Header />
      {children}
      <Footer />
    </div>
  )
}
export default Layout
