import './Instructions.css'

function Instructions({ instructions, notes }) {
  return (
    <div className="instructions">
      <ol className="instructions-list">
        {instructions.map((instruction, index) => (
          <li key={index} className="instruction-step">
            {instruction}
          </li>
        ))}
      </ol>
      {notes && (
        <div className="instructions-notes">
          <h3>Notes & Tips</h3>
          <p>{notes}</p>
        </div>
      )}
    </div>
  )
}

export default Instructions

