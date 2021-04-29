import React from 'react'
import tw, { GlobalStyles } from 'twin.macro'
import Header from './Header/Header'
import Footer from './Footer'

const Layout = ({ children, ...rest }) => (
  <div {...rest} tw="min-h-screen grid grid-rows-layout bg-main">
    <GlobalStyles />
    <Header />
    {children}
    <Footer />
  </div>
)

export default Layout
