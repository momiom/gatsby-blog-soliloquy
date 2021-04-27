import React from 'react'
import Header from './Header'

export default {
  title: 'Header',
  component: Header,
}

export const Default = args => <Header {...args} />
Default.args = {'Re-rendering': true}