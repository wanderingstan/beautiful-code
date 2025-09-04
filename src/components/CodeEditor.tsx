import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import {
  variableSizeTheme,
  variableSizePlugin,
} from "../extensions/variableFontSize";

interface CodeEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  theme?: "light" | "dark";
  language?: "javascript" | "typescript" | "python";
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue = '// Welcome to the CodeMirror editor!\nconsole.log("Hello, World!");',
  onChange,
  theme = "dark",
  language = "javascript",
}) => {
  const [code, setCode] = useState(initialValue);

  const handleChange = (value: string) => {
    setCode(value);
    if (onChange) {
      onChange(value);
    }
  };

  const getLanguageExtension = () => {
    switch (language) {
      case "python":
        return python();
      case "typescript":
        return javascript({ jsx: true, typescript: true });
      case "javascript":
      default:
        return javascript({ jsx: true });
    }
  };

  const extensions = [
    getLanguageExtension(),
    variableSizeTheme,
    variableSizePlugin,
  ];

  return (
    <div className="code-editor">
      <CodeMirror
        value={code}
        height="400px"
        theme={theme === "dark" ? oneDark : undefined}
        extensions={extensions}
        onChange={handleChange}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          highlightSelectionMatches: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;
