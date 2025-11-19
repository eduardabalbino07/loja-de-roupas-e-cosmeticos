import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Produto from '../src/app/components/Produto'

describe('Produto' , () => {
  it('renderiza sem erros', () => {
    render(<Produto />)
  })
})