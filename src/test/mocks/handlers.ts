import { http, HttpResponse } from 'msw'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

const generateMockPosts = (page: number): Post[] => {
  const posts: Post[] = []
  const start = (page - 1) * 10 + 1
  
  for (let i = 0; i < 10; i++) {
    posts.push({
      id: start + i,
      title: `Post ${start + i} Title`,
      body: `This is the body of post ${start + i}`,
      userId: 1,
    })
  }
  
  return posts
}

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/posts', ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('_page') || '1')
    const limit = parseInt(url.searchParams.get('_limit') || '10')
    
    if (limit !== 10) {
      return HttpResponse.json([])
    }
    
    const posts = generateMockPosts(page)
    return HttpResponse.json(posts)
  }),
]
