import './StorageReheating.css'

function StorageReheating({ storage, reheating }) {
  return (
    <div className="storage-reheating">
      <div className="storage-section">
        <h3>Storage Instructions</h3>
        <div className="storage-details">
          {storage.freezer && (
            <div className="storage-item">
              <span className="storage-label">Freezer:</span>
              <span className="storage-text">{storage.freezer}</span>
            </div>
          )}
          {storage.fridge && (
            <div className="storage-item">
              <span className="storage-label">Fridge:</span>
              <span className="storage-text">{storage.fridge}</span>
            </div>
          )}
          {storage.shelfLife && (
            <div className="storage-item">
              <span className="storage-label">Shelf Life:</span>
              <span className="storage-text">{storage.shelfLife}</span>
            </div>
          )}
        </div>
      </div>

      <div className="reheating-section">
        <h3>Reheating Instructions</h3>
        <div className="reheating-methods">
          {reheating.map((method, index) => (
            <div key={index} className="reheating-method">
              <div className="method-header">
                <span className="method-name">{method.method}</span>
                {method.temp && <span className="method-temp">{method.temp}</span>}
              </div>
              {method.time && (
                <div className="method-time">
                  <span className="time-label">Time:</span>
                  <span className="time-value">{method.time}</span>
                </div>
              )}
              {method.notes && (
                <div className="method-notes">{method.notes}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StorageReheating

