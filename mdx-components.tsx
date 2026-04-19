import type { ComponentProps } from "react";
import { Children, isValidElement } from "react";
import type { MDXComponents } from "mdx/types";
import { MdxImage } from "@/components/mdx-image";

type MarkdownImageProps = ComponentProps<"img">;

function isImageParagraphChild(child: React.ReactNode) {
  if (!isValidElement(child)) {
    return false;
  }

  if (child.type === "img") {
    return true;
  }

  const props = child.props as { src?: unknown };
  return typeof props.src === "string";
}

export function getMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="mdx-h1">{children}</h1>,
    h2: ({ children }) => <h2 className="mdx-h2">{children}</h2>,
    p: ({ children }) => {
      const childNodes = Children.toArray(children).filter((child) => {
        return !(typeof child === "string" && child.trim() === "");
      });
      const isImageOnlyParagraph =
        childNodes.length === 1 &&
        isImageParagraphChild(childNodes[0]);

      if (isImageOnlyParagraph) {
        return <>{children}</>;
      }

      return <p className="mdx-p">{children}</p>;
    },
    ul: ({ children }) => <ul className="mdx-ul">{children}</ul>,
    ol: ({ children }) => <ol className="mdx-ol">{children}</ol>,
    li: ({ children }) => <li className="mdx-li">{children}</li>,
    code: ({ children }) => <code className="mdx-code">{children}</code>,
    pre: ({ children }) => <pre className="mdx-pre">{children}</pre>,
    a: ({ children, href }) => (
      <a className="mdx-link" href={href}>
        {children}
      </a>
    ),
    img: ({ src, alt }: MarkdownImageProps) => {
      if (!src || typeof src !== "string") {
        return null;
      }

      return <MdxImage src={src} alt={alt} />;
    },
    ...components,
  };
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return getMDXComponents(components);
}
