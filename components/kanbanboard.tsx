import React, { useEffect } from 'react';
import { TaskData } from '@/utils/interface';

type KanbanBoardProps = {
  tasks: TaskData[];
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
  const sortedTasks = tasks.sort((a, b) => {
    const priorityOrder = ["low", "medium", "high", "urgent"];
    return priorityOrder.indexOf(a.priority?.toLowerCase() || "") - priorityOrder.indexOf(b.priority?.toLowerCase() || "");
  });

  useEffect(() => {
    let dragTemp: HTMLElement | null = null;

    // Handle drag start
    document.querySelectorAll('.drag').forEach(item => {
      item.addEventListener('dragstart', (e) => {
        dragTemp = e.target as HTMLElement;
        console.log('dragStart', dragTemp);
      });
    });

    // Handle drag over for drop areas
    document.querySelectorAll('.drop').forEach(dropZone => {
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
    });

    // Handle drop
    document.querySelectorAll('.drop').forEach(dropZone => {
      dropZone.addEventListener('drop', () => {
        if (dragTemp) {
          dropZone.appendChild(dragTemp);
        }
      });
    });

    return () => {
      // Cleanup event listeners
      document.querySelectorAll('.drag').forEach(item => {
        item.removeEventListener('dragstart', () => {});
      });

      document.querySelectorAll('.drop').forEach(dropZone => {
        dropZone.removeEventListener('dragover', () => {});
        dropZone.removeEventListener('drop', () => {});
      });
    };
  }, []);

  return (
    <div className="mt-6 grid grid-cols-3 gap-4">
      <div className="bg-blue-100 p-4 rounded-md drop" style={{ transform: 'rotate(-5deg)' }}>
        <h3 className="font-bold text-blue-800">Not Started</h3>
        {sortedTasks.filter(task => task.status === 'Not Started').map(task => (
          <div key={task._id} draggable="true" className="mt-2 p-2 bg-white rounded-md shadow-md drag">
            {task.taskName}
          </div>
        ))}
        {/* Mock-up example tasks */}
        <div draggable="true" className="mt-2 p-2 bg-white rounded-md shadow-md drag">Example Task 1</div>
      </div>
      <div className="bg-yellow-100 p-4 rounded-md drop" style={{ transform: 'rotate(-5deg)' }}>
        <h3 className="font-bold text-yellow-800">In Progress</h3>
        {sortedTasks.filter(task => task.status === 'In Progress').map(task => (
          <div key={task._id} draggable="true" className="mt-2 p-2 bg-white rounded-md shadow-md drag">
            {task.taskName}
          </div>
        ))}
        {/* Mock-up example tasks */}
        <div draggable="true" className="mt-2 p-2 bg-white rounded-md shadow-md drag">Example Task 2</div>
      </div>
      <div className="bg-green-100 p-4 rounded-md drop" style={{ transform: 'rotate(-5deg)' }}>
        <h3 className="font-bold text-green-800">Completed</h3>
        {sortedTasks.filter(task => task.status === 'Completed').map(task => (
          <div key={task._id} draggable="true" className="mt-2 p-2 bg-white rounded-md shadow-md drag">
            {task.taskName}
          </div>
        ))}
        {/* Mock-up example tasks */}
        <div draggable="true" className="mt-2 p-2 bg-white rounded-md shadow-md drag">Example Task 3</div>
      </div>
    </div>
  );
};

export default KanbanBoard;