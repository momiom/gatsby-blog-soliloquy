import React from 'react'
import { Link } from 'gatsby'
import Logo from '../Logo/Logo'

const Header = () => (
  <header>
    <Link to="/">
      <Logo active />
    </Link>
  </header>
)

export default Header