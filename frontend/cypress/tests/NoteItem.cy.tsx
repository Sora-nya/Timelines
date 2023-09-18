import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { NoteForm } from 'pages/notesPage/NoteForm'


describe('<NoteItem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      // <DragDropContext onDragEnd={() => null}>
      //   {(provided, snapshot) => (
      //     <div {...provided.droppableProps}
      //     ref={provided.innerRef}>
            <NoteItem title='A' content='aaa' id={1} index={0} isRight={false} onDelete={() => null} onEdit={() => null} />
      //      </div>
      //   )}
      // </DragDropContext>
    )
  })
})