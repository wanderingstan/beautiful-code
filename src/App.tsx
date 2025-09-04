import React, { useState } from "react";
import "./App.css";
import CodeEditor from "./components/CodeEditor";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [language, setLanguage] = useState<
    "javascript" | "typescript" | "python"
  >("javascript");

  const handleCodeChange = (value: string) => {
    // Code change handler - can be used for future features
    console.log("Code changed:", value);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value as "javascript" | "typescript" | "python");
  };

  const getSampleCode = () => {
    switch (language) {
      case "python":
        return `# Python example with classes and functions
class Calculator:
    def __init__(self):
        self.result = 0

    def add(self, x, y):
        return x + y

    def multiply(self, x, y):
        return x * y

def main():
    calc = Calculator()
    print(calc.add(5, 3))
    print(calc.multiply(4, 7))

if __name__ == "__main__":
    main()`;
      case "typescript":
        return `// TypeScript example with classes and functions
interface User {
    name: string;
    age: number;
}

class UserManager {
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
    }

    getUser(name: string): User | undefined {
        return this.users.find(u => u.name === name);
    }
}

function createUser(name: string, age: number): User {
    return { name, age };
}

const manager = new UserManager();
manager.addUser(createUser("Alice", 30));`;
      case "javascript":
      default:
        return `// JavaScript example with classes and functions
class TodoList {
    constructor() {
        this.todos = [];
    }

    addTodo(text) {
        this.todos.push({ text, completed: false });
    }

    toggleTodo(index) {
        this.todos[index].completed = !this.todos[index].completed;
    }
}

function createTodoApp() {
    const todoList = new TodoList();
    todoList.addTodo("Learn CodeMirror");
    todoList.addTodo("Build awesome editor");
    return todoList;
}

const app = createTodoApp();
console.log(app.todos);`;
    }
  };

  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        <h1>CodeMirror React Editor</h1>
        <div className="controls">
          <button onClick={toggleTheme} className="theme-toggle">
            Switch to {theme === "dark" ? "Light" : "Dark"} Theme
          </button>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="language-select"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
          </select>
        </div>
      </header>
      <main className="App-main">
        <div className="editor-container">
          <h2>
            Code Editor - {language.charAt(0).toUpperCase() + language.slice(1)}
          </h2>
          <CodeEditor
            key={language} // Force re-render when language changes
            initialValue={getSampleCode()}
            theme={theme}
            onChange={handleCodeChange}
            language={language}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
