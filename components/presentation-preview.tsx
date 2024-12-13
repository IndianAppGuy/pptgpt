'use client'

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PresentationPreview() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Presentation Preview</h2>
      </div>
      
      <Tabs defaultValue="preview" className="flex-1">
        <TabsList className="w-full justify-start rounded-none border-b">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="outline">Outline</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="flex-1 p-4">
          <ScrollArea className="h-full">
            <div className="space-y-4">
              {[1, 2, 3].map((slide) => (
                <Card key={slide} className="aspect-[16/9] flex items-center justify-center p-4">
                  <span className="text-muted-foreground">Slide {slide}</span>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="outline" className="flex-1 p-4">
          <ScrollArea className="h-full">
            <div className="space-y-2">
              <div className="font-medium">1. Introduction</div>
              <div className="font-medium">2. Key Points</div>
              <div className="font-medium">3. Summary</div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

