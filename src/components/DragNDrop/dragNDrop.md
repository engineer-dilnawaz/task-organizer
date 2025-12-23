# Drag & Drop Guide (dnd-kit)

## What it does

- Two droppable columns: Incompleted / Completed.
- Dragging a task card between columns updates its `completed` flag in the Zustand store.
- Empty columns show a hint; droppable areas highlight on hover.

## Key files

- `src/pages/DragDrop.tsx` — wraps the view in `DndContext`, defines columns, handles `onDragEnd` to flip `completed`.
- `src/components/DragNDrop/ListContainer.tsx` — droppable column via `useDroppable`; hover styles and empty-state hint.
- `src/components/DragNDrop/ListItem.tsx` — draggable task via `useDraggable`; applies transform during drag.
- `src/stores/useTasks.ts` — task store with `editTask` used to update `completed`.

## Dependencies

```bash
npm install @dnd-kit/core
```

## Flow in `DragDrop.tsx`

1. Wrap UI with `DndContext` and supply `onDragEnd`.
2. Columns have droppable IDs: `"incompleted"` and `"completed"`.
3. On drag end:
   - Read `active.id` (task id) and `over?.id` (column).
   - If dropped on `"completed"`, set `completed: true`; on `"incompleted"`, set `completed: false`.
   - No-op if dropped back into the same column.

Pseudo-snippet:

```ts
const handleDragEnd = ({ active, over }) => {
  if (!over) return;
  const taskId = active.id;
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;
  const shouldBeCompleted = over.id === "completed";
  if (task.completed === shouldBeCompleted) return;
  editTask(taskId, { ...task, completed: shouldBeCompleted });
};
```

## Making items draggable (`ListItem`)

- `useDraggable({ id: task.id })`
- Apply:
  - `ref={setNodeRef}`
  - `{...listeners} {...attributes}`
  - Optional transform style from `transform` for smooth dragging

Example:

```tsx
const { attributes, listeners, setNodeRef, transform, isDragging } =
  useDraggable({ id: task.id });
const style = transform
  ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
  : undefined;
```

## Making drop zones (`ListContainer`)

- `useDroppable({ id: droppableId })`
- Apply `ref={setNodeRef}` and use `isOver` to style hover state.
- Show empty-state text when `listItems` is empty.

Example styling cue:

```tsx
const { isOver, setNodeRef } = useDroppable({ id: droppableId });
const borderColor = isOver ? "border-primary" : "border-base-300";
```

## Recreate checklist

- Install `@dnd-kit/core`.
- Wrap with `DndContext` + `onDragEnd`.
- For items: `useDraggable`, apply ref/listeners/attributes, handle transform.
- For targets: `useDroppable`, apply ref, use `isOver` for UI feedback.
- In `onDragEnd`, update your state/store based on `over.id`.
- Add empty/hover cues for clarity.

## Common pitfalls

- Missing unique IDs for draggable items or droppable zones.
- Forgetting to guard `onDragEnd` when `over` is null (drop outside).
- Not preventing redundant updates when dropping into the same column.
- No height constraint on scrollable area: ensure the main content has `flex-1 min-h-0 overflow-y-auto` within a full-height container.
