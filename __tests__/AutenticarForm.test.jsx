import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import AutenticarForm from '../src/app/components/AutenticarForm'

describe('AutenticarForm', () => {
  it('renderiza sem erros', () => {
    render(<AutenticarForm />)
  })
})