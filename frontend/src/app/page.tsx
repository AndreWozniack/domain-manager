'use client'
import { useState } from 'react'
import Button from '@/components/Button'
import List   from '@/components/List'

export default function Page() {
  const [items, setItems] = useState(['Item 1', 'Item 2'])

  return (
      <div className="max-w-md mx-auto p-4">
        <Button onClick={() => setItems([...items, `Item ${items.length + 1}`])}>
          Adicionar Item
        </Button>
        <List items={items} />
      </div>
  )
}
