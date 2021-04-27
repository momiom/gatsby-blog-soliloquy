import React from 'react'
import 'twin.macro'
import Layout from './Layout'

export default {
  title: 'Layout',
  component: Layout,
}

export const Default = args => (
  <Layout {...args}>
    <div>In Layout</div>
  </Layout>
)
Default.args = {'Re-rendering': true}