# CodeMirror React Editor

A minimal viable product (MVP) of a React + TypeScript application featuring a CodeMirror-based code editor.

## Features

- **Modern Code Editor**: Built with @uiw/react-codemirror for a professional coding experience
- **JavaScript/TypeScript Support**: Syntax highlighting and language features for JavaScript
- **Theme Toggle**: Switch between light and dark themes
- **Responsive Design**: Clean, modern UI that works on different screen sizes
- **TypeScript**: Full TypeScript support for type safety

## Technologies Used

- **React 18** - Modern React with functional components and hooks
- **TypeScript** - Type-safe JavaScript development
- **@uiw/react-codemirror** - CodeMirror 6 React wrapper
- **@codemirror/lang-javascript** - JavaScript language support
- **@codemirror/theme-one-dark** - Dark theme for the editor

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

### Building for Production

Create a production build:

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   └── CodeEditor.tsx     # Main CodeMirror editor component
├── App.tsx                # Main application component
├── App.css                # Application styles
└── index.tsx              # Application entry point
```

## CodeEditor Component

The `CodeEditor` component is a reusable React component that wraps CodeMirror with the following features:

- Configurable theme (light/dark)
- Language support (JavaScript/TypeScript)
- Line numbers and syntax highlighting
- Bracket matching and auto-closing
- Code folding
- Auto-completion

### Props

- `initialValue?: string` - Initial code content
- `onChange?: (value: string) => void` - Callback when code changes
- `theme?: 'light' | 'dark'` - Editor theme
- `language?: 'javascript' | 'typescript'` - Programming language

## Customization

The editor can be easily extended with additional CodeMirror extensions:

- More language support (@codemirror/lang-\*)
- Additional themes
- Custom key bindings
- Linting and error checking
- Code formatting

## License

This project is open source and available under the MIT License.
