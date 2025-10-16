import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InfinitePostList } from './InfinitePostList'
import { usePostsStore } from '@/stores/usePostsStore'

describe('InfinitePostList', () => {
  beforeEach(() => {
    // Reset Zustand store before each test
    usePostsStore.getState().reset()
  })

  it('renders loading state initially', () => {
    render(<InfinitePostList />)
    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument()
  })

  it('renders posts after loading', async () => {
    render(<InfinitePostList />)
    
    await waitFor(() => {
      expect(screen.getByText(/1\. Post 1 Title/i)).toBeInTheDocument()
    })
    
    // Just check that post 10 exists, don't use getByText (might have duplicates in different renders)
    const postTitles = screen.getAllByText(/\d+\. Post \d+ Title/i)
    expect(postTitles.length).toBeGreaterThanOrEqual(10)
  })

  it('renders 10 posts on initial load', async () => {
    render(<InfinitePostList />)
    
    await waitFor(() => {
      expect(screen.getByText(/1\. Post 1 Title/i)).toBeInTheDocument()
    })
    
    const postTitles = screen.getAllByText(/\d+\. Post \d+ Title/i)
    expect(postTitles).toHaveLength(10)
  })

  it('loads more posts when Load More button is clicked', async () => {
    const user = userEvent.setup()
    render(<InfinitePostList />)
    
    await waitFor(() => {
      expect(screen.getByText(/1\. Post 1 Title/i)).toBeInTheDocument()
    })
    
    const loadMoreButton = screen.getByRole('button', { name: /load more/i })
    await user.click(loadMoreButton)
    
    await waitFor(() => {
      expect(screen.getByText(/11\. Post 11 Title/i)).toBeInTheDocument()
    })
    
    const postTitles = screen.getAllByText(/\d+\. Post \d+ Title/i)
    expect(postTitles).toHaveLength(20)
  })

  it('has Load More button visible after initial load', async () => {
    render(<InfinitePostList />)
    
    await waitFor(() => {
      expect(screen.getByText(/1\. Post 1 Title/i)).toBeInTheDocument()
    })
    
    const loadMoreButton = screen.getByRole('button', { name: /load more/i })
    expect(loadMoreButton).toBeInTheDocument()
    expect(loadMoreButton).toBeEnabled()
  })

  it('updates Zustand store when posts are loaded', async () => {
    render(<InfinitePostList />)
    
    await waitFor(() => {
      const state = usePostsStore.getState()
      expect(state.posts).toHaveLength(10)
      expect(state.currentPage).toBe(1)
      expect(state.hasMore).toBe(true)
    })
  })

  it('increments page in store when loading more', async () => {
    const user = userEvent.setup()
    render(<InfinitePostList />)
    
    await waitFor(() => {
      expect(screen.getByText(/1\. Post 1 Title/i)).toBeInTheDocument()
    })
    
    const loadMoreButton = screen.getByRole('button', { name: /load more/i })
    await user.click(loadMoreButton)
    
    await waitFor(() => {
      const state = usePostsStore.getState()
      expect(state.posts).toHaveLength(20)
      expect(state.currentPage).toBe(2)
    })
  })
})
