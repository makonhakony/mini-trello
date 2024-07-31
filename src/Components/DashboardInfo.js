import React, { useState, useEffect } from "react";
import TopNavBar from "./TopNavBar";
import { useParams } from "react-router-dom";
import Column from "./Task/Column";
import { DragDropContext } from "react-beautiful-dnd";
import User from "./Task/User";


const DashboardInfo = () => {
   const [dashboard, setDashboard] = useState();
   const { dId } = useParams();

   const backendUrl = "http://localhost:5000"

    useEffect(() => {
        // Function to fetch data from the backend server
        const fetchData = async () => {
            try {
                const response = await fetch(`${backendUrl}/boards/${dId}`);
                const result = await response.json();
                setDashboard(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call fetchData when the component mounts
        fetchData();
    }, []);

   const [list1, setList1] = React.useState(['test1'])
   const [list2, setList2] = React.useState(['test2'])
   const [list3, setList3] = React.useState(['test3'])

   const deleteItem = (list, index) => {
      return list.splice(index, 1)
   }

   const onDragEnd = (result) => {
      const { source, destination } = result;
      if (!destination) return;

      const moveItem = (fromList, toList) => {
         const [removed] = fromList.splice(source.index, 1);
         toList.splice(destination.index, 0, removed);
         console.log(fromList.index,toList.index)
      };

      if (source.droppableId === destination.droppableId) {
         if (source.droppableId === 'Todo_drop_area') {
            moveItem(list1, list1);
         } else if (source.droppableId === 'InProgress_drop_area') {
            moveItem(list2, list2);
         } else if (source.droppableId === 'Done_drop_area') {
            moveItem(list3, list3);
         }
      } else if (source.droppableId === 'Todo_drop_area') {
         if (destination.droppableId === 'InProgress_drop_area') {
            moveItem(list1, list2);
         } else {
            moveItem(list1, list3);
         }
      } else if (source.droppableId === 'InProgress_drop_area') {
         if (destination.droppableId === 'Todo_drop_area') {
            moveItem(list2, list1);
         } else {
            moveItem(list2, list3);
         }
      } else if (source.droppableId === 'Done_drop_area') {
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
         <h2>Dashboard {dashboard ? dashboard.title : ""}</h2>
            <User />
         </div>

         <DragDropContext onDragEnd={onDragEnd}>
            <div style={{'display':'flex'}}>
               <Column List={list1} Name="To Do" Area="Todo_drop_area"/>
               <Column List={list2} Name="In Progress" Area="InProgress_drop_area"/>
               <Column List={list3} Name="Done" Area="Done_drop_area"/>
            </div>
         </DragDropContext>
      </div>

   );
}

export default DashboardInfo;

