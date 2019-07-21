import React from 'react'
import { render } from '@testing-library/react'

import App from '../src/App'

describe('Testing Render', () => {
  it('Shows "TRUM"', () => {
    const { getByText } = render(<App />)

    expect(getByText('TRUM')).not.toBeNull()
  })
})

describe('Testing Render Snapshot', () => {
  it('Should match Snapshot', () => {
    const { asFragment } = render(<App />)

    expect(asFragment()).toMatchSnapshot()
  })
})
