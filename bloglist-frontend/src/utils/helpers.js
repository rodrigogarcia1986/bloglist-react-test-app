/* eslint-disable linebreak-style *//* eslint-disable indent */
import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    // eslint-disable-next-line no-unused-vars
    const reset = (event) => {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        reset
    }
}