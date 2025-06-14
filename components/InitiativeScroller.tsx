'use client'

import { useState, useEffect } from 'react'
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

type Initiative = {
  id: string
  title: string
  description: string
  image_url: string
  date: string
}

interface InitiativeScrollerProps {
  items?: Initiative[]
}

export default function InitiativeScroller({ items }: InitiativeScrollerProps) {
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  const fallbackInitiatives: Initiative[] = [
    {
      id: '1',
      title: 'Tech Literacy Drive',
      description: 'Aimed to educate rural youth in digital tools.',
      image_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
      date: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Clean Campus Initiative',
      description: 'Organized cleanup drives across departments.',
      image_url: 'https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg',
      date: new Date().toISOString()
    }
  ]

  const display = Array.isArray(items) && items.length > 0 ? items : fallbackInitiatives

  useEffect(() => {
    console.log('Received items in InitiativeScroller:', items)
  }, [items])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {display.map((item) => (
        <Card key={item.id} className="overflow-hidden group hover:shadow-md transition-shadow">
          <div className="relative h-48">
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>

          <CardContent className="p-6">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-muted-foreground line-clamp-2">{item.description}</p>

            <Dialog open={openDialog === item.id} onOpenChange={(open) => setOpenDialog(open ? item.id : null)}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  Read More
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{item.title}</DialogTitle>
                  <DialogDescription>{new Date(item.date).toDateString()}</DialogDescription>
                </DialogHeader>
                <div className="prose mt-4 dark:prose-invert">
                  <p>{item.description}</p>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
