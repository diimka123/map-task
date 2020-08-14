import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ListItem, ListItemText, IconButton, List, makeStyles } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const reorder = (list, startIndex, endIndex) => {
   const result = Array.from(list);
   const [removed] = result.splice(startIndex, 1);
   result.splice(endIndex, 0, removed);

   return result;
};

const useStyles = makeStyles((theme) => ({
   listRoot: {
      padding: '0px 15px',
      '&&:hover': {
         backgroundColor: '#F1FCFF'
      }
   },
   listRootActive: {
      padding: '0px 15px',
      backgroundColor: '#F1FCFF'
   },
   iconButtonRoot: {
      padding: '8px'
   }
}))

function DragDropList({ routers, setRouters }) {
   const classes = useStyles();

   const onDragEnd = (result) => {
      // dropped outside the list
      if (!result.destination) {
         return;
      }

      const items = reorder(
         routers,
         result.source.index,
         result.destination.index
      );

      setRouters(items);
   }

   return (
      routers.length === 0
         ?  
         <ListItemText
            style={{padding: "10px 0px 10px 15px"}}
            primary="Добавьте точки маршрута..."
         />
         :
         (
            <DragDropContext onDragEnd={onDragEnd}>
               <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                     <List
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                     >
                        {routers.map((item, index) => (
                           <Draggable key={item.place_id} draggableId={item.place_id} index={index}>
                              {(provided, snapshot) => (
                                 <ListItem
                                    classes={
                                       {
                                          root: snapshot.isDragging ? classes.listRootActive : classes.listRoot
                                       }
                                    }
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                 >
                                    <ListItemText
                                       primary={`${item.description}`}
                                    />
                                    <IconButton 
                                       classes={{ root: classes.iconButtonRoot }} edge="end" aria-label="delete"
                                       onClick={() => {
                                          setRouters(routers.filter(route => route.place_id !== item.place_id))
                                       }}
                                    >
                                       <HighlightOffIcon />
                                    </IconButton>
                                 </ListItem>
                              )}
                           </Draggable>
                        ))}
                        {provided.placeholder}
                     </List>
                  )}
               </Droppable>
            </DragDropContext>
         )
   )
}

export default DragDropList
