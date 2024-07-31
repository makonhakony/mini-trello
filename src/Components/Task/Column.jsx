import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FaRegEdit } from 'react-icons/fa';
import Card from './Card';

const Column = ({ List, Name, Area }) => {

   const getListStyle = isDraggingOver => ({
      background: isDraggingOver ? "lightblue" : "darkgrey",
      width: '80%',
      margin: 'auto',
   });
   const getItemStyle = (isDragging, draggableStyle) => ({
      userSelect: "none",
      background: isDragging ? "darkgrey" : "white",
      color: isDragging ? "white" : "black",
      padding: isDragging ? '0%' : '2%',
      paddingLeft: '2%',
      margin: '0%',
      fontSize: '17px',
      borderBottom: '0.5px solid gray',
      // styles we need to apply on draggables
      ...draggableStyle
   });

   const [showCard, setShowCard] = useState(false);

   const handleShowCard = () => setShowCard(true);
   const handleCloseCard = () => setShowCard(false);

   function addCard() {

   }
   return (
      <div style={{ width: '100%', display: 'flex' }}>
         <Droppable droppableId={Area}  >
            {(provided, snapshot) => (
               <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
               >
                  <ul style={{ listStyleType: 'none', textAlign: 'left', padding: '0%', width: '100%' }} >
                     <h2 style={{ paddingLeft: '2%' }}>{Name}</h2>
                     {List.map((data, index) => (
                        <Draggable key={data}
                           draggableId={`${data}${index}`} index={index}>
                           {(provided, snapshot) => (
                              <li
                                 key={index}
                                 ref={provided.innerRef}
                                 {...provided.draggableProps}
                                 {...provided.dragHandleProps}
                                 style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                 )}
                              >
                                 {data}
                                 <FaRegEdit style={{ "float": "right" }} onClick={handleShowCard} />
                                 <Card show={showCard} handleClose={handleCloseCard} />
                              </li>
                           )}
                        </Draggable>
                     ))}
                  </ul><Button variant="primary" onClick={addCard}>Add Cards</Button>
                  {provided.placeholder}
               </div>
            )}
         </Droppable>
      </div>
   );
}

export default Column;
