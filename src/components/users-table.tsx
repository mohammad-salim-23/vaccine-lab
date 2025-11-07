"use client";

import {
  CheckCircle,
  FileTextIcon,
  Loader2,
  PauseIcon,
  PlayIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Task {
  id: string;
  name: string;
  email: string;
  status: "pending" | "in-progress" | "completed" | "blocked";
  role: string;
}

type TaskActionType = "start" | "pause" | "complete" | "delete" | "view";

const tasks: Task[] = [
  {
    id: "TASK-001",
    name: "John Doe",
    email: "sarah.chen@example.com",
    status: "in-progress",
    role: "Developer",
  },
  {
    id: "TASK-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Designer",
    status: "completed",
  },
  {
    id: "TASK-003",
    name: "Emma Rodriguez",
    email: "emma.rodriguez@example.com",
    status: "pending",
    role: "Developer",
  },
  {
    id: "TASK-004",
    name: "James Wilson",
    email: "james.wilson@example.com",
    status: "in-progress",
    role: "Developer",
  },
  {
    id: "TASK-005",
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    status: "blocked",
    role: "Developer",
  },
  {
    id: "TASK-006",
    name: "Lucas Anderson",
    email: "lucas.anderson@example.com",
    status: "pending",
    role: "Developer",
  },
  {
    id: "TASK-007",
    name: "Sophia Taylor",
    email: "sophia.taylor@example.com",
    status: "completed",
    role: "QA Engineer",
  },
];

function getStatusBadge(status: Task["status"]) {
  switch (status) {
    case "pending":
      return (
        <Badge
          variant="outline"
          className="bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20 border-0"
        >
          Pending
        </Badge>
      );
    case "in-progress":
      return (
        <Badge
          variant="outline"
          className="bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 border-0"
        >
          In Progress
        </Badge>
      );
    case "completed":
      return (
        <Badge
          variant="outline"
          className="bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20 border-0"
        >
          Completed
        </Badge>
      );
    case "blocked":
      return (
        <Badge
          variant="outline"
          className="bg-rose-500/15 text-rose-700 hover:bg-rose-500/25 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 border-0"
        >
          Blocked
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export default function UsersTable() {
  const [pendingAction, setPendingAction] = useState<{
    id: string;
    type: TaskActionType;
  } | null>(null);

  const isTaskActionPending = (action: TaskActionType, taskId: string) =>
    pendingAction?.id === taskId && pendingAction.type === action;

  const isTaskBusy = (taskId: string) => pendingAction?.id === taskId;

  const handleAction = (task: Task, actionType: TaskActionType) => {
    setPendingAction({ id: task.id, type: actionType });
    setTimeout(() => {
      setPendingAction(null);
      console.log(`Action "${actionType}" completed for task:`, task.name);
    }, 1000);
  };

  const renderTaskRow = (task: Task) => {
    const busy = isTaskBusy(task.id);
    const startPending = isTaskActionPending("start", task.id);
    const pausePending = isTaskActionPending("pause", task.id);
    const completePending = isTaskActionPending("complete", task.id);
    const deletePending = isTaskActionPending("delete", task.id);

    return (
      <TableRow key={task.id} className="hover:bg-muted/50">
        <TableCell className="h-10 px-4 font-medium">{task.name}</TableCell>
        <TableCell className="h-10 px-4 text-sm text-muted-foreground">
          {task.email}
        </TableCell>
        <TableCell className="h-10 px-4">
          {getStatusBadge(task.status)}
        </TableCell>

        <TableCell className="h-10 px-4 text-sm text-muted-foreground">
          {task.role}
        </TableCell>

        <TableCell className="h-10 px-4">
          <TooltipProvider>
            <div className="flex items-center gap-1">
              {(task.status === "pending" || task.status === "blocked") && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleAction(task, "start")}
                      disabled={busy}
                    >
                      {startPending ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <PlayIcon className="size-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Start</TooltipContent>
                </Tooltip>
              )}
              {task.status === "in-progress" && (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleAction(task, "pause")}
                        disabled={busy}
                      >
                        {pausePending ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <PauseIcon className="size-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Pause</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleAction(task, "complete")}
                        disabled={busy}
                      >
                        {completePending ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <CheckCircle className="size-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Complete</TooltipContent>
                  </Tooltip>
                </>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive hover:text-white"
                    onClick={() => handleAction(task, "delete")}
                    disabled={busy}
                  >
                    {deletePending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2Icon className="size-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleAction(task, "view")}
                    disabled={busy}
                  >
                    <FileTextIcon className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View Details</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="rounded-lg border bg-card w-[95%]">
      <h3 className="p-4 text-lg font-semibold">Registered Users</h3>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="h-10 px-3 font-medium">User</TableHead>
            <TableHead className="h-10 px-3 font-medium">Email</TableHead>
            <TableHead className="h-10 px-3 font-medium w-[120px]">
              Status
            </TableHead>

            <TableHead className="h-10 px-3 font-medium">Role</TableHead>
            <TableHead className="h-10 px-3 font-medium w-[180px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{tasks.map(renderTaskRow)}</TableBody>
      </Table>
    </div>
  );
}
