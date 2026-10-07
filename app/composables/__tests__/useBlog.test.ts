import { describe, it, expect, beforeEach } from 'vitest'
import { useBlog } from '../useBlog'

describe('useBlog composable', () => {
    beforeEach(() => {
        const { resetFilters } = useBlog()
        resetFilters()
    })

    it('provides initial stories with a featured story', () => {
        const { posts, featuredPost } = useBlog()
        expect(posts.value.length).toBeGreaterThan(0)
        expect(featuredPost.value).toBeDefined()
        expect(featuredPost.value?.title).toContain('Ella')
    })

    it('computes categories including All Stories', () => {
        const { categories } = useBlog()
        expect(categories.value).toContain('All Stories')
        expect(categories.value).toContain('Hill Country')
        expect(categories.value).toContain('Culture')
    })

    it('filters stories by category', () => {
        const { setCategory, filteredPosts, activeCategory } = useBlog()
        setCategory('Culture')
        expect(activeCategory.value).toBe('Culture')
        expect(filteredPosts.value.every(p => p.category === 'Culture')).toBe(true)
    })

    it('filters stories by search query', () => {
        const { setSearch, filteredPosts } = useBlog()
        setSearch('Sigiriya')
        expect(filteredPosts.value.length).toBeGreaterThan(0)
        expect(filteredPosts.value[0]?.title).toContain('Sigiriya')
    })

    it('allows toggling bookmarks and computes saved count', () => {
        const { toggleSave, isSaved, savedCount, posts } = useBlog()
        const targetId = posts.value[1]?.id || '2'

        const initialSaved = isSaved(targetId)
        toggleSave(targetId)
        expect(isSaved(targetId)).toBe(!initialSaved)

        if (!initialSaved) {
            expect(savedCount.value).toBeGreaterThan(0)
            toggleSave(targetId)
            expect(isSaved(targetId)).toBe(false)
        }
    })

    it('adds a new story via addPost', () => {
        const { addPost, posts } = useBlog()
        const initialCount = posts.value.length

        addPost({
            title: 'Exploring Trincomalee Beaches',
            excerpt: 'Pristine waters on the eastern shore.',
            category: 'Beaches',
            author: { name: 'Local Guide', avatar: '' }
        })

        expect(posts.value.length).toBe(initialCount + 1)
        expect(posts.value[0]?.title).toBe('Exploring Trincomalee Beaches')
    })

    it('resets all filters properly', () => {
        const { setCategory, setSearch, resetFilters, activeCategory, searchQuery } = useBlog()
        setCategory('Wildlife')
        setSearch('leopard')

        resetFilters()
        expect(activeCategory.value).toBe('All Stories')
        expect(searchQuery.value).toBe('')
    })
})
