import React from 'react'
import { NoteForm } from 'pages/notesPage/NoteForm'
import theme from 'styles/styles'
import { ThemeProvider } from 'styled-components'

describe('<NoteForm />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(
            <ThemeProvider theme={theme}>
                <NoteForm getNotes={() => null} onClose={() => null} timelineId='1'></NoteForm>
            </ThemeProvider>
        )
        cy.get('button').first().should('have.text', 'Save note')
    })
})