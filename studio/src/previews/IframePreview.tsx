import React from 'react'
import { format } from 'date-fns'
import styles from './IframePreview.module.css'

/**
 * More examples of previews:
 *
 * https://www.sanity.io/blog/evolve-authoring-experiences-with-views-and-split-panes
 */

interface IframePreviewProps {
  document: {
    displayed?: {
      slug: {
        current: string
      }
      publishedAt: Date
    }
  }
  options: {
    previewURL: string | null | undefined
  }
}

export default function IframePreview(props: IframePreviewProps) {
  const { options } = props
  const { displayed } = props.document

  if (!displayed) {
    return (
      <div className={styles.componentWrapper}>
        <p>There is no document to preview</p>
      </div>
    )
  }

  const { slug, publishedAt } = displayed
  const { previewURL } = options
  let url = ''

  if (slug && previewURL) {
    const dateSegment = format(new Date(publishedAt), 'yyyy/MM')
    const path = `/${dateSegment}/${slug.current}/`
    url = `${previewURL}/blog${path}`
  } else {
    console.warn('Missing slug or preview URL: ', { slug, previewURL })
  }

  if (!url) {
    return (
      <div className={styles.componentWrapper}>
        <p>Hmm. Having problems constructing the web front-end URL.</p>
      </div>
    )
  }

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.iframeContainer}>
        <iframe src={url} frameBorder={'0'} />
      </div>
    </div>
  )
}

IframePreview.defaultProps = {
  document: null,
}
