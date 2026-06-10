import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { MarketingLayout } from "@/layouts/MarketingLayout"
import { DocsLayout } from "@/layouts/DocsLayout"
import { LandingPage } from "@/pages/LandingPage"
import { DocsPage } from "@/pages/DocsPage"
import { NotFoundPage } from "@/pages/NotFoundPage"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<Navigate to="getting-started" replace />} />
          <Route path=":slug" element={<DocsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
