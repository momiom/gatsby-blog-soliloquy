import React from 'react'
import { GlobalStyles } from 'twin.macro'
import Logo from './Logo/Logo'

const Layout = ({ children, ...rest }) => (
  <div {...rest}>
    <GlobalStyles />
    <Logo active />
    {children}
  </div>
)

export default Layout
