import { ref, computed } from 'vue'
import { useToast } from './useToast'

export interface BlogPost {
    id: string
    title: string
    excerpt: string
    author: {
        name: string
        avatar: string
        role?: string
    }
    date: string
    readTime: string
    category: string
    image: string
    featured?: boolean
    type?: 'standard' | 'quote' | 'video'
    quote?: string
    content?: string
}

// Global shared state across all components
const posts = ref<BlogPost[]>([
    {
        id: '1',
        title: 'Chasing Waterfalls in Ella: A Monsoon Diary',
        excerpt: 'Experience the misty magic of the hill country during the rainy season. A journey through tea plantations, hidden pools, and the roaring beauty of Ravana Falls.',
        author: { name: 'Sarah Jenkins', avatar: '/images/downloaded_a6c73e891fa9.avif', role: 'Explorer' },
        date: 'June 12, 2025',
        readTime: '8 min read',
        category: 'Hill Country',
        image: '/images/destinations/ella.jpg',
        featured: true,
        type: 'standard',
        content: `
## The Journey Begins

The train ride from Kandy to Ella is widely regarded as one of the most scenic railway journeys on earth. But experiencing it during the monsoon season? That is an entirely different level of poetry. As the old blue carriage rolls gently through the misty mountain passes, the landscape outside transforms into emerald cascades, endless tea estates, and deep river gorges blanketed in white clouds.

### Ravana Falls: A Roaring Spectacle

Our first morning stop was the legendary Ravana Falls. Usually a quiet tiered cascade, seasonal rains had swollen it into a roaring torrent of mist and mountain water. 

> "There is no finer way to understand Ceylon's raw heartbeat than to stand before its roaring highland waterfalls in the rain."

We spent hours watching the water cascade through ancient jungle rock, surrounded by the fragrance of damp soil and flowering wild cardamom.

### Walking Through Nine Arch Bridge

Just before dusk, we walked along the tracks towards the world-famous Demodara Nine Arch Bridge. Built during the British colonial era entirely of brick, stone, and cement without steel, this architectural triumph emerges out of lush jungle foliage like a relic from another century.

### Essential Tips for Hill Country Travel
- **Pack lightweight waterproof gear**: Quick-dry layers and waterproof daypacks are essential.
- **Morning hikes**: The mountain mist often clears between 6:30 AM and 9:00 AM, offering the clearest views.
- **Local homestays**: Stay with tea estate families for hot woodfire pol roti, lunu miris, and freshly picked Ceylon tea.
`
    },
    {
        id: '2',
        title: 'The Ancient Majesty of Sigiriya: A Climb Through History',
        excerpt: 'Ascending through the lion paws and ancient spiral galleries reveals a masterpiece of hydraulic engineering, royal intrigue, and 1,500-year-old frescoes.',
        author: { name: 'David Chen', avatar: '/images/downloaded_14ff402ae3d9.avif', role: 'Historian' },
        date: 'June 10, 2025',
        readTime: '5 min read',
        category: 'Culture',
        image: '/images/destinations/sigiriya.jpg',
        type: 'standard',
        content: `
## The Citadel in the Sky

Rising nearly 200 meters above the flat central plains of Sri Lanka, the colossal monolith of Sigiriya is both a natural wonder and an ancient architectural wonder. Constructed in the 5th century by King Kashyapa, it served as an impregnable fortress and an astonishing royal pleasure palace.

### The Celestial Frescoes

Halfway up the sheer vertical rock face, sheltered within an overhang, are the Sigiriya Frescoes. Painted with natural earth pigments over fifteen centuries ago, these graceful celestial maidens (Apsaras) remain vividly preserved in gold and terracotta tones.

### The Lion Gate & Summit Panorama

At the plateau halfway up stand the massive carved stone paws of a gigantic lion. Passing through where the lion's mouth once was leads to the summit. Here, among water cisterns and palace foundations, the horizon stretches uninterrupted across tropical forests and mist-veiled distant hills.
`
    },
    {
        id: '3',
        title: 'The Living Legacy of Ceylon Tea in Nuwara Eliya',
        excerpt: 'From misty estates sitting at 6,000 feet to copper-colored tea cups: an insider guide to the nuances, heritage, and estates of the high country.',
        author: { name: 'Nimali Perera', avatar: '', role: 'Tea Sommelier' },
        date: 'June 8, 2025',
        readTime: '4 min read',
        category: 'Food & Spices',
        image: '/images/destinations/nuwara-eliya.jpg',
        type: 'standard',
        content: `
## Golden Brew of the Clouds

High above the tropical heat of the lowlands lies Nuwara Eliya, known for its cool mountain air and manicured hillside tea bushes. Here, orthodox tea manufacturing methods have been preserved with artisanal precision for over 150 years.

### The Artisan Process

1. **Selective Plucking**: Plucking strictly "two leaves and a bud" by hand in early morning mist.
2. **Withering & Rolling**: Removing leaf moisture and gentle rolling to release essential botanical oils.
3. **Oxidation & Firing**: Precisely timed fermentation giving Ceylon tea its trademark amber hue and floral notes.

### Flavor Profiles by Altitude
- **High Grown (Nuwara Eliya & Dimbula)**: Light, golden, delicate with notes of citrus and jasmine.
- **Mid Grown (Kandy)**: Rich, aromatic with medium body.
- **Low Grown (Ruhuna)**: Bold, deep, caramel-sweet, ideal for traditional milk tea.
`
    },
    {
        id: '4',
        title: 'Voices of Ceylon',
        excerpt: '',
        quote: '"Sri Lanka is a universe contained in a single island. In one afternoon you can leave misty mountain tea estates and watch the sunset over warm turquoise surf."',
        author: { name: 'Sarah Jenkins', avatar: '/images/downloaded_a6c73e891fa9.avif', role: 'Solo Traveler' },
        date: 'June 5, 2025',
        readTime: '1 min read',
        category: 'Community',
        image: '',
        type: 'quote',
        content: ''
    },
    {
        id: '5',
        title: 'Southern Spice Trails: Galle Fort & Mirissa Kitchens',
        excerpt: 'Discover wood-smoked ambul thiyal, fiery coconut sambols, and clay pot seafood curries cooked along the palm-fringed southern coastline.',
        author: { name: 'Dilani Fernando', avatar: '', role: 'Culinary Writer' },
        date: 'May 28, 2025',
        readTime: '7 min read',
        category: 'Food & Spices',
        image: '/images/destinations/galle.jpg',
        type: 'standard',
        content: `
## Spice-Infused Coasts

Southern Sri Lankan cuisine possesses a fierce, distinctive identity. Unlike the milder highland curries, coastal cooking relies on fiery roasted black curry powder, toasted coconut flakes, and sun-dried goraka (garcinia).

### Iconic Southern Dishes

- **Fish Ambul Thiyal**: Firm skipjack tuna slow-braised in black clay pots with ground black pepper and tangy goraka. It melts in the mouth with deep, smoky acidity.
- **Pol Sambol on Warm Roast Paan**: Freshly scraped coconut ground on stone with red shallots, bird's eye chilies, lime, and crushed Maldive fish flakes.
- **Egg Hoppers (Aappa)**: Crisp lacy-edged rice flour crepes with a soft, steaming poached egg nestled at the center.
`
    },
    {
        id: '6',
        title: 'Tracking the Elusive Leopards of Yala',
        excerpt: 'A dawn safari through the thorny scrub jungles and brackish coastal lagoons of Yala National Park, home to the world’s highest density of leopards.',
        author: { name: 'Rohan Wickramasinghe', avatar: '', role: 'Wildlife Naturalist' },
        date: 'May 24, 2025',
        readTime: '6 min read',
        category: 'Wildlife',
        image: '/images/destinations/yala.jpg',
        type: 'standard',
        content: `
## Dawn in Block 1

At 5:45 AM, the iron gates of Yala swing open under pale violet skies. The morning air carries the scent of salt spray from the nearby Indian Ocean and dry scrub dust. Within minutes, the alarm calls of spotted deer and langur monkeys ripple through the acacia canopy.

### The Ghost of the Granite Boulders

The Sri Lankan Leopard (*Panthera pardus kotiya*) is an apex predator with no natural rivals on this island. That evolutionary confidence makes them far bolder than their African cousins. Sitting upon a sun-warmed granite boulder, a mature male surveys the plains with calm majesty.

### What Else to Watch For
- **Sloth Bears**: Best spotted feeding on ripe palu fruit during early summer.
- **Asian Elephants**: Often seen bathing in lagoons alongside painted storks and crocodiles.
`
    },
    {
        id: '7',
        title: 'Endless Right-Handers: Surfing in Arugam Bay',
        excerpt: 'Why this sleepy fishing village on the eastern coast turns into a global surf haven from May through October.',
        author: { name: 'Kasun Priyantha', avatar: '', role: 'Surf Guide' },
        date: 'May 20, 2025',
        readTime: '5 min read',
        category: 'Beaches',
        image: '/images/destinations/arugam-bay.jpg',
        type: 'standard',
        content: `
## The East Coast Swell

While the south coast gets heavy monsoon seas from May to September, Sri Lanka's East Coast enters prime dry, offshore season. Arugam Bay boasts world-class point breaks peeling over gentle sandbars.

### The Point Breakdown
- **Main Point**: Long, reeling right-hander breaking over deep reef and sand. For intermediate and advanced surfers.
- **Whiskey Point**: Playful, forgiving wave with scenic granite boulders that catch morning golden hour light.
- **Peanut Farm**: An idyllic cove flanked by coconut groves, offering two separate take-off zones.
`
    },
    {
        id: '8',
        title: 'Dawn Above the Clouds: The Pilgrimage of Adam’s Peak',
        excerpt: 'Climbing 5,500 sacred stone steps in the cool darkness to witness the shadow of Sri Pada cast perfectly across the morning mist.',
        author: { name: 'Marcus Bell', avatar: '', role: 'Travel Writer' },
        date: 'May 15, 2025',
        readTime: '9 min read',
        category: 'Hill Country',
        image: '/images/destinations/adams-peak.jpg',
        type: 'standard',
        content: `
## Sacred Ascent

For over a millennium, pilgrims of all faiths have climbed Sri Pada (Adam's Peak). The 2,243-meter pyramid mountain stands isolated above the surrounding central highlands, revered by Buddhists, Hindus, Christians, and Muslims alike.

### The Midnight Climb

Beginning at 2:00 AM from Nallathanniya, the path is illuminated by a ribbon of electric bulbs climbing all the way to the stars. The air chills noticeably with every thousand steps, with monks chanting in distance rest stops offering sweet hot ginger tea.

### The Shadow Phenomenon

As the golden sun crests the eastern horizon, the mountain casts an immaculate triangular shadow that hovers weightlessly upon the western cloud layer—a optical and spiritual spectacle unlike anywhere else on earth.
`
    }
])

