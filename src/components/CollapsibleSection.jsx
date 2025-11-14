import './CollapsibleSection.css'

function CollapsibleSection({ title, children, isCollapsed, onToggle }) {
  return (
    <div className="collapsible-section">
      <div className={`section-title ${isCollapsed ? 'collapsed' : ''}`} onClick={onToggle}>
        <span>{title}</span>
        <span className="icon">▼</span>
      </div>
      <div className={`collapsible-content ${isCollapsed ? 'collapsed' : ''}`}>
        {children}
      </div>
    </div>
  )
}

export default CollapsibleSection

