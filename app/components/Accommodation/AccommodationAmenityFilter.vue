<template>
    <div class="flex gap-4 overflow-x-auto scrollbar-hide items-center text-xs text-text-muted dark:text-gray-400">
        <span class="font-semibold text-text-main dark:text-gray-200 whitespace-nowrap">Amenities:</span>

        <label v-for="amenity in amenities" :key="amenity.value"
            class="flex items-center gap-1.5 cursor-pointer hover:text-primary whitespace-nowrap">
            <input :checked="modelValue.includes(amenity.value)" @change="toggleAmenity(amenity.value)"
                class="form-checkbox h-3.5 w-3.5 text-primary rounded border-gray-300 focus:ring-primary"
                type="checkbox" />
            {{ amenity.label }}
        </label>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    modelValue: string[]
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string[]]
}>()

const amenities = [
    { value: 'wifi', label: 'Wifi' },
    { value: 'pool', label: 'Pool' },
    { value: 'spa', label: 'Spa' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'parking', label: 'Parking' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'airport_shuttle', label: 'Airport Shuttle' },
    { value: 'garden', label: 'Garden' },
    { value: 'ac', label: 'A/C' }
]

function toggleAmenity(value: string) {
    const current = [...props.modelValue]
    const index = current.indexOf(value)

    if (index > -1) {
        current.splice(index, 1)
    } else {
        current.push(value)
    }

    emit('update:modelValue', current)
}
</script>
