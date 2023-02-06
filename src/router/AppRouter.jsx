import { Navigate, Route, Routes } from "react-router-dom"
import { Podcast } from "../podcasts"
import { PodcastDetails } from "../podcasts/pages/PodcastDetails"
import { Navbar } from "../ui/components/Navbar"


export const AppRouter = () => {
  return (
    <>
    <Navbar />
    
    <Routes>
        <Route path="podcasts" element={<Podcast />} />
        <Route path="podcasts/:id" element={<PodcastDetails />} />

        <Route path="/" element={<Navigate to="/podcasts" />} />
    </Routes>
    </>
  )
}
