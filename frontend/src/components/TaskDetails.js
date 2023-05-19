// import { useState } from 'react';
// import { useTaskContext } from '../hooks/useTaskContext';

// const TaskDetails = ({ task, onToggleComplete }) => {
//   const { dispatch } = useTaskContext();
//   const [completed, setCompleted] = useState(task.completed);


//   // handling delete clicks
//   const handleClick = async() => {
//     const response = await fetch('/api/tasks/' +task._id, {
//       method: 'DELETE',
//       })
//       const json = await response.json()
      
//       if (response.ok) {
//         dispatch({type: 'DELETE_TASK', payload: json})
//       }
//     }


//   const handleCheckboxClick = () => {
//     const newCompleted = !completed;
//     setCompleted(newCompleted);
//     onToggleComplete(task.id, newCompleted);
//   };

//   const createdAtDate = new Date(task.createdAt).toLocaleDateString();

//   return (
//     <div className="task-details">
//       <h4>{task.title}</h4>
//       <p>
//         <span
//           className={`checkbox ${completed ? "checked" : ""}`}
//           onClick={handleCheckboxClick}
//         ></span>{" "}
//       </p>
//       <p className="task-description">{task.description}</p>
//       <p className="created-at">{createdAtDate}</p>
//       <span onClick={handleClick}>delete</span>
//     </div>
//   );
// };

// export default TaskDetails;

import { useState } from 'react';
import { useTaskContext } from '../hooks/useTaskContext';

const TaskDetails = ({ task, onToggleComplete }) => {
  const { dispatch } = useTaskContext();
  const [completed, setCompleted] = useState(task.completed);

  // handling delete clicks
  const handleClick = async () => {
    const response = await fetch('/api/tasks/' + task._id, {
      method: 'DELETE',
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_TASK', payload: json });
    }
  };

  const handleCheckboxClick = () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    onToggleComplete(task.id, newCompleted);
  };

  const createdAtDate = new Date(task.createdAt).toLocaleDateString();

  return (
    <div className="task-details">
      <div className="title-container">
        <input
          className={`checkbox ${completed ? 'checked' : ''}`}
          onClick={handleCheckboxClick}
        />
        <h4>{task.title}</h4>
      </div>
      <p className="task-description">{task.description}</p>
      <p className="created-at">{createdAtDate}</p>
      <span className="delete-button" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default TaskDetails;
