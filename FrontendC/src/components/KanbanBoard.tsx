import { useStore } from '../store/store';
import { DndContext, DragEndEvent, DragStartEvent, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MaintenanceRequest } from '../types';
import { Clock, User } from 'lucide-react';

interface KanbanColumnProps {
  id: string;
  title: string;
  requests: MaintenanceRequest[];
  color: string;
}

function KanbanColumn({ id, title, requests, color }: KanbanColumnProps) {
  const { setNodeRef } = useSortable({ id });

  const sortableIds = requests.map((r) => r.id);

  return (
    <div ref={setNodeRef} className="flex flex-col flex-shrink-0 w-72">
      <div className={`${color} px-4 py-2 rounded-t-lg`}>
        <h3 className="text-sm font-semibold text-white">
          {title} ({requests.length})
        </h3>
      </div>
      <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
        <div className="flex-1 bg-gray-100 p-4 rounded-b-lg space-y-3 min-h-[400px]">
          {requests.map((request) => (
            <KanbanCard key={request.id} request={request} />
          ))}
          {requests.length === 0 && (
            <div className="text-center text-gray-400 text-sm py-8">No requests</div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

interface KanbanCardProps {
  request: MaintenanceRequest;
}

function KanbanCard({ request }: KanbanCardProps) {
  const { users } = useStore();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: request.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const technician = request.assignedTechnicianId
    ? users.find((u) => u.id === request.assignedTechnicianId)
    : null;

  const isOverdue = request.scheduledDate
    ? new Date(request.scheduledDate) < new Date() && request.status !== 'repaired' && request.status !== 'scrap'
    : false;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg shadow p-4 cursor-move hover:shadow-md transition-shadow ${
        isOverdue ? 'border-l-4 border-red-500' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-sm text-gray-900">{request.subject}</h4>
        <span
          className={`px-2 py-0.5 text-xs font-semibold rounded ${
            request.requestType === 'preventive'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {request.requestType === 'preventive' ? 'P' : 'C'}
        </span>
      </div>
      <p className="text-xs text-gray-600 mb-2">{request.equipmentName}</p>
      {request.scheduledDate && (
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <Clock className="h-3 w-3 mr-1" />
          {new Date(request.scheduledDate).toLocaleDateString()}
          {request.duration && ` (${request.duration}h)`}
          {isOverdue && (
            <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-800 rounded text-xs font-semibold">
              Overdue
            </span>
          )}
        </div>
      )}
      {technician && (
        <div className="flex items-center mt-2">
          <div className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-semibold">
            {getInitials(technician.name)}
          </div>
          <span className="ml-2 text-xs text-gray-600">{technician.name}</span>
        </div>
      )}
      {request.maintenanceTeamName && !technician && (
        <div className="flex items-center mt-2">
          <User className="h-4 w-4 text-gray-400" />
          <span className="ml-2 text-xs text-gray-500">{request.maintenanceTeamName}</span>
        </div>
      )}
    </div>
  );
}

export default function KanbanBoard() {
  const { requests, updateRequest } = useStore();

  const columns = [
    {
      id: 'new',
      title: 'New',
      color: 'bg-gray-500',
      status: 'new' as const,
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      color: 'bg-blue-500',
      status: 'in_progress' as const,
    },
    {
      id: 'repaired',
      title: 'Repaired',
      color: 'bg-green-500',
      status: 'repaired' as const,
    },
    {
      id: 'scrap',
      title: 'Scrap',
      color: 'bg-red-600',
      status: 'scrap' as const,
    },
  ];

  const getRequestsByStatus = (status: string) => {
    return requests
      .filter((r) => r.status === status)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const requestId = active.id as string;
    const newStatus = over.id as string;

    if (['new', 'in_progress', 'repaired', 'scrap'].includes(newStatus)) {
      updateRequest(requestId, { status: newStatus as any });
    }
  };

  const handleDragStart = (_event: DragStartEvent) => {
    // Optional: Add visual feedback
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            requests={getRequestsByStatus(column.status)}
            color={column.color}
          />
        ))}
      </div>
    </DndContext>
  );
}

