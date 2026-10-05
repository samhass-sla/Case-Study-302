import { onMounted, onUnmounted, ref } from 'vue'

const chapterIds = ['opening', 'release', 'outbound', 'wholesaler', 'regional', 'pharmacy', 'decision']

export function useActiveChapter() {
  const activeChapter = ref(0)
  let observer: IntersectionObserver | undefined
  let chapters: HTMLElement[] = []

  function updateFromViewport() {
    const midpoint = window.innerHeight * 0.48
    const closest = chapters.reduce<{ index: number; distance: number } | undefined>((best, chapter, index) => {
      const bounds = chapter.getBoundingClientRect()
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return best
      const center = Math.max(bounds.top, Math.min(midpoint, bounds.bottom))
      const distance = Math.abs(center - midpoint)
      return !best || distance < best.distance ? { index, distance } : best
    }, undefined)

    if (closest) activeChapter.value = closest.index
  }

  onMounted(() => {
    chapters = chapterIds
      .map((id) => document.getElementById(id))
      .filter((chapter): chapter is HTMLElement => chapter !== null)

    const hashId = window.location.hash.slice(1)
    const hashIndex = chapterIds.indexOf(hashId)
    if (hashIndex >= 0) activeChapter.value = hashIndex

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(updateFromViewport, {
        rootMargin: '-28% 0px -44% 0px',
        threshold: [0, 0.1, 0.3, 0.6],
      })
      chapters.forEach((chapter) => observer?.observe(chapter))
    } else {
      window.addEventListener('scroll', updateFromViewport, { passive: true })
      updateFromViewport()
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
    window.removeEventListener('scroll', updateFromViewport)
  })

  return activeChapter
}