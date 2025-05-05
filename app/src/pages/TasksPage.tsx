import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button'; // For Add Task button

const TasksPage: React.FC = () => {
  // Placeholder data - Updated for parent persona
  const tasks = [
    { id: 1, description: 'Contact OAC Williamstown for a tour', status: 'Todo', priority: 'High' },
    { id: 2, description: 'Check availability at Goodstart Early Learning', status: 'Todo', priority: 'High' },
    { id: 3, description: 'Submit application for Guardian Childcare', status: 'In Progress', priority: 'Medium' },
    { id: 4, description: 'Follow up on application with Montessori Academy', status: 'Waiting', priority: 'Medium' },
    { id: 5, description: 'Review final shortlist', status: 'Todo', priority: 'Low' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button>Add Task</Button> {/* TODO: Implement add task functionality */}
      </div>

      {/* Placeholder for Kanban/alternative view toggle */}
      <p className="text-muted-foreground">Displaying as table. Kanban view coming soon.</p>

      <Table>
        <TableCaption>A list of your school application tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.id}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell className="text-right">
                {/* Placeholder for Edit/Delete buttons */}
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksPage;
