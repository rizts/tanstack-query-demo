import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePostsStore } from '@/stores/usePostsStore'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

const fetchPosts = async (page: number): Promise<Post[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
  )
  if (!response.ok) throw new Error('Failed to fetch posts')
  return response.json()
}

export function InfinitePostList() {
  const { 
    posts, 
    currentPage, 
    hasMore, 
    isLoading, 
    isFetchingMore,
    addPosts,
    setCurrentPage,
    setHasMore,
    setIsLoading,
    setIsFetchingMore,
    reset
  } = usePostsStore()

  const observerTarget = useRef<HTMLDivElement>(null)

  const loadPosts = async (page: number, isFetchingNext = false) => {
    if (isFetchingNext) {
      setIsFetchingMore(true)
    } else {
      setIsLoading(true)
    }

    try {
      const newPosts = await fetchPosts(page)
      
      if (newPosts.length < 10) {
        setHasMore(false)
      }
      
      addPosts(newPosts)
      setCurrentPage(page)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
      setIsFetchingMore(false)
    }
  }

  const handleLoadMore = () => {
    if (!isFetchingMore && hasMore) {
      loadPosts(currentPage + 1, true)
    }
  }

  useEffect(() => {
    // Initial load
    loadPosts(1)

    // Cleanup on unmount
    return () => reset()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingMore && !isLoading) {
          handleLoadMore()
        }
      },
      { threshold: 1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isFetchingMore, isLoading, currentPage])

  if (isLoading && posts.length === 0) {
    return <div className="text-center p-4">Loading...</div>
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                {post.id}. {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{post.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div ref={observerTarget} className="h-10 flex items-center justify-center">
        {isFetchingMore && <p className="text-sm text-gray-500">Loading more...</p>}
      </div>

      {!hasMore && (
        <p className="text-center text-sm text-gray-500">No more posts to load</p>
      )}

      {hasMore && !isFetchingMore && (
        <div className="flex justify-center">
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      )}
    </div>
  )
}
