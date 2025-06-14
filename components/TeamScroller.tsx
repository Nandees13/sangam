'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

// Optionally move this to a shared type file if reused elsewhere
type TeamMember = {
  id: string
  name: string
  role: string
  image_url: string
  bio: string
}

interface TeamCardsProps {
  members: any[];
  type: string;
}

export default function TeamCards({ members, type }: TeamCardsProps) {
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  // Fallback data if `members` prop is empty or undefined
  const fallbackMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Coordinator',
      image_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      bio: 'An experienced leader passionate about student engagement.'
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'Designer',
      image_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      bio: 'Creative lead in visual design and branding.'
    }
  ]

  const display = Array.isArray(members) && members.length > 0 ? members : fallbackMembers

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {display.map((member) => (
        <Card
          key={member.id}
          className="overflow-hidden group hover:shadow-md transition-shadow h-full flex flex-col"
        >
          <div className="relative h-48">
            <Image
              src={member.image_url}
              alt={`Photo of ${member.name}`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>

          <CardContent className="p-6 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-muted-foreground mb-4">{member.role}</p>
            </div>

            <Dialog open={openDialog === member.id} onOpenChange={(open) => setOpenDialog(open ? member.id : null)}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  View Bio
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{member.name}</DialogTitle>
                  <DialogDescription>{member.role}</DialogDescription>
                </DialogHeader>
                <div className="prose mt-4 dark:prose-invert">
                  <p>{member.bio}</p>
                </div>
                <Button
                  onClick={() => setOpenDialog(null)}
                  className="absolute top-4 right-4"
                  variant="ghost"
                  aria-label="Close"
                >
                  ×
                </Button>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
