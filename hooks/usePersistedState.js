import { useState, useRef } from 'react'

/**
 * Hook similar to useState but saves all updates to localStorage. If an update
 * fails, it shows an alert with an error message. The error message is shown
 * at most once.
 *
 * @param {String} persistingKey - The key that will be used to store the state
 *   in localStorage
 * @param {Object} initialStateFallback - Initial state to be used if nothing
 *   was found in localStorage
 * @param {String} localStorageErrorMessage - Message to be shown if setting a
 *   value to localStorage fails. Shown at most once
 */
export const usePersistedState = (
  persistingKey,
  initialStateFallback,
  localStorageErrorMessage
) => {
  const initialJsonState = localStorage.getItem(persistingKey)
  let initialState = null
  try {
    initialState = JSON.parse(initialJsonState)
  } catch (error) {
    console.warn(
      `localStorage.${persistingKey} JSON is corrupted. Clearing data and using fallback initial state`
    )
    localStorage.removeItem(persistingKey)
  }

  const [state, setState] = useState(
    initialState !== null ? initialState : initialStateFallback
  )
  const localStorageErrorNotified = useRef(false)

  const setPersistedState = nextValue => {
    setState(nextValue)
    try {
      localStorage.setItem(persistingKey, JSON.stringify(nextValue))
    } catch (error) {
      if (!localStorageErrorNotified.current) {
        localStorageErrorNotified.current = true
        alert(localStorageErrorMessage)
      }
    }
  }

  const removePersistedState = () => localStorage.removeItem(persistingKey)

  return [state, setPersistedState, removePersistedState]
}
