<template>
    <div
        class="hidden lg:block w-2/3 h-full rounded-2xl overflow-hidden shadow-inner border border-gray-200 relative bg-blue-50">
        <!-- Map Image -->
        <img alt="Map of Sri Lanka" class="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcxuMT6NVbTdgH87KzQnJ5RKB3qEaIc1VsCgPmpUHhx8z5jRVszG6-XUywh86wMKWnkxPN-4IdPhyTCB-GYz5P4Hv0TZeG1Z21EPGiGBxUtuw-_HssSfdZVbumhTU8aRiKtOthTzTfmfEPcdghaafg9ZqK-H9i9ubeqv_kzGskHMimH0ajOAF2bRSOETgHHlsBnJ8xsIJN-Or7kbmoOb2LJ0zIcU-zVuR5XUrSk9yMiE-9H8XuFGOyL4qB-2CNdBy0BrMwE0QfLzE" />

        <!-- Zoom Controls -->
        <div class="absolute top-4 left-4 z-[400] bg-white rounded shadow-md border border-gray-300">
            <button @click="zoomIn"
                class="w-8 h-8 flex items-center justify-center border-b border-gray-300 hover:bg-gray-50 text-gray-600 font-bold text-lg">
                +
            </button>
            <button @click="zoomOut"
                class="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 font-bold text-lg">
                -
            </button>
        </div>

        <!-- Map Markers -->
        <div v-for="marker in markers" :key="marker.id" :style="{
            top: marker.top,
            left: marker.left
        }" class="absolute transform -translate-x-1/2 -translate-y-1/2">
            <div :class="[
                'text-white p-2 rounded-full shadow-lg border-2 border-white flex items-center justify-center w-10 h-10 hover:scale-110 transition-transform cursor-pointer',
                marker.color
            ]" @click="$emit('markerClick', marker.id)">
                <span class="material-icons text-lg">wc</span>
            </div>
        </div>

        <!-- Map Attribution -->
        <div class="absolute bottom-0 right-0 bg-white/80 px-2 py-0.5 text-[10px] text-gray-600">
            © <a class="hover:underline text-blue-600" href="https://leafletjs.com" target="_blank">Leaflet</a> |
            © <a class="hover:underline text-blue-600" href="https://www.openstreetmap.org"
                target="_blank">OpenStreetMap</a>
        </div>
    </div>
</template>

<script setup lang="ts">
interface MapMarker {
    id: string
    top: string
    left: string
    color: string
}

interface Props {
    markers?: MapMarker[]
}

withDefaults(defineProps<Props>(), {
    markers: () => [
        { id: '1', top: '62%', left: '32%', color: 'bg-primary' },
        { id: '2', top: '65%', left: '30%', color: 'bg-orange-500' },
        { id: '3', top: '58%', left: '38%', color: 'bg-primary' }
    ]
})

const emit = defineEmits<{
    markerClick: [id: string]
    zoomIn: []
    zoomOut: []
}>()

function zoomIn() {
    emit('zoomIn')
}

function zoomOut() {
    emit('zoomOut')
}
</script>
