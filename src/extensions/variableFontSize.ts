import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";
import { syntaxTree } from "@codemirror/language";
import { RangeSetBuilder } from "@codemirror/state";

// Theme for different font sizes
export const variableSizeTheme = EditorView.theme({
  ".cm-large-text": {
    fontSize: "1.4em",
    lineHeight: "1.6em",
    fontWeight: "600",
  },
  ".cm-medium-text": {
    fontSize: "1.2em",
    lineHeight: "1.4em",
    fontWeight: "500",
  },
});

// Plugin to apply variable font sizes based on syntax
export const variableSizePlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = this.buildDecorations(view);
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = this.buildDecorations(update.view);
      }
    }

    buildDecorations(view: EditorView) {
      const builder = new RangeSetBuilder<Decoration>();

      for (let { from, to } of view.visibleRanges) {
        syntaxTree(view.state).iterate({
          from,
          to,
          enter: (node) => {
            // JavaScript/TypeScript patterns
            if (
              node.name === "FunctionDeclaration" ||
              node.name === "FunctionExpression" ||
              node.name === "ArrowFunction"
            ) {
              // Look for function name
              const nameNode =
                node.node.getChild("VariableDefinition") ||
                node.node.getChild("PropertyName");
              if (nameNode) {
                builder.add(
                  nameNode.from,
                  nameNode.to,
                  Decoration.mark({ class: "cm-large-text" })
                );
              }
            }

            // Class declarations
            if (node.name === "ClassDeclaration") {
              const nameNode = node.node.getChild("VariableDefinition");
              if (nameNode) {
                builder.add(
                  nameNode.from,
                  nameNode.to,
                  Decoration.mark({ class: "cm-large-text" })
                );
              }
            }

            // Method definitions
            if (
              node.name === "MethodDefinition" ||
              node.name === "PropertyDefinition"
            ) {
              const nameNode = node.node.getChild("PropertyName");
              if (nameNode) {
                builder.add(
                  nameNode.from,
                  nameNode.to,
                  Decoration.mark({ class: "cm-medium-text" })
                );
              }
            }

            // Python patterns
            if (node.name === "FunctionDefinition") {
              // Python function definition
              let current = node.node.firstChild;
              while (current) {
                if (current.name === "VariableName") {
                  builder.add(
                    current.from,
                    current.to,
                    Decoration.mark({ class: "cm-large-text" })
                  );
                  break;
                }
                current = current.nextSibling;
              }
            }

            if (node.name === "ClassDefinition") {
              // Python class definition
              let current = node.node.firstChild;
              while (current) {
                if (current.name === "VariableName") {
                  builder.add(
                    current.from,
                    current.to,
                    Decoration.mark({ class: "cm-large-text" })
                  );
                  break;
                }
                current = current.nextSibling;
              }
            }

            // Python method definitions (inside classes)
            if (node.name === "FunctionDefinition") {
              // Check if we're inside a class by looking at parent nodes
              let parent = node.node.parent;
              let inClass = false;
              while (parent) {
                if (parent.name === "ClassDefinition") {
                  inClass = true;
                  break;
                }
                parent = parent.parent;
              }

              if (inClass) {
                let current = node.node.firstChild;
                while (current) {
                  if (current.name === "VariableName") {
                    builder.add(
                      current.from,
                      current.to,
                      Decoration.mark({ class: "cm-medium-text" })
                    );
                    break;
                  }
                  current = current.nextSibling;
                }
              }
            }
          },
        });
      }

      return builder.finish();
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);
