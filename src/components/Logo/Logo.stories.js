import React from 'react'
import 'twin.macro'
import Logo from './Logo'

export default {
  title: 'Logo',
  component: Logo,
  decorators: [
    story => (
      <div className="wrapper" tw="bg-gray-100 relative w-screen h-screen">
        {story()}
      </div>
    ),
  ],
}

export const Default = args => <Logo {...args} />
Default.args = {'Re-rendering': true}