const activeCategory = ref('All Stories')
const searchQuery = ref('')
const sortBy = ref<'newest' | 'popular'>('newest')
const filterReadTime = ref<'all' | 'short' | 'medium' | 'long'>('all')
const filterSavedOnly = ref(false)
const isSubmissionModalOpen = ref(false)
const savedPosts = ref<Set<string>>(new Set())

// Initialize saved posts from localStorage
if (import.meta.client) {
    try {
        const stored = localStorage.getItem('blog-saved-posts')
        if (stored) {
            savedPosts.value = new Set(JSON.parse(stored))
        }
    } catch (e) {
        console.error('Error loading saved posts', e)
    }
}

export const useBlog = () => {
    const { showToast } = useToast()

    function toggleSave(id: string) {
        if (savedPosts.value.has(id)) {
            savedPosts.value.delete(id)
            showToast('Removed from Reading List', 'info')
        } else {
            savedPosts.value.add(id)
            showToast('Saved to Reading List', 'success')
        }

        if (import.meta.client) {
            localStorage.setItem('blog-saved-posts', JSON.stringify(Array.from(savedPosts.value)))
        }
    }

    function isSaved(id: string) {
        return savedPosts.value.has(id)
    }

    const savedCount = computed(() => savedPosts.value.size)

    const categories = computed(() => {
        const cats = new Set(posts.value.filter(p => p.type !== 'quote').map(p => p.category))
        return ['All Stories', ...Array.from(cats)].sort()
    })

    const featuredPost = computed(() => posts.value.find(p => p.featured) || posts.value[0])

    const filteredPosts = computed(() => {
        let result = posts.value.filter(p => !p.featured)

        // 1. Category Filter
        if (activeCategory.value !== 'All Stories') {
            result = result.filter(p => p.category === activeCategory.value)
        }

        // 2. Search Filter
        if (searchQuery.value.trim()) {
            const lower = searchQuery.value.trim().toLowerCase()
            result = result.filter(p =>
                p.title.toLowerCase().includes(lower) ||
                p.excerpt.toLowerCase().includes(lower) ||
                (p.quote && p.quote.toLowerCase().includes(lower)) ||
                p.author.name.toLowerCase().includes(lower) ||
                p.category.toLowerCase().includes(lower)
            )
        }

        // 3. Read Time Filter
        if (filterReadTime.value !== 'all') {
            result = result.filter(p => {
                const mins = parseInt(p.readTime) || 3
                if (filterReadTime.value === 'short') return mins < 5
                if (filterReadTime.value === 'medium') return mins >= 5 && mins <= 8
                if (filterReadTime.value === 'long') return mins > 8
                return true
            })
        }

        // 4. Saved Only Filter
        if (filterSavedOnly.value) {
            result = result.filter(p => savedPosts.value.has(p.id))
        }

        // 5. Sorting
        if (sortBy.value === 'newest') {
            result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        } else if (sortBy.value === 'popular') {
            result.sort((a, b) => a.title.length - b.title.length)
        }

        return result
    })

    function setCategory(cat: string) {
        activeCategory.value = cat
    }

    function setSearch(query: string) {
        searchQuery.value = query
    }

    function resetFilters() {
        activeCategory.value = 'All Stories'
        searchQuery.value = ''
        filterReadTime.value = 'all'
        filterSavedOnly.value = false
        sortBy.value = 'newest'
    }

    function getRelatedPosts(currentId: string, category: string, limit = 3) {
        return posts.value
            .filter(p => p.id !== currentId && p.category === category && p.type !== 'quote')
            .slice(0, limit)
    }

    function addPost(post: Partial<BlogPost>) {
        const newPost: BlogPost = {
            id: String(Date.now()),
            title: post.title || 'Untitled Journal',
            excerpt: post.excerpt || '',
            author: post.author || { name: 'Community Contributor', avatar: '' },
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            readTime: post.readTime || '5 min read',
            category: post.category || 'Hill Country',
            image: post.image || '/images/destinations/ella.jpg',
            content: post.content || '',
            type: 'standard',
            featured: false
        }

        posts.value.unshift(newPost)
    }

    return {
        posts,
        activeCategory,
        categories,
        searchQuery,
        sortBy,
        filterReadTime,
        filterSavedOnly,
        isSubmissionModalOpen,
        savedPosts,
        savedCount,
        featuredPost,
        filteredPosts,
        setCategory,
        setSearch,
        resetFilters,
        toggleSave,
        isSaved,
        getRelatedPosts,
        addPost
    }
}
