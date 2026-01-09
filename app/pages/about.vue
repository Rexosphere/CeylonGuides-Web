<template>
  <div class="bg-background-light dark:bg-background-dark font-display text-[#181311] dark:text-white antialiased">
    <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      
      <main class="flex flex-col items-center">
        <AboutHero 
          v-if="data.hero"
          :title="data.hero.title"
          :subtitle="data.hero.subtitle"
          :badge="data.hero.badge"
          :image="data.hero.image"
          :stats="data.hero.stats"
        />
        
        <AboutMission 
          v-if="data.mission"
          :context-title="data.mission.contextTitle"
          :context-text="data.mission.contextText"
          :quote="data.mission.quote"
          :author="data.mission.author"
          :author-role="data.mission.authorRole"
          :author-image="data.mission.authorImage"
        />
        
        <AboutProblemSolution 
          v-if="data.challengeVsSolution"
          :main-stat="data.challengeVsSolution.mainStat"
          :problem-title="data.challengeVsSolution.problem.title"
          :problem-items="data.challengeVsSolution.problem.items"
          :solution-title="data.challengeVsSolution.solution.title"
          :solution-items="data.challengeVsSolution.solution.items"
          :process-steps="data.process ? data.process.steps : []"
        />
        
        <AboutTeam 
          v-if="data.team"
          :intro="data.team.intro"
          :stats="data.team.stats"
          :members="data.team.members"
        />
        
        <AboutCTA 
          v-if="data.finalCTA"
          :title="data.finalCTA.title"
          :text="data.finalCTA.text"
          :social-proof="data.finalCTA.socialProof"
          :buttons="data.finalCTA.buttons"
          :testimonials="data.finalCTA.testimonials"
        />
      </main>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import AboutHero from '~/components/About/AboutHero.vue'
import AboutMission from '~/components/About/AboutMission.vue'
import AboutProblemSolution from '~/components/About/AboutProblemSolution.vue'
import AboutTeam from '~/components/About/AboutTeam.vue'
import AboutCTA from '~/components/About/AboutCTA.vue'

import aboutMd from '../../about.md?raw'

// --- Interfaces ---
interface HeroData {
  title: string
  subtitle: string
  badge: string
  image: string
  stats: { label: string; value: string }[]
}

interface MissionData {
  contextTitle: string
  contextText: string
  quote: string
  author: string
  authorRole: string
  authorImage: string
}

interface ChallengeSolutionData {
  mainStat: string
  problem: { title: string; items: string[] }
  solution: { title: string; items: string[] }
}

interface ProcessStep {
  step: string
  title: string
  desc: string
}

interface ProcessData {
  steps: ProcessStep[]
}

interface TeamData {
  intro: string
  stats: { label: string; value: string }[]
  members: { name: string; role: string; image: string; bio: string; location?: string; specialties?: string[] }[]
}

interface CTAData {
  title: string
  text: string
  socialProof: { rating: string; count: string }
  buttons: { primary: string; secondary: string; tertiary: string }
  testimonials: { text: string; author: string }[]
}

interface PageData {
  hero?: HeroData
  mission?: MissionData
  challengeVsSolution?: ChallengeSolutionData
  process?: ProcessData
  team?: TeamData
  finalCTA?: CTAData
}

// --- Improved YAML Parser ---
function parseYaml(yamlStr: string): any {
  const lines = yamlStr.split('\n')
  const result: any = {}
  
  // Stack tracks parent objects at each indent level
  const stack: { indent: number; obj: any; isArray: boolean }[] = [{ indent: -2, obj: result, isArray: false }]
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!line || !line.trim() || line.trim().startsWith('#')) continue

    const indent = line.search(/\S/)
    const content = line.trim()
    
    // Pop stack to find the correct parent based on indentation
    while (stack.length > 1 && stack[stack.length - 1]!.indent >= indent) {
      stack.pop()
    }
    
    const currentParent = stack[stack.length - 1]!.obj

    // Handle array items: starts with "- "
    if (content.startsWith('- ')) {
      const itemContent = content.substring(2).trim()
      
      // Simple string array item like: - "some text"
      if (itemContent.startsWith('"') && itemContent.endsWith('"')) {
        if (Array.isArray(currentParent)) {
          currentParent.push(itemContent.slice(1, -1))
        }
        continue
      }
      
      // Plain string array item without quotes
      if (!itemContent.includes(':')) {
        if (Array.isArray(currentParent)) {
          currentParent.push(itemContent)
        }
        continue
      }
      
      // Object array item like: - name: "value"
      if (itemContent.includes(':')) {
        const colonIdx = itemContent.indexOf(':')
        const key = itemContent.substring(0, colonIdx).trim()
        let value = itemContent.substring(colonIdx + 1).trim()
        value = value.replace(/^"|"$/g, '')
        
        const newObj: any = {}
        if (key) newObj[key] = value
        
        if (Array.isArray(currentParent)) {
          currentParent.push(newObj)
          // Push this new object onto the stack so subsequent indented lines add properties to it
          stack.push({ indent: indent, obj: newObj, isArray: false })
        }
        continue
      }
    }

    // Handle key: value pairs
    if (content.includes(':')) {
      const colonIdx = content.indexOf(':')
      const key = content.substring(0, colonIdx).trim()
      let value = content.substring(colonIdx + 1).trim()

      if (value === '') {
        // Check if next line starts an array
        const nextIdx = i + 1
        let isArray = false
        if (nextIdx < lines.length) {
          const nextLine = lines[nextIdx]
          if (nextLine && nextLine.trim().startsWith('- ')) {
            isArray = true
          }
        }
        
        if (isArray) {
          currentParent[key] = []
          stack.push({ indent: indent, obj: currentParent[key], isArray: true })
        } else {
          currentParent[key] = {}
          stack.push({ indent: indent, obj: currentParent[key], isArray: false })
        }
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // Inline array like: specialties: ["a", "b"]
        const items = value.slice(1, -1).split(',').map(s => s.trim().replace(/^"|"$/g, '').replace(/^'|'$/g, ''))
        currentParent[key] = items
      } else {
        // Simple value - remove surrounding quotes
        value = value.replace(/^"|"$/g, '')
        currentParent[key] = value
      }
    }
  }

  return result
}

