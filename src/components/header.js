import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Image from './image'

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#1D4875`,
    }}
  >
    <div
      style={{
        padding: `1.45rem 1.0875rem`,
        display: `flex`,
        justifyContent: `space-between`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `#0aae10`,
            textDecoration: `none`,
            fontFamily: `Pacifico`,
            fontWeight: `200`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <Image />
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
