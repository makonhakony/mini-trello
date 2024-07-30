import React, { useState } from "react";
import TopNavBar from "./TopNavBar";
import { useParams } from "react-router-dom";
import Column from "./Task/Column";
import { DragDropContext } from "react-beautiful-dnd";
import User from "./Task/User";


const DashboardInfo = () => {
    const { dId } = useParams();

    // List 1 consisting of all MARVEL super heroes
    const [list1, setList1] = React.useState(['Captain America', 'Iron Man', 'SpiderMan', 'Thor', 'Hulk', 'Black Widow', 'Loki', 'Black Panther', 'Deadpool', 'Doctor Strange', 'Ant Man', 'Captain Marvel'])
    // List 2 consisting of all DC super heroes
    const [list2, setList2] = React.useState(['BatMan', 'SuperMan', 'Wonder Woman', 'Flash', 'Green Lantern', 'AquaMan', 'Robin', 'Cyborg', 'StarFire', 'HawkGirl', 'Shazam'])
    // List 2 consisting of all DC super heroes
    const [list3, setList3] = React.useState(['BatMan2','Batman3'])

    const deleteItem = (list, index) => {
        return list.splice(index, 1)
    }

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;
     
        const moveItem = (fromList, toList) => {
           const [removed] = fromList.splice(source.index, 1);
           toList.splice(destination.index, 0, removed);
        };
     
        if (source.droppableId === destination.droppableId) {
           if (source.droppableId === 'Todo_drop_area') {
              moveItem(list1, list1);
           } else if (source.droppableId === 'InProgress_drop_area') {
              moveItem(list2, list2);
           } else if (source.droppableId === 'Done_drop_area') {
              moveItem(list3, list3);
           }
        } else if (source.droppableId === 'Todo_drop_area'){
           if (destination.droppableId === 'InProgress_drop_area') {
                moveItem(list1, list2);
           } else {
                moveItem(list1, list3);
           }
        } else if (source.droppableId === 'InProgress_drop_area'){
            if (destination.droppableId === 'Todo_drop_area') {
                 moveItem(list2, list1);
            } else {
                 moveItem(list2, list3);
            }
         } else if (source.droppableId === 'Done_drop_area'){
            if (destination.droppableId === 'Todo_drop_area') {
                 moveItem(list3, list1);
            } else {
                 moveItem(list3, list2);
            }
         }
        setList1([...list1]);
        setList2([...list2]);
        setList3([...list3]);
     };
       
     
    return (
        
         <div>
            <TopNavBar></TopNavBar>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '50px' }}>
               <h2>Dashboard id {dId}</h2>
               <User />
            </div>
         
            <DragDropContext onDragEnd={onDragEnd}>
                  <Column Marvel={list1} DC={list2} DC2={list3} />
            </DragDropContext>
         </div>
        
    );
}


export default DashboardInfo;
  
