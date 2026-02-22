import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css"
import { Button, IconButton, TextField, Box, Typography } from '@mui/material'
import RestoreIcon from '@mui/icons-material/Restore'
import VideocamIcon from '@mui/icons-material/Videocam'
import { AuthContext } from '../contexts/AuthContext'

function HomeComponent() {
  const navigate = useNavigate()
  const [meetingCode, setMeetingCode] = useState('')
  const { addToUserHistory } = useContext(AuthContext)

  const handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode)
    navigate(`/${meetingCode}`)
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0f172a 0%, #0e1942 100%)' }}>
      <div className="navBar">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VideocamIcon sx={{ color: 'primary.main', fontSize: 28 }} />
          <h2>MindMesh</h2>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={() => navigate('/history')}
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'primary.main', bgcolor: 'rgba(20, 184, 166, 0.1)' },
            }}
          >
            <RestoreIcon />
          </IconButton>
          <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>History</Typography>
          <Button
            variant="outlined"
            onClick={() => {
              localStorage.removeItem('token')
              navigate('/auth')
            }}
            sx={{
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'text.primary',
              '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(20, 184, 166, 0.1)' },
            }}
          >
            Logout
          </Button>
        </Box>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'white',
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              Join a meeting in seconds
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3 }}>
              Enter your meeting code below to connect with your team or loved ones.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                onChange={(e) => setMeetingCode(e.target.value)}
                label="Meeting Code"
                variant="outlined"
                placeholder="e.g. abc123"
                value={meetingCode}
                sx={{
                  flex: 1,
                  minWidth: 200,
                }}
              />
              <Button
                variant="contained"
                onClick={handleJoinVideoCall}
                sx={{
                  px: 3,
                  py: 1.5,
                  fontSize: '1rem',
                }}
              >
                Join Meeting
              </Button>
            </Box>
          </Box>
        </div>
        <div className="rightPanel">
          <Box
            sx={{
              width: '100%',
              maxWidth: 380,
              height: 320,
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(249, 115, 22, 0.08) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <VideocamIcon sx={{ fontSize: 120, color: 'primary.main', opacity: 0.4 }} />
          </Box>
        </div>
      </div>
    </Box>
  )
}

export default withAuth(HomeComponent)