function parseFrontmatter(markdown: string): PageData {
  if (!markdown) return {}
  const match = markdown.match(/^---\n([\s\S]*?)\n---/)
  if (!match || !match[1]) return {}

  const parsed = parseYaml(match[1])
  const result: PageData = {}
  
  // Hero
  if (parsed.hero) {
    result.hero = {
      title: parsed.hero.title || '',
      subtitle: parsed.hero.subtitle || '',
      badge: parsed.hero.badge || '',
      image: parsed.hero.image || '',
      stats: Array.isArray(parsed.hero.stats) ? parsed.hero.stats : []
    }
  }

  // Mission
  if (parsed.mission) {
    result.mission = {
      contextTitle: parsed.mission.contextTitle || '',
      contextText: parsed.mission.contextText || '',
      quote: parsed.mission.quote || '',
      author: parsed.mission.author || '',
      authorRole: parsed.mission.authorRole || '',
      authorImage: parsed.mission.authorImage || ''
    }
  }

  // Challenge vs Solution
  if (parsed.challengeVsSolution) {
    result.challengeVsSolution = {
      mainStat: parsed.challengeVsSolution.mainStat || '',
      problem: {
        title: parsed.challengeVsSolution.problem?.title || '',
        items: Array.isArray(parsed.challengeVsSolution.problem?.items) ? parsed.challengeVsSolution.problem.items : []
      },
      solution: {
        title: parsed.challengeVsSolution.solution?.title || '',
        items: Array.isArray(parsed.challengeVsSolution.solution?.items) ? parsed.challengeVsSolution.solution.items : []
      }
    }
  }

  // Process
  if (parsed.process?.steps) {
    result.process = {
      steps: Array.isArray(parsed.process.steps) ? parsed.process.steps : []
    }
  }

  // Team
  if (parsed.team) {
    result.team = {
      intro: parsed.team.intro || '',
      stats: Array.isArray(parsed.team.stats) ? parsed.team.stats : [],
      members: Array.isArray(parsed.team.members) ? parsed.team.members : []
    }
  }

  // Final CTA
  if (parsed.finalCTA) {
    result.finalCTA = {
      title: parsed.finalCTA.title || '',
      text: parsed.finalCTA.text || '',
      socialProof: {
        rating: parsed.finalCTA.socialProof?.rating || '',
        count: parsed.finalCTA.socialProof?.count || ''
      },
      buttons: {
        primary: parsed.finalCTA.buttons?.primary || '',
        secondary: parsed.finalCTA.buttons?.secondary || '',
        tertiary: parsed.finalCTA.buttons?.tertiary || ''
      },
      testimonials: Array.isArray(parsed.finalCTA.testimonials) ? parsed.finalCTA.testimonials : []
    }
  }

  return result
}

const data = parseFrontmatter(aboutMd)

// Debug log
console.log('Parsed data:', JSON.stringify(data, null, 2))

useHead({
  title: 'About & Mission - CeylonGuide',
  meta: [
    { name: 'description', content: 'Learn about CeylonGuide\'s mission to simplify travel planning and unveil the authentic soul of Sri Lanka. Meet our team of passionate explorers.' }
  ]
})
</script>

<style scoped>
.group\/design-root {
  --color-primary: #ee5f2b;
  --color-bg-light: #f8f6f6;
  --color-bg-dark: #221510;
}
</style>
