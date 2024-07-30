import React from 'react';

import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FaRegEdit } from 'react-icons/fa';

const Column = ({Marvel, DC, DC2}) => {

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "darkgrey",
        width: '21%',
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
   
    return (
    <div style={{ width: '100%', display: 'flex' }}>
         <Droppable droppableId="Todo_drop_area"  >
            {(provided, snapshot) => (
               <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
               >
                  <ul style={{ listStyleType: 'none', textAlign: 'left', padding: '0%', width: '100%' }} >
                     <h2 style={{ paddingLeft: '2%' }}>To Do</h2>
                     {Marvel.map((data, index) => (
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
                                 <FaRegEdit style={{"float":"right"}}/>
                              </li>
                           )}
                        </Draggable>
                     ))}
                  </ul>
                 {provided.placeholder}
              </div>
           )}
        </Droppable>
        <Droppable droppableId="InProgress_drop_area"  >
           {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <ul style={{ listStyleType: 'none', textAlign: 'left', padding: '0%', width: '100%' }} >
                   <h2 style={{ paddingLeft: '2%' }}>In Progress</h2>
                      {DC.map((data, index) => (
                         <Draggable key={data} draggableId={`${data}${index}`} index={index}>
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
                                  <FaRegEdit style={{"float":"right"}}/>
                               </li>
                            )}
                         </Draggable>
                      ))}
                   </ul>
                   {provided.placeholder}
                </div>
             )}
          </Droppable>
          <Droppable droppableId="Done_drop_area"  >
           {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <ul style={{ listStyleType: 'none', textAlign: 'left', padding: '0%', width: '100%' }} >
                   <h2 style={{ paddingLeft: '2%' }}>Done</h2>
                      {DC2.map((data, index) => (
                         <Draggable key={data} draggableId={`${data}${index}`} index={index}>
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
                                  <FaRegEdit style={{"float":"right"}}/>
                               </li>
                            )}
                         </Draggable>
                      ))}
                   </ul>
                   {provided.placeholder}
                </div>
             )}
          </Droppable>
       </div>
    );
}

export default Column;
