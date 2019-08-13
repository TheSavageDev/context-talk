import React from 'react'
import { AProvider } from '../context/AContext'
import { BProvider } from '../context/BContext'
import { TheProvider } from '../context/TheContext'
import ADisplay from '../components/ADisplay'
import BDisplay from '../components/BDisplay'
import TheDisplay from '../components/TheDisplay'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <TheProvider>
    <Layout>
      <SEO title="Home" />
      <TheDisplay
        style={{
          width: `100%`,
        }}
      />
      <div
        style={{
          display: `flex`,
          width: `100%`,
          justifyContent: `space-evenly`,
        }}
      >
        <AProvider>
          <ADisplay />
        </AProvider>
        <BProvider>
          <BDisplay />
        </BProvider>
      </div>
    </Layout>
  </TheProvider>
)

export default IndexPage
