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
      title: 'Vidyarthi Vigyan Manthan',
      description: 'An initiative of Vijnana Bharati (VIBHA), in collaboration with National Council of Educational Research and Training (NCERT), an institution under the Ministry of Education, Government of India and National Council of Science Museums (NCSM), an autonomous organisation under the Ministry of Culture, Government of India. VVM is a national program for popularizing science among school students of standard VI to XI, conceptualized with the intent of identifying “ignited minds”, to use the words of Dr. APJ Kalam, with a scientific aptitude from amongst the student community.',
      image_url: 'https://pbs.twimg.com/media/EiSa2vCU4AE6FOi.jpg',
      date: new Date().toISOString()
    },
    {
      id: '2',
      title: 'NEED Mission',
      description: 'NEED is a nationwide movement to build an energy-conscious and environmentally responsible society, starting from our schools and colleges — but extending far beyond. By combining education, action, and community engagement, NEED empowers students, professionals, institutions, and citizens to become stewards of a sustainable future.',
      image_url: '/hero/need.jpg',
      date: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Mandala',
      description: 'Mandala is an initiative of Vijnana Bharati that intends to bridge contemporary science and Indic thought, in a rigorous and self-consistent manner, at the ontological as well as the epistemological and normative levels.',
      image_url: 'https://vijnanabharati.org/assets/Images/inner-page-logo/mandala-vb.jpg',
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
