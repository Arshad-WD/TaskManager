"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchApi("/tasks");
      setTasks(data);
    } catch (err: any) {
      if (err.message.includes("token") || err.message.includes("Access denied")) {
        router.push("/login"); // Not authenticated
      }
      setError("Failed to load tasks from internal network.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    setIsSubmitting(true);
    try {
      const task = await fetchApi("/tasks", {
        method: "POST",
        body: JSON.stringify({ title: newTaskTitle, description: newTaskDesc }),
      });
      setTasks([task, ...tasks]);
      setNewTaskTitle("");
      setNewTaskDesc("");
      setIsAdding(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTask = async (id: string, currentStatus: boolean) => {
    // Optimistic UI update
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !currentStatus } : t)));
    try {
      await fetchApi(`/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({ completed: !currentStatus }),
      });
    } catch (err) {
      // Revert if API fails
      setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: currentStatus } : t)));
      console.error(err);
    }
  };

  const deleteTask = async (id: string) => {
    const previousTasks = [...tasks];
    // Optimistic UI update
    setTasks(tasks.filter(t => t.id !== id));
    try {
       await fetchApi(`/tasks/${id}`, { method: "DELETE" });
    } catch(err) {
      // Revert if API fails
      setTasks(previousTasks);
      console.error(err);
    }
  }

  return (
      <main className="min-h-screen p-6 md:p-12 relative">
        {/* Glow Effects */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-container/10 rounded-full blur-[100px] pointer-events-none" />
        
        <header className="flex justify-between items-center mb-12 relative z-10">
          <div>
            <h2 className="text-3xl font-display font-medium text-white">Command Dashboard</h2>
            <p className="text-on-surface-variant mt-1 text-sm">System Operations & Active Execution Threads</p>
          </div>
          <button onClick={() => setIsAdding(!isAdding)} className="primary-btn px-4 py-2 text-sm shadow-[0_4px_14px_rgba(157,0,255,0.2)]">
            {isAdding ? "CANCEL" : "+ INITIALIZE TASK"}
          </button>
        </header>

        {isAdding && (
          <div className="glass-card p-6 mb-8 relative z-10 animate-in fade-in slide-in-from-top-4">
            <form onSubmit={handleAddTask} className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Operation Designation (Title)" 
                className="input-field"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                autoFocus
              />
              <input 
                type="text" 
                placeholder="Execution Parameters (Description)..." 
                className="input-field"
                value={newTaskDesc}
                onChange={(e) => setNewTaskDesc(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <button type="submit" disabled={isSubmitting} className="primary-btn text-sm py-2 px-6">
                  {isSubmitting ? "SYNCING..." : "DEPLOY TO MATRIX"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {loading ? (
            <p className="text-on-surface animate-pulse">Syncing with network...</p>
          ) : tasks.length === 0 ? (
            <div className="col-span-full py-12 text-center text-on-surface-variant border border-dashed border-white/10 rounded-xl">
              No active tasks found in the database layer.
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="glass-card p-6 hover:border-brand-primary/30 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs font-bold tracking-widest px-2 py-1 rounded-full ${task.completed ? 'bg-brand-tertiary/10 text-brand-tertiary border border-brand-tertiary/20 shadow-[0_0_8px_rgba(0,220,229,0.2)]' : 'bg-[#ffb4ab]/10 text-[#ffb4ab] border border-[#ffb4ab]/20'}`}>
                      {task.completed ? "EXECUTED" : "PENDING"}
                    </span>
                    <button onClick={() => deleteTask(task.id)} className="text-on-surface-variant hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                  </div>
                  <h3 className="text-lg font-display text-white mb-2 leading-tight">{task.title}</h3>
                  <p className="text-sm text-on-surface-variant mb-6 line-clamp-3">{task.description}</p>
                </div>
                
                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[10px] text-on-surface-variant font-mono tracking-widest uppercase">ID: {task.id.substring(0, 8)}</span>
                  <button 
                    onClick={() => toggleTask(task.id, task.completed)}
                    className="text-xs font-semibold text-brand-primary hover:text-white transition-colors uppercase tracking-wider"
                  >
                    {task.completed ? "Revert" : "Complete"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
  );
}
