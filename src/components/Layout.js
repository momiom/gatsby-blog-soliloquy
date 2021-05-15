import React from 'react'
import { GlobalStyles } from 'twin.macro'
import { SEO, ProfileCard } from '../components'
import 'twin.macro'
import Header from './Header/Header'
import Footer from './Footer'

const Layout = ({ children, seo = { title: '' }, ...rest } = {}) => {
  const { title } = seo

  return (
    <>
      <GlobalStyles />
      <div {...rest} tw="min-h-screen bg-main grid grid-rows-layout">
        <SEO title={title} />
        <Header />

        <div tw="grid xl:grid-cols-index-contents gap-12 justify-items-center px-3 md:px-index-width">
          <main tw="w-full">{children}</main>

          <div>
            <ProfileCard />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
export default Layout
