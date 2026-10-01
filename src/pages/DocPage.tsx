import { ReactNode, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { DocEntry, REPO_URL, findDocByFile } from '../docs'

interface DocPageProps {
  doc: DocEntry
}

const linkClass = 'text-quran-blue'

// Links in the documents that point at this site itself (written for readers on GitHub)
const SITE_URL = 'https://mirzaakhena.github.io/quran-checksum/'

// Maps a link written for GitHub to its place on the site
function DocLink({ href = '', children }: { href?: string; children?: ReactNode }) {
  if (href.startsWith(SITE_URL)) {
    const rest = href.slice(SITE_URL.length)
    // A file such as quran-checksum.xlsx, or a page of the site
    return /\.[a-z0-9]+$/i.test(rest.split('#')[0])
      ? <a href={`${import.meta.env.BASE_URL}${rest}`} download className={linkClass}>{children}</a>
      : <Link to={`/${rest}`} className={linkClass}>{children}</Link>
  }
  if (/^https?:\/\//.test(href) || href.startsWith('mailto:')) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>{children}</a>
  }
  if (href.startsWith('#')) {
    return <a href={href} className={linkClass}>{children}</a>
  }

  const [path, hash = ''] = href.split('#')
  const linkedDoc = findDocByFile(path.replace(/^\.\//, ''))
  if (linkedDoc) {
    return <Link to={`/${linkedDoc.slug}${hash ? `#${hash}` : ''}`} className={linkClass}>{children}</Link>
  }
  if (path.startsWith('public/')) {
    return <a href={`${import.meta.env.BASE_URL}${path.slice('public/'.length)}`} download className={linkClass}>{children}</a>
  }
  return (
    <a href={`${REPO_URL}/blob/main/${path}${hash ? `#${hash}` : ''}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  )
}

export default function DocPage({ doc }: DocPageProps) {
  const [content, setContent] = useState<string | null>(null)
  const { hash } = useLocation()

  useEffect(() => {
    let active = true
    setContent(null)
    doc.load().then((module) => { if (active) setContent(module.default) })
    return () => { active = false }
  }, [doc])

  // Headings get their ids only once the document has rendered, so jump to the anchor afterwards
  useEffect(() => {
    if (content === null) return
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [content, hash])

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Source:{' '}
        <a href={`${REPO_URL}/blob/main/${doc.file}`} target="_blank" rel="noopener noreferrer" className="text-quran-blue underline">
          {doc.file}
        </a>{' '}
        on GitHub
      </p>
      <article className="bg-white rounded-lg shadow-md p-5 sm:p-8 prose prose-slate max-w-none prose-headings:scroll-mt-4 prose-table:my-0 prose-code:before:content-none prose-code:after:content-none">
        {content === null ? (
          <p className="text-gray-500">Loading…</p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
            components={{
              a: ({ href, children }) => <DocLink href={href}>{children}</DocLink>,
              // Wide tables scroll sideways on narrow screens instead of widening the page
              table: ({ children }) => (
                <div className="overflow-x-auto my-6">
                  <table>{children}</table>
                </div>
              )
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </article>
    </div>
  )
}
