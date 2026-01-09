import { ref, computed } from 'vue'
import seedData from '~/data/community.seed.json'

// Shared state
const activeTab = ref('All Topics')
const searchQuery = ref('')
const searchFilter = ref<'All' | 'Posts' | 'People' | 'Guides'>('All')

export function useCommunity() {
    const posts = ref(seedData.posts)
    const users = ref(seedData.users)
    const trending = ref(seedData.trending)

    // Computed filtered posts
    const filteredPosts = computed(() => {
        let result = posts.value

        // Tab Filter
        if (activeTab.value !== 'All Topics') {
            const typeMap: Record<string, string> = {
                'Trip Reports': 'report',
                'Q&A': 'qa',
                'Find a Buddy': 'buddy',
                'Local Guides': 'guide'
            }
            const type = typeMap[activeTab.value]
            if (type) {
                result = result.filter(p => p.type === type)
            }
        }

        // Search Query
        if (searchQuery.value) {
            const q = searchQuery.value.toLowerCase()
            result = result.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.excerpt.toLowerCase().includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q))
            )
        }

        return result
    })

    // Tab counts
    const tabCounts = computed(() => {
        const counts: Record<string, number> = { 'All Topics': posts.value.length }
        const typeMap: Record<string, string> = {
            'Trip Reports': 'report',
            'Q&A': 'qa',
            'Find a Buddy': 'buddy',
            'Local Guides': 'guide'
        }

        Object.entries(typeMap).forEach(([label, type]) => {
            counts[label] = posts.value.filter(p => p.type === type).length
        })

        return counts
    })

    // Autocomplete Suggestions
    const suggestions = computed(() => {
        if (!searchQuery.value) return []
        const q = searchQuery.value.toLowerCase()
        const tags = new Set<string>()
        posts.value.forEach(p => p.tags.forEach(t => {
            if (t.toLowerCase().includes(q)) tags.add(t)
        }))
        return Array.from(tags).slice(0, 5)
    })

    function setTab(tab: string) {
        activeTab.value = tab
    }

    function setSearch(query: string) {
        searchQuery.value = query
    }

    // Engagement State
    const engagement = ref<Record<string, { liked: boolean, saved: boolean, following: boolean }>>({})

    // Load from local storage
    if (import.meta.client) {
        try {
            const saved = localStorage.getItem('community-engagement')
            if (saved) engagement.value = JSON.parse(saved)
        } catch (e) { console.error('Error loading engagement') }
    }

    function saveEngagement() {
        if (import.meta.client) {
            localStorage.setItem('community-engagement', JSON.stringify(engagement.value))
        }
    }

    function toggleLike(postId: string) {
        if (!engagement.value[postId]) engagement.value[postId] = { liked: false, saved: false, following: false }

        engagement.value[postId].liked = !engagement.value[postId].liked

        // Update local count visually
        const post = posts.value.find(p => p.id === postId)
        if (post) {
            post.likes += engagement.value[postId].liked ? 1 : -1
        }
        saveEngagement()
    }

    function toggleSave(postId: string) {
        if (!engagement.value[postId]) engagement.value[postId] = { liked: false, saved: false, following: false }
        engagement.value[postId].saved = !engagement.value[postId].saved
        saveEngagement()
    }

    function toggleFollow(postId: string) {
        if (!engagement.value[postId]) engagement.value[postId] = { liked: false, saved: false, following: false }
        engagement.value[postId].following = !engagement.value[postId].following
        saveEngagement()
    }

    function getEngagement(postId: string) {
        return engagement.value[postId] || { liked: false, saved: false, following: false }
    }

    function addPost(newPost: any) {
        const post = {
            id: `p${Date.now()}`,
            authorId: 'u_current', // Mock current user
            date: 'Just now',
            likes: 0,
            comments: 0,
            views: 0,
            ...newPost
        }

        // Prepend to posts
        posts.value.unshift(post)

        // Add current user to users list if not exists
        if (!users.value.find(u => u.id === 'u_current')) {
            users.value.push({
                id: 'u_current',
                name: 'You',
                role: 'Explorer',
                avatar: '', // Fallback handled in UI
                verified: false,
                points: 0
            })
        }

        // Reset filters to see the new post
        setTab('All Topics')
        setSearch('')
    }

    return {
        activeTab,
        searchQuery,
        searchFilter,
        posts: filteredPosts,
        users,
        trending,
        tabCounts,
        suggestions,
        setTab,
        setSearch,
        toggleLike,
        toggleSave,
        toggleFollow,
        getEngagement,
        addPost
    }
}
