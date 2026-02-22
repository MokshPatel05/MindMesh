import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  Box,
  CardContent,
  Button,
  Typography,
  IconButton,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import VideocamIcon from '@mui/icons-material/Videocam'
import withAuth from '../utils/withAuth'

function History() {
  const { getHistoryOfUser } = useContext(AuthContext)
  const [meetings, setMeetings] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser()
        setMeetings(history)
      } catch {
        // Could add snackbar for error
      }
    }
    fetchHistory()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0f172a 0%, #0e1942 100%)',
        py: 3,
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4,
            px: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => navigate('/home')}
              sx={{
                color: 'text.secondary',
                bgcolor: 'rgba(255,255,255,0.05)',
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: 'rgba(20, 184, 166, 0.15)',
                },
              }}
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>
              Meeting History
            </Typography>
          </Box>
        </Box>

        {/* Meeting Cards Grid */}
        {meetings.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 2,
            }}
          >
            {meetings.map((meeting, i) => (
              <Card
                key={i}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(20, 184, 166, 0.15)',
                    borderColor: 'rgba(20, 184, 166, 0.3)',
                  },
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        bgcolor: 'rgba(20, 184, 166, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <VideocamIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: 'white',
                          fontFamily: 'monospace',
                          fontSize: '1.1rem',
                        }}
                      >
                        {meeting.meetingCode}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {formatDate(meeting.date)}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`/${meeting.meetingCode}`)}
                    sx={{
                      mt: 1,
                      py: 1,
                      fontWeight: 600,
                    }}
                  >
                    Rejoin Meeting
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              px: 2,
            }}
          >
            <VideocamIcon
              sx={{
                fontSize: 80,
                color: 'text.secondary',
                opacity: 0.3,
                mb: 2,
              }}
            />
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
              No meetings yet
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Your meeting history will appear here once you join calls.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/home')}
              startIcon={<HomeIcon />}
            >
              Go to Home
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default withAuth(History)
