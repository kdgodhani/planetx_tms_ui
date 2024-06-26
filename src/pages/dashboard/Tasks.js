import React from "react";
import Board from "react-trello";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasks } from "../../features/tasks/allTasksSlice";
import { Loading } from "../../components";
import { useEffect } from "react";
import { mapData } from "../../utils/taskMaper";
import { useState } from "react";
import { updateTaskState } from "../../features/tasks/allTasksSlice";
import { TaskModal } from "../../components/TaskModal";
import { Divider } from "@mui/material";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { getCurrentTask,deleteTask } from "../../features/currentProject/currentProjectSlice";
import { setDashboardText } from "../../features/user/userSlice";
import CustomCard from "../../components/CustomCard"; 


export const Tasks = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, tasks, totalTasks } = useSelector((store) => store.allTasks);

  // console.log(tasks,"this is task --- ")

  useEffect(() => {
    dispatch(getAllTasks());
    dispatch(setDashboardText("Received Tasks"));
  }, [dispatch]);

  const handleDragEnd = async (cardId, sourceLaneId, targetLaneId) => {
    const info = { idTask: cardId, newState: targetLaneId };
    await dispatch(updateTaskState(info));
    await dispatch(getAllTasks());
  };

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleCardClick = (taskId) => {
    if (!modalIsOpen) toggleModal();
    dispatch(getCurrentTask(taskId));
    setCurrentTaskId(taskId);
  };

  const handleDelete = async (taskId) => {
    await dispatch(deleteTask(taskId));
    await dispatch(getAllTasks());
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <div className="main">
        <div style={{ paddingLeft: "5%" }}>
          <p style={{ marginBottom: "2px", color: "#576574" }}>
            {totalTasks} task{tasks.length > 1 && "s"} found
          </p>
          <Divider sx={{ marginBottom: "2%", marginTop: "2px" }} />
          <p
            style={{
              marginBottom: "2px",
              color: "#576574",
              fontSize: "smaller",
              marginLeft: "35%",
            }}
          >
            click on the task to see more
          </p>
          <Board
            data={mapData(tasks, false)}
            editable
            cardDraggable
            style={{ backgroundColor: " #F6F2FF" }}
            handleDragEnd={handleDragEnd}
            // components={{ Card: CustomCard }}
            // onCardClick={(cardId) => handleCardClick(cardId)}
            components={{ Card: (props) => <CustomCard {...props} onDelete={handleDelete} onClick={handleCardClick} /> }}
          />
          {modalIsOpen && (
            <TaskModal
              currentTaskId={currentTaskId}
              toggleModal={toggleModal}
              manager={true}
            />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .react-trello-lane {
    border: 50;
    background-color: #bfc5fe;
  }
  .main {
    background-color: #f9f6ff;
    border-radius: 1%;
    padding: 1%;
  }
`;
