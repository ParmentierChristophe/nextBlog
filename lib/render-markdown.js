import marked from 'marked';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { renderToStaticMarkup } from 'react-dom/server';
import { format } from 'prettier';
import katex from 'katex';

delete defaultProps.theme;

const renderer = new marked.Renderer();

renderer.heading = (text, level, raw, slugger) => {
  const id = slugger.slug(text);
  const Component = `h${level}`;

  return renderToStaticMarkup(
    <Component>
      <a href={`#${id}`} id={id} className="header-link">
        {text}
      </a>
    </Component>
  );
};

renderer.link = (href, _, text) => `<a href=${href} target="_blank" rel="noopener noreferrer" >${text}</a>`;

renderer.checkbox = () => '';
renderer.listitem = (text, task, checked) => {
  if (task) {
    return `<li class="reset"><span class="check">&#8203;<input type="checkbox" disabled ${
      checked ? 'checked' : ''
    } /></span><span>${text}</span></li>`;
  }

  return `<li>${text}</li>`;
};
renderer.code = (code, options) => {
  const opts = options.split(' ').map((o) => o.trim());
  const language = opts[0];
  const highlight = opts
    .filter((o) => o.startsWith('highlight='))
    .pop()
    ?.replace('highlight=', '')
    .trim();
  const raw = options.includes('raw');

  let formattedCode = code;

  if (!raw) {
    try {
      formattedCode = format(code, {
        semi: false,
        singleQuote: true,
        parser: language === 'jsx' || language === 'jsx' ? 'babel' : language,
      });
    } catch (e) {}
  }

  if (!language) {
    const math = mathsExpression(code);
    if (math) {
      return math;
    }
  }

  return renderToStaticMarkup(
    <pre>
      <Code language={language} code={formattedCode} highlight={highlight} />
    </pre>
  );
};

const rendererCodespan = renderer.codespan;
renderer.codespan = function (text) {
  const math = mathsExpression(text);

  if (math) {
    return math;
  }

  return rendererCodespan(text);
};

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  renderer,
});

export default (markdown) => marked(markdown);

const Code = ({ code, language, highlight, ...props }) => {
  if (!language) return <code {...props} dangerouslySetInnerHTML={{ __html: code }} />;

  const highlightedLines = highlight
    ? highlight.split(',').reduce((lines, h) => {
        if (h.includes('-')) {
          // Expand ranges like 3-5 into [3,4,5]
          const [start, end] = h.split('-').map(Number);
          const x = Array(end - start + 1)
            .fill()
            .map((_, i) => i + start);
          return [...lines, ...x];
        }

        return [...lines, Number(h)];
      }, [])
    : [];

  // https://mdxjs.com/guides/syntax-harkedighlighting#all-together
  return (
    <Highlight {...defaultProps} code={code.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <code className={className} style={{ ...style }}>
          {tokens.map((line, i) => (
            <div
              key={i}
              {...getLineProps({ line, key: i })}
              style={
                highlightedLines.includes(i + 1)
                  ? {
                      background: 'var(--highlight)',
                      margin: '0 -1rem',
                      padding: '0 1rem',
                    }
                  : null
              }>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </code>
      )}
    </Highlight>
  );
};

const mathsExpression = (expr) => {
  if (expr.match(/^\$\$[\s\S]*\$\$$/)) {
    expr = expr.substr(2, expr.length - 4);
    return katex.renderToString(expr, { displayMode: true });
  } else if (expr.match(/^\$[\s\S]*\$$/)) {
    expr = expr.substr(1, expr.length - 2);
    return katex.renderToString(expr, { displayMode: false });
  }
};
