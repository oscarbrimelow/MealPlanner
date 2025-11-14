import { useEffect, useState } from 'react'
import './InstagramEmbed.css'

function InstagramEmbed({ url }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Check if script already exists
    let script = document.querySelector('script[src="https://www.instagram.com/embed.js"]')
    
    if (!script) {
      script = document.createElement('script')
      script.src = 'https://www.instagram.com/embed.js'
      script.async = true
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process()
          setLoading(false)
        }
      }
      script.onerror = () => {
        setError(true)
        setLoading(false)
      }
      document.body.appendChild(script)
    } else {
      // Script already exists, just process embeds
      if (window.instgrm) {
        window.instgrm.Embeds.process()
        setLoading(false)
      } else {
        script.onload = () => {
          if (window.instgrm) {
            window.instgrm.Embeds.process()
            setLoading(false)
          }
        }
      }
    }

    // Process embeds after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process()
        setLoading(false)
      }
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [url])

  if (error) {
    return (
      <div className="instagram-embed-error">
        <p>Unable to load Instagram video.</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="instagram-link">
          View on Instagram →
        </a>
      </div>
    )
  }

  return (
    <div className="instagram-embed">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: '8px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '1px',
          maxWidth: '540px',
          minWidth: '326px',
          padding: 0,
          width: 'calc(100% - 2px)',
        }}
      >
        <div style={{ padding: '16px' }}>
          <a
            href={url}
            style={{
              background: '#FFFFFF',
              lineHeight: 0,
              padding: '0 0',
              textAlign: 'center',
              textDecoration: 'none',
              width: '100%',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {loading && (
              <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                Loading Instagram video...
              </div>
            )}
          </a>
        </div>
      </blockquote>
      {!loading && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-fallback-link"
        >
          View this post on Instagram
        </a>
      )}
    </div>
  )
}

export default InstagramEmbed

