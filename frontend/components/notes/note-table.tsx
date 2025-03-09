"use client"

import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function NoteTable({ notes, onSelect, onToggleFavorite, formatDate }) {
  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Workspace</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.map((note) => (
            <TableRow
              key={note.id}
              className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
              onClick={() => onSelect(note)}
            >
              <TableCell className="text-center">{note.emoji}</TableCell>
              <TableCell className="font-medium">{note.title}</TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
                {note.properties.status && (
                  <Badge
                    variant="outline"
                    className={`
                      ${
                        note.properties.status === "Published"
                          ? "text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
                          : note.properties.status === "In Progress"
                            ? "text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                            : note.properties.status === "Draft"
                              ? "text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800"
                              : "text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                      }
                    `}
                  >
                    {note.properties.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{formatDate(note.updatedAt)}</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

