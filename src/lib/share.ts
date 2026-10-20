import { toast } from '@/hooks/use-toast'

export async function shareProgress(streakDays: number) {
  const shareData = {
    title: "My Sugar-Free Journey | AdioSugar",
    text: `I've been sugar-free for ${streakDays} days using AdioSugar! Breaking the habit and building real self-control. 🚫🍫`,
    url: "https://adiosugar.com"
  }

  if (navigator.share) {
    try {
      await navigator.share(shareData)
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err)
      }
    }
  } else {
    try {
      const textToCopy = `${shareData.text}\n${shareData.url}`
      await navigator.clipboard.writeText(textToCopy)
      toast({
        title: "Share link copied to clipboard!",
        description: "Paste it anywhere to share your progress.",
        duration: 3000,
      })
    } catch (err) {
      console.error('Clipboard copy failed:', err)
      toast({
        title: "Share not available",
        description: "Your browser doesn't support sharing.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }
}