
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeatherForecast from '@/components/weather/WeatherForecast'
import PhotoGallery from '@/components/gallery/PhotoGallery'
import AttractionMap from '@/components/map/AttractionMap'
import ChatSupport from '@/components/chat/ChatSupport'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Logo from '@/components/Logo'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="container-custom py-8">
      <header className="flex justify-between items-center mb-8">
        <Logo />
        <h1 className="text-3xl font-display font-bold">Mount Abu Tourism</h1>
        <div className="flex items-center space-x-2">
          <a href="https://vitejs.dev" target="_blank" className="opacity-50 hover:opacity-100 transition-opacity">
            <img src={viteLogo} className="h-8" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="opacity-50 hover:opacity-100 transition-opacity">
            <img src={reactLogo} className="h-8" alt="React logo" />
          </a>
        </div>
      </header>

      <Tabs defaultValue="weather" className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="gallery">Photo Gallery</TabsTrigger>
          <TabsTrigger value="attractions">Attractions</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weather" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Weather Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <WeatherForecast />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="gallery" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Photo Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <PhotoGallery />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attractions" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Attractions Map</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-hidden rounded-b-lg">
              <AttractionMap />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="support" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Chat Support</CardTitle>
            </CardHeader>
            <CardContent>
              <ChatSupport />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 p-4 border border-stone-200 rounded-lg text-center">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Count is {count}
        </button>
        <p className="mt-2 text-sm text-stone-500">
          Edit <code className="text-primary font-mono">src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default App
