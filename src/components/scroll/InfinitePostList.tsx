import { useInfiniteQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useRef } from 'react'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

const fetchPosts = async ({ pageParam = 1 }): Promise<Post[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
  )
  if (!response.ok) throw new Error('Failed to fetch posts')
  return response.json()
}

export function InfinitePostList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined
    },
  })

  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (status === 'pending') return <div className="text-center p-4">Loading...</div>
  if (status === 'error') return <div className="text-center p-4 text-red-500">Error loading posts</div>

  return (
    <div className="space-y-4">
      {data.pages.map((page, i) => (
        <div key={i} className="space-y-4">
          {page.map((post) => (
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
      ))}

      <div ref={observerTarget} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && <p className="text-sm text-gray-500">Loading more...</p>}
      </div>

      {!hasNextPage && (
        <p className="text-center text-sm text-gray-500">No more posts to load</p>
      )}

      {hasNextPage && !isFetchingNextPage && (
        <div className="flex justify-center">
          <Button onClick={() => fetchNextPage()}>Load More</Button>
        </div>
      )}
    </div>
  )
}