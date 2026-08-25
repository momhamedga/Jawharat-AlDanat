import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}



/**
 * Validates links to only permit safe protocols (https, http, mailto).
 * Strictly disallows javascript:, data:, vbscript:, etc.
 */
function isSafeUrl(url: string): boolean {
  const trimmed = url.trim().toLowerCase();
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) return true;
  if (trimmed.startsWith('https://') || trimmed.startsWith('http://') || trimmed.startsWith('mailto:')) {
    return true;
  }
  return false;
}

/**
 * Parses inline markdown tokens (Bold, Italic, Links, Code).
 */
function renderInline(text: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  // Regex for bold **text**, italic *text*, links [label](url), inline code `code`
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g;
  const parts = text.split(regex);

  parts.forEach((part, i) => {
    if (!part) return;

    if (part.startsWith('**') && part.endsWith('**')) {
      tokens.push(<strong key={i} className="font-extrabold text-foreground">{part.slice(2, -2)}</strong>);
    } else if (part.startsWith('*') && part.endsWith('*')) {
      tokens.push(<em key={i} className="italic text-foreground/90">{part.slice(1, -1)}</em>);
    } else if (part.startsWith('`') && part.endsWith('`')) {
      tokens.push(
        <code key={i} className="px-1.5 py-0.5 rounded-md bg-secondary text-primary font-mono text-xs">
          {part.slice(1, -1)}
        </code>
      );
    } else if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        const [, label, url] = match;
        if (isSafeUrl(url)) {
          tokens.push(
            <a
              key={i}
              href={url}
              target={url.startsWith('http') ? '_blank' : undefined}
              rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary font-semibold transition-colors"
            >
              {label}
            </a>
          );
        } else {
          tokens.push(<span key={i}>{label}</span>);
        }
      } else {
        tokens.push(<span key={i}>{part}</span>);
      }
    } else {
      tokens.push(<span key={i}>{part}</span>);
    }
  });

  return tokens;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  if (!content) return null;

  // Split into block paragraphs / elements
  const rawBlocks = content.split(/\n\s*\n/);

  return (
    <div className={`space-y-6 text-foreground/90 leading-relaxed ${className}`}>
      {rawBlocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Heading 2: ## Title
        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={index}
              className="text-xl sm:text-2xl md:text-3xl font-black text-foreground pt-6 pb-2 tracking-tight border-b border-border/40"
            >
              {renderInline(trimmed.slice(3))}
            </h2>
          );
        }

        // Heading 3: ### Subtitle
        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={index}
              className="text-lg sm:text-xl font-bold text-foreground pt-4 pb-1 tracking-tight"
            >
              {renderInline(trimmed.slice(4))}
            </h3>
          );
        }

        // Blockquote: > Quote
        if (trimmed.startsWith('> ')) {
          const quoteLines = trimmed
            .split('\n')
            .map((line) => line.replace(/^>\s?/, ''))
            .join(' ');
          return (
            <blockquote
              key={index}
              className="my-6 p-4 sm:p-5 rounded-2xl bg-secondary/30 border-s-4 border-primary italic text-foreground font-medium text-base sm:text-lg"
            >
              {renderInline(quoteLines)}
            </blockquote>
          );
        }

        // Unordered List: - item or * item
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split('\n').filter((l) => l.trim().startsWith('- ') || l.trim().startsWith('* '));
          return (
            <ul key={index} className="list-disc list-inside space-y-2 ps-2 text-foreground/90 sm:text-base">
              {items.map((item, itemIdx) => (
                <li key={itemIdx} className="leading-relaxed">
                  {renderInline(item.replace(/^[-*]\s+/, ''))}
                </li>
              ))}
            </ul>
          );
        }

        // Standard Paragraph
        return (
          <p key={index} className="leading-relaxed sm:leading-loose text-foreground/90 whitespace-pre-line sm:text-lg">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
