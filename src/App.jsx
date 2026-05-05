import { useState, useEffect } from 'react'
import styles from './App.module.css'

const STORAGE_KEY = 'task-board3-tasks'

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const initialTasks = loadTasks()
let nextId = initialTasks.length > 0 ? Math.max(...initialTasks.map(t => t.id)) + 1 : 1

export default function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask() {
    const text = input.trim()
    if (!text) return
    setTasks(prev => [...prev, { id: nextId++, text, done: false }])
    setInput('')
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    )
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTask()
  }

  const doneCount = tasks.filter(t => t.done).length

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>タスクボード</h1>
        {tasks.length > 0 && (
          <span className={styles.badge}>{doneCount} / {tasks.length} 完了</span>
        )}
      </header>

      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="新しいタスクを入力..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.addButton} onClick={addTask}>追加</button>
      </div>

      {tasks.length === 0 ? (
        <p className={styles.empty}>タスクがありません。上の入力欄から追加してください。</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map(task => (
            <li key={task.id} className={`${styles.item} ${task.done ? styles.done : ''}`}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                id={`task-${task.id}`}
              />
              <label htmlFor={`task-${task.id}`} className={styles.label}>
                {task.text}
              </label>
              <button
                className={styles.deleteButton}
                onClick={() => deleteTask(task.id)}
                aria-label={`「${task.text}」を削除`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
