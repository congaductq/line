import React from 'react'
import { render } from '@testing-library/react'

import App from '../src/App'

describe('With React Testing Library', () => {
  it('Shows "TRUM"', () => {
    const { getByText } = render(<App />)

    expect(getByText('TRUM')).not.toBeNull()
  })
})

describe('With React Testing Library Snapshot', () => {
  it('Should match Snapshot', () => {
    const { asFragment } = render(<App />)

    expect(asFragment()).toMatchSnapshot()
  })
})
