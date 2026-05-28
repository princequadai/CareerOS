import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiX, FiPlus, FiCheck } from 'react-icons/fi'
import colleges from '../data/colleges.json'
import './CompareCollegesPage.css'

const CompareCollegesPage = () => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState([colleges[0], colleges[3], null])
  const [showPicker, setShowPicker] = useState(null)

  const addCollege = (slot, college) => {
    const newSelected = [...selected]
    newSelected[slot] = college
    setSelected(newSelected)
    setShowPicker(null)
  }

  const removeCollege = (index) => {
    const newSelected = [...selected]
    newSelected[index] = null
    setSelected(newSelected)
  }

  const slots = [0, 1, 2]

  const rows = [
    { label: 'Type', key: (c) => c.type },
    { label: 'Established', key: (c) => c.established },
    { label: 'Affiliation', key: (c) => c.affiliation },
    { label: 'Location', key: (c) => c.location },
    { label: 'Min Fees', key: (c) => `₹${c.fees.min.toLocaleString()}/yr` },
    { label: 'Max Fees', key: (c) => `₹${c.fees.max.toLocaleString()}/yr` },
    { label: 'Rating', key: (c) => `⭐ ${c.rating}` },
    { label: 'Placement %', key: (c) => `${c.placement.percentage}%` },
    { label: 'Avg Package', key: (c) => c.placement.averagePackage },
    { label: 'Highest Pkg', key: (c) => c.placement.highestPackage },
    { label: 'Hostel', key: (c) => c.facilities.hostel ? '✅' : '❌' },
    { label: 'WiFi', key: (c) => c.facilities.wifi ? '✅' : '❌' },
    { label: 'Library', key: (c) => c.facilities.library ? '✅' : '❌' },
    { label: 'Transport', key: (c) => c.facilities.transport ? '✅' : '❌' },
    { label: 'Cafeteria', key: (c) => c.facilities.cafeteria ? '✅' : '❌' },
  ]

  return (
    <div className="cc-page">

      <div className="cc-header-bar">
        <div className="cc-header-container">
          <h1 className="cc-title">Compare Colleges</h1>
          <p className="cc-subtitle">
            <span className="cc-subtitle-mobile">Select 2 colleges to compare</span>
            <span className="cc-subtitle-desktop">Select up to 3 colleges and compare side by side</span>
          </p>
        </div>
      </div>

      <div className="cc-main-container">

        {/* College Selector Cards */}
        <div className="cc-selector-grid">
          {slots.map((slot) => (
            <div key={slot} className="cc-slot-wrapper">
              {selected[slot] ? (
                <div className="cc-selected-card">
                  <img src={selected[slot].image} alt={selected[slot].name} className="cc-card-img" />
                  <div className="cc-card-overlay" />
                  <div className="cc-card-content">
                    <span className="cc-card-type">{selected[slot].type}</span>
                    <h3 className="cc-card-name">{selected[slot].name}</h3>
                    <p className="cc-card-location">📍 {selected[slot].district}</p>
                    <div className="cc-card-actions">
                      <button className="cc-change-btn" onClick={() => setShowPicker(slot)}>
                        Change
                      </button>
                      <button className="cc-remove-btn" onClick={() => removeCollege(slot)}>
                        <FiX size={11} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button className="cc-add-btn" onClick={() => setShowPicker(slot)}>
                  <div className="cc-add-icon-wrapper">
                    <FiPlus size={20} />
                  </div>
                  <p className="cc-add-text">Add College</p>
                </button>
              )}

              {/* Picker Dropdown */}
              {showPicker === slot && (
                <div className="cc-picker-dropdown">
                  <div className="cc-picker-header">
                    <span className="cc-picker-title">Select College</span>
                    <button className="cc-picker-close" onClick={() => setShowPicker(null)}><FiX size={16} /></button>
                  </div>
                  {colleges.map(college => {
                    const isAlreadySelected = selected.some(s => s?.id === college.id)
                    return (
                      <button
                        key={college.id}
                        className={`cc-picker-item ${isAlreadySelected ? 'disabled' : ''}`}
                        onClick={() => !isAlreadySelected && addCollege(slot, college)}
                        disabled={isAlreadySelected}
                      >
                        <img src={college.image} alt={college.name} className="cc-picker-item-img" />
                        <div className="cc-picker-item-info">
                          <p className="cc-picker-item-name">{college.name}</p>
                          <p className="cc-picker-item-meta">{college.type} • ⭐ {college.rating}</p>
                        </div>
                        {isAlreadySelected && <FiCheck size={14} color="#10b981" />}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {selected.some(c => c !== null) && (
          <div className="cc-table-wrapper">
            <div className="cc-table-scroll">
              <table className="cc-table">
                <thead>
                  <tr>
                    <th className="cc-th-feature">Feature</th>
                    {slots.map(slot => (
                      <th key={slot} className="cc-th-college">
                        {selected[slot] ? (
                          <span className="cc-college-name-col">{selected[slot].name}</span>
                        ) : (
                          <span className="cc-college-empty">—</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={row.label} style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff' }}>
                      <td className="cc-td-label">{row.label}</td>
                      {slots.map(slot => (
                        <td key={slot} className="cc-td-val">
                          {selected[slot] ? row.key(selected[slot]) : '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr style={{ background: '#f8fafc' }}>
                    <td className="cc-td-label">Details</td>
                    {slots.map(slot => (
                      <td key={slot} className="cc-td-val">
                        {selected[slot] ? (
                          <button className="cc-view-btn" onClick={() => navigate(`/colleges/${selected[slot].id}`)}>
                            View
                          </button>
                        ) : '—'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!selected.some(c => c !== null) && (
          <div className="cc-no-selection">
            <span className="cc-no-icon">⚖️</span>
            <h3 className="cc-no-title">No colleges selected</h3>
            <p className="cc-no-text">Click "Add College" above to start comparing</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default CompareCollegesPage