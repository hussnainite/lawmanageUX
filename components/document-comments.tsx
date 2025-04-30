"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
    role: string
  }
  content: string
  date: string
  textReference: string
  replies: Reply[]
}

interface Reply {
  id: string
  user: {
    name: string
    avatar: string
    role: string
  }
  content: string
  date: string
}

interface DocumentCommentsProps {
  documentId: string
  comments: Comment[]
  onHighlightText?: (text: string | null) => void
}

export function DocumentComments({ documentId, comments, onHighlightText }: DocumentCommentsProps) {
  return (
    <div className="space-y-6">
      <h3 className="font-medium">Comments ({comments.length})</h3>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="space-y-4"
            onMouseEnter={() => onHighlightText && onHighlightText(comment.textReference)}
            onMouseLeave={() => onHighlightText && onHighlightText(null)}
          >
            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                  <AvatarFallback>
                    {comment.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{comment.user.name}</p>
                      <p className="text-xs text-muted-foreground">{comment.user.role}</p>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(comment.date).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Show the referenced text */}
                  {comment.textReference && (
                    <div className="mt-2 text-xs bg-gray-100 p-2 rounded italic">
                      "
                      {comment.textReference.length > 100
                        ? comment.textReference.substring(0, 100) + "..."
                        : comment.textReference}
                      "
                    </div>
                  )}

                  <p className="mt-2">{comment.content}</p>
                  <div className="mt-3">
                    <Button variant="ghost" size="sm">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {comment.replies.map((reply) => (
              <div key={reply.id} className="ml-8 bg-white border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src={reply.user.avatar || "/placeholder.svg"} alt={reply.user.name} />
                    <AvatarFallback>
                      {reply.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{reply.user.name}</p>
                        <p className="text-xs text-muted-foreground">{reply.user.role}</p>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(reply.date).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="mt-2">{reply.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
