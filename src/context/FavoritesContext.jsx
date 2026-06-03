import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('careeros_favorites')
      // Default to [1, 3] to match the Student Dashboard's initial layout design
      return saved ? JSON.parse(saved) : [1, 3]
    } catch (e) {
      console.error('Failed to parse favorites from localStorage', e)
      return [1, 3]
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('careeros_favorites', JSON.stringify(favorites))
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e)
    }
  }, [favorites])

  const toggleFavorite = (id) => {
    const numericId = Number(id)
    const isCurrentlyFav = favorites.includes(numericId)
    
    if (isCurrentlyFav) {
      setFavorites((prev) => prev.filter((fId) => fId !== numericId))
      toast.info('Removed from saved colleges', {
        icon: '💔',
        theme: 'colored',
        style: { background: '#1e293b', color: '#fff' }
      })
    } else {
      setFavorites((prev) => [...prev, numericId])
      toast.success('Saved to your favorites!', {
        icon: '❤️',
        theme: 'colored',
        style: { background: '#2563eb', color: '#fff' }
      })
    }
  }

  const removeFavorite = (id) => {
    const numericId = Number(id)
    setFavorites((prev) => prev.filter((fId) => fId !== numericId))
    toast.info('Removed from saved colleges', {
      icon: '💔',
      theme: 'colored',
      style: { background: '#1e293b', color: '#fff' }
    })
  }

  const addFavorite = (id) => {
    const numericId = Number(id)
    const isCurrentlyFav = favorites.includes(numericId)
    
    if (!isCurrentlyFav) {
      setFavorites((prev) => [...prev, numericId])
      toast.success('Saved to your favorites!', {
        icon: '❤️',
        theme: 'colored',
        style: { background: '#2563eb', color: '#fff' }
      })
    }
  }

  const isFavorite = (id) => favorites.includes(Number(id))

  const clearAllFavorites = () => {
    if (favorites.length === 0) return
    setFavorites([])
    toast.success('Cleared all saved colleges', {
      icon: '🧹',
      theme: 'colored'
    })
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearAllFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
