"use client"

import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function NoteList({ notes, onSelect, onToggleFavorite, formatDate }) {
  return (
    <div className="p-4">
      <div className="space-y-2">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 border rounded-lg bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => onSelect(note)}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{note.emoji}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{note.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{note.content}</p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleFavorite(note.id)
                    }}
                  >
                    <Star className={`h-4 w-4 ${note.favorite ? "fill-amber-400 text-amber-400" : ""}`} />
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <Badge
                    variant="outline"
                    className={`
                      bg-${note.workspace.color}-100 dark:bg-${note.workspace.color}-900/20 
                      text-${note.workspace.color}-600 dark:text-${note.workspace.color}-400 
                      border-${note.workspace.color}-200 dark:border-${note.workspace.color}-800
                    `}
                  >
                    <span className="mr-1">{note.workspace.icon}</span>
                    {note.workspace.name}
                  </Badge>

                  {note.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}

                  {note.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{note.tags.length - 3}
                    </Badge>
                  )}

                  <div className="ml-auto text-xs text-slate-500 dark:text-slate-400">{formatDate(note.updatedAt)}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

