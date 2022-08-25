import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { Suspense } from 'react'
import { BrowserRouter, Outlet, Routes } from 'react-router-dom'
import AppRoutes from './common/AppRoutes'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import SnackbarProvider from './components/Snackbar/SnackbarProvider'
import UserContextProvider from './context/UserContextProvider'
import UploadProvider from './providers/UploadProviders/UploadProvider'
import theme from './styles/styles'

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              }}
            >
              <CssBaseline />

              <Header />
              <UploadProvider>
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>{AppRoutes}</Routes>
                </Suspense>
                <Outlet />
              </UploadProvider>
              <Footer />
            </Box>
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
