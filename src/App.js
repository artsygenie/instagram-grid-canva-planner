import React, { useState } from "react";

// 3 x 11 grid
const ROWS = 11;
const COLS = 3;

function getEmptyGrid() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ canvaUrl: "" }))
  );
}

export default function App() {
  const [grid, setGrid] = useState(getEmptyGrid());

  function handleUrlChange(rowIdx, colIdx, e) {
    const url = e.target.value;
    setGrid((prev) => {
      const copy = prev.map((r) => r.slice());
      copy[rowIdx][colIdx].canvaUrl = url;
      return copy;
    });
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1>Instagram Grid Planner (3 x 11)</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px"
      }}>
        {grid.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <div key={`${rowIdx}-${colIdx}`} style={{
              border: "1px dashed #bbb",
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
              background: "#fafafa"
            }}>
              {cell.canvaUrl ? (
                <iframe
                  src={cell.canvaUrl}
                  style={{ width: "100%", height: 180, border: "none" }}
                  allow="fullscreen"
                  title={`Canva Embed ${rowIdx},${colIdx}`}
                />
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Paste Canva embed URL here"
                    value={cell.canvaUrl}
                    onChange={e => handleUrlChange(rowIdx, colIdx, e)}
                    style={{
                      width: "95%",
                      padding: 8,
                      border: "1px solid #ccc",
                      borderRadius: 4,
                      marginBottom: 8,
                      fontSize: 14
                    }}
                  />
                  <span style={{ color: "#aaa", fontSize: 12 }}>Canva embeds are interactive—swipe for multipage!</span>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
