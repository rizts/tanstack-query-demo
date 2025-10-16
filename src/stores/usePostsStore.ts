import { create } from 'zustand'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface PostsState {
  posts: Post[]
  currentPage: number
  hasMore: boolean
  isLoading: boolean
  isFetchingMore: boolean
  addPosts: (newPosts: Post[]) => void
  setCurrentPage: (page: number) => void
  setHasMore: (hasMore: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  setIsFetchingMore: (isFetching: boolean) => void
  reset: () => void
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  currentPage: 1,
  hasMore: true,
  isLoading: false,
  isFetchingMore: false,
  addPosts: (newPosts) => set((state) => ({ 
    posts: [...state.posts, ...newPosts] 
  })),
  setCurrentPage: (page) => set({ currentPage: page }),
  setHasMore: (hasMore) => set({ hasMore }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsFetchingMore: (isFetching) => set({ isFetchingMore: isFetching }),
  reset: () => set({ 
    posts: [], 
    currentPage: 1, 
    hasMore: true,
    isLoading: false,
    isFetchingMore: false
  }),
}))
