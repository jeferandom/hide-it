import { cleanup, render, screen, fireEvent, within } from "@testing-library/react";
import { afterEach, describe, it } from 'vitest'

import App from './App.tsx'



describe('Extension tests', () => {
    afterEach(cleanup);
    it('should render component', () => {
        render(<App title="Hide it!" />)
    })

    it('should render the title', () => {
        render(<App title="Hide it!" />)
        screen.getByText('Hide it!')
    })

    it('should save keyword in state list', async () => {

        render(<App title="Hide it!" />)

        const input = screen.getByLabelText('key-word')
        fireEvent.change(input, { target: { value: 'ads' } })

        const saveButton = screen.getByText('Save')
        fireEvent.click(saveButton);

        const ul = screen.getByRole('list');
        await screen.findByText('ads');

        within(ul).getByText('ads')

    })

})