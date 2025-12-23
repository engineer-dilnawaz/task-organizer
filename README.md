# Task Organizer

A modern, feature-rich task management application built with React, TypeScript, and Tailwind CSS. Manage your tasks efficiently with drag-and-drop, bulk operations, categories, and more.

## 🚀 Features

### Core Task Management

- ✅ **Add Tasks** - Create new tasks with custom text, category, and completion status
- ✏️ **Edit Tasks** - Modify existing tasks inline with a user-friendly form
- 🗑️ **Delete Tasks** - Remove tasks with a confirmation modal to prevent accidental deletions
- ✅ **Toggle Completion** - Mark tasks as completed or incomplete with a single click
- 🔄 **Undo Delete** - Restore recently deleted tasks within 5 seconds (auto-cleanup after timeout)

### Bulk Operations

- 📋 **Mark/Unmark Tasks** - Select multiple tasks for batch operations
- ✅ **Bulk Complete** - Complete all marked tasks at once
- 🗑️ **Bulk Delete** - Delete all marked tasks simultaneously
- 📌 **Mark All** - Quickly select or deselect all tasks
- 🎯 **Quick Action Dock** - Floating action buttons for bulk operations (appears when tasks are marked)

### Task Organization

- 📁 **Categories** - Organize tasks into custom categories
- 🏷️ **Category Management** - Create, view, and delete categories
- 🔒 **Protected Categories** - "Uncategorised" category cannot be deleted
- 📊 **Category Filtering** - Filter tasks by category

### Drag & Drop

- 🎯 **Visual Drag & Drop** - Drag tasks between "Incompleted" and "Completed" columns
- 🔄 **Swap Columns** - Swap all tasks between columns with a single click
- ✨ **Smooth Animations** - Linear slide animations when tasks move between columns
- 🎨 **Visual Feedback** - Hover effects and visual indicators during drag operations

### Statistics Dashboard

- 📈 **Total Tasks** - Display total number of tasks created
- ✅ **Completed Tasks** - Show count of completed tasks
- 📊 **Completion Percentage** - Calculate and display task completion rate
- 🔢 **Remaining Tasks** - Show number of tasks still pending
- 🎯 **Fixed Bottom Bar** - Always visible stats bar at the bottom of the screen

### Navigation & Pages

- 🏠 **Home** - Main task management page with all features
- 📋 **All Tasks** - View all tasks regardless of completion status
- ✅ **Completed** - Filter view showing only completed tasks
- ⏳ **Incompleted** - Filter view showing only pending tasks
- 📁 **Category** - Category management page
- 🔢 **Counter** - Simple counter demo page
- 🎯 **Drag & Drop** - Interactive drag-and-drop task management page

### User Interface

- 🌓 **Dark/Light Theme** - Toggle between dark and light themes with persistent preference
- 📱 **Responsive Design** - Fully responsive layout that works on all screen sizes
- 🎨 **Modern UI** - Beautiful interface built with DaisyUI components
- 🎭 **Smooth Animations** - CSS animations and transitions throughout the app
- 🔔 **Toast Notifications** - Non-intrusive notifications for task actions
- 🎯 **Confirmation Modals** - Prevent accidental deletions with confirmation dialogs
- 📜 **Scrollable Content** - Smooth scrolling with fixed header and stats bar

### Technical Features

- 💾 **Local Storage Persistence** - All tasks and settings persist across browser sessions
- 🔄 **State Management** - Zustand for efficient state management
- 🛣️ **Routing** - React Router for seamless navigation
- 📦 **TypeScript** - Full type safety throughout the application
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- 🎭 **DaisyUI** - Component library built on Tailwind CSS
- 🎯 **Drag & Drop** - @dnd-kit for accessible drag-and-drop functionality
- 🔔 **Notifications** - react-hot-toast for toast notifications

## 📦 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Zustand** - State management with persistence
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library
- **@dnd-kit/core** - Drag and drop functionality
- **react-hot-toast** - Toast notifications
- **lucide-react** - Icon library

## 🎯 Key Components

### Pages

- `Home.tsx` - Main task management interface
- `All.tsx` - View all tasks
- `Completed.tsx` - View completed tasks
- `InCompleted.tsx` - View incomplete tasks
- `Category.tsx` - Category management
- `Counter.tsx` - Counter demo
- `DragDrop.tsx` - Drag and drop interface

### Components

- `TaskForm.tsx` - Form for adding/editing tasks
- `TaskList.tsx` - List of tasks with actions
- `Task.tsx` - Individual task component
- `ConfirmationModal.tsx` - Delete confirmation dialog
- `QuickAction.tsx` - Bulk operation buttons
- `Stats.tsx` - Statistics dashboard
- `ThemeSwitch.tsx` - Theme toggle component
- `Header.tsx` - Navigation header
- `CategoryList.tsx` - List of categories
- `DragNDrop/ListItem.tsx` - Draggable task item
- `DragNDrop/ListContainer.tsx` - Droppable container

### Stores

- `useTasks.ts` - Task state management with persistence
- `useCategories.ts` - Category state management
- `useTheme.ts` - Theme state management

### Listeners

- `taskListeners.ts` - Toast notifications for task actions

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tic-tac-toe
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 📝 Usage

### Adding a Task

1. Enter task text in the input field
2. Select a category (optional, defaults to "Uncategorised")
3. Click "Add Task" or press Enter

### Editing a Task

1. Click the edit icon on any task
2. Modify the task details in the form
3. Click "Update Task" to save changes

### Deleting a Task

1. Click the delete icon on any task
2. Confirm deletion in the modal
3. Optionally undo within 5 seconds using the toast notification

### Bulk Operations

1. Click the checkbox on tasks to mark them
2. Use "Mark All" to select/deselect all tasks
3. Use the Quick Action dock to complete or delete marked tasks

### Drag and Drop

1. Navigate to the Drag & Drop page
2. Drag tasks between "Incompleted" and "Completed" columns
3. Use the swap button to swap all tasks between columns

### Managing Categories

1. Navigate to the Category page
2. Enter a category name and click "Add Category"
3. Delete categories (except "Uncategorised")

### Theme Toggle

- Click the theme toggle icon in the header to switch between dark and light themes
- Your preference is saved automatically

## 🎨 Features in Detail

### Undo Delete Feature

- When a task is deleted, a toast notification appears
- The deleted task is stored temporarily for 5 seconds
- If not restored within 5 seconds, it's permanently removed
- Prevents stale state issues with automatic cleanup

### Drag & Drop Animations

- Tasks smoothly slide between columns when moved
- Visual feedback during drag operations
- Hover effects on droppable areas

### Responsive Navigation

- Mobile-friendly dropdown menu
- Auto-closes when navigating to a new page
- Click outside to close functionality

### Statistics Dashboard

- Real-time updates as tasks change
- Handles edge cases (0 tasks, 0% completion)
- Always visible at the bottom of the screen

## 🔧 Configuration

### Local Storage Keys

- Tasks are stored under the key defined in `LOCAL_STORAGE_KEYS.TASKS`
- Theme preference is stored under `LOCAL_STORAGE_KEYS.THEME`
- Categories are stored under `LOCAL_STORAGE_KEYS.CATEGORIES`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and for personal use.

## 🙏 Acknowledgments

- DaisyUI for the beautiful component library
- Tailwind CSS for the utility-first CSS framework
- @dnd-kit for accessible drag-and-drop functionality
- react-hot-toast for toast notifications

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
