import { cleanup, render, screen } from "@testing-library/react";
import {  afterEach, describe, it} from 'vitest'
import App from './App.tsx'

describe('Extension tests', () => {
    afterEach(cleanup);
    it('should render component', ()=>{
        render(<App title="Hide it!"/>)
    })

    it('should render the title', ()=>{
        render(<App title="Hide it!"/>)
        screen.getByText('Hide it!')
    })
})