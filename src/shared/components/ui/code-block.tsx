import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';

// Register languages
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('css', css);

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: string;
}

export function CodeBlock({ children, className = '', language = 'javascript' }: CodeBlockProps) {
  // Extract language from className (e.g., "language-javascript")
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : language;

  return (
    <div className="relative group">
      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => navigator.clipboard.writeText(children)}
          className="p-2 bg-primary/10 hover:bg-primary/20 rounded-md text-sm text-primary transition-colors"
          title="Copy code"
        >
          Copy
        </button>
      </div>
      <SyntaxHighlighter
        language={lang}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          padding: '1.5rem',
        }}
        wrapLongLines
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}