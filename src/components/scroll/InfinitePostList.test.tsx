import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { InfinitePostList } from './InfinitePostList'

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
}

const renderWithClient = (component: React.ReactElement) => {
  const testQueryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={testQueryClient}>
      {component}
    </QueryClientProvider>
  )
}

describe('InfinitePostList', () => {
  it('renders loading state initially', () => {
    renderWithClient(<InfinitePostList />)
    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument()
  })

  it('renders posts after loading', async () => {
    renderWithClient(<InfinitePostList />)
    
    await waitFor(() => {
      expect(screen.getByText(/1\. Post 1 Title/i)).toBeInTheDocument()
    })
    
    expect(screen.getByText(/10\. Post 10 Title/i)).toBeInTheDocument()
  })

  it('renders 10 posts on initial load', async () => {
    renderWithClient(<InfinitePostList />)
    
    await waitFor(() => {
      expect(screen.getByText(/1\. Post 1 Title/i)).toBeInTheDocument()
    })
    
    // Count all card titles by their text pattern
    const postTitles = screen.getAllByText(/\d+\. Post \d+ Title/i)
    expect(postTitles).toHaveLength(10)
  })

  it('loads more posts when Load More button is clicked', async () => {
    const user = userEvent.setup()
    renderWithClient(<InfinitePostList />)
    
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
    renderWithClient(<InfinitePostList />)
    
    await waitFor(() => {
      expect(screen.getByText(/1\. Post 1 Title/i)).toBeInTheDocument()
    })
    
    const loadMoreButton = screen.getByRole('button', { name: /load more/i })
    expect(loadMoreButton).toBeInTheDocument()
    expect(loadMoreButton).toBeEnabled()
  })
})