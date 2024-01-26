import { Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SpaceView/SpaceList";
import TaskView from "./components/TaskView/TaskView";
import { getAllTasksInSpace } from "./services/api";
import { useEffect, useState } from "react";

function App() {
  const [activeSpace, setActiveSpace] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetchTask(activeSpace);
  }, [activeSpace])

  const fetchTask = async () => {
    try {
      const tasks = await getAllTasksInSpace(activeSpace)
      setTasks(tasks)
      console.log(tasks)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar fetchTask={fetchTask} spaceId={activeSpace}/>
      <Flex height={'calc(100vh - 64px)'}>
        <Sidebar fetchTask={fetchTask} activeSpace={activeSpace} setActiveSpace={setActiveSpace} />
        <TaskView fetchTask={fetchTask} tasks={tasks} spaceId={activeSpace} />
      </Flex>
    </>
  );
}

export default App;
