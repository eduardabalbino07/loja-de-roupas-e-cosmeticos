import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
//import ClienteForm from '../src/app/components/ClienteForm'

import ClienteConta from '..src/app/conta/page'

describe('ClienteConta', () => {
  it('renderiza sem erros', () => {
    render(<ClienteConta />)
  })
})
