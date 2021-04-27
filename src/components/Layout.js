import React from 'react'
import tw, { GlobalStyles } from 'twin.macro'
import Header from './Header/Header'
import Footer from './Footer'

const Layout = ({ children, ...rest }) => (
  <div {...rest} tw="h-screen grid grid-rows-layout">
    <GlobalStyles />
    <Header />
    {children}
    <Footer />
  </div>
)

export default Layout
