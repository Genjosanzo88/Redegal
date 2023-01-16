import { Navigate, Route, Routes } from "react-router-dom"
import { Products } from "../products"
import { Navbar } from "../ui/components/Navbar"


export const AppRouter = () => {
  return (
    <>
    <Navbar />
    
    <Routes>
        <Route path="products" element={<Products />} />

        <Route path="/" element={<Navigate to="/products" />} />
    </Routes>
    </>
  )
}
