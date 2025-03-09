"use client"

import { Star } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function NoteCard({ note, onSelect, onToggleFavorite }) {
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      })
    }
  }

  // Truncate content for preview
  const truncateContent = (content, maxLength = 120) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group" onClick={onSelect}>
      {note.coverImage && (
        <div className="h-32 overflow-hidden">
          <img
            src={note.coverImage || "/placeholder.svg"}
            alt="Cover"
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}

      <CardHeader className={`p-4 ${note.coverImage ? "pb-2" : ""}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{note.emoji}</span>
            <h3 className="font-medium line-clamp-1">{note.title}</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite()
            }}
          >
            <Star className={`h-4 w-4 ${note.favorite ? "fill-amber-400 text-amber-400" : ""}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{truncateContent(note.content)}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {note.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {note.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{note.tags.length - 2}
            </Badge>
          )}
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400">{formatDate(note.updatedAt)}</div>
      </CardFooter>
    </Card>
  )
}

