import React, {useState} from 'react'

const Selector = ({handleChange, options}) => {
    return(
    <select class="form-select" aria-label="Default select example"
    onChange={handleChange}>
    {options.map(o =>(
      <option key={o} value={o}>{o}</option>
    ))}
  </select>
)
}

export default Selector